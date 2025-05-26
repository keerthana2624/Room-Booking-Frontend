import React, { useState } from 'react';
import './RoomSearch.css';
import {
  TextField,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Snackbar,
  Alert,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import BookingForm from '../booking/BookingForm';

// Mock data for rooms
const mockRooms = [
  {
    id: 1,
    name: 'Conference Room A',
    capacity: 20,
    amenities: ['Projector', 'Whiteboard', 'Video Conferencing'],
    location: 'Floor 1',
    status: 'available',
    description: 'Modern conference room with high-end video conferencing equipment',
  },
  {
    id: 2,
    name: 'Meeting Room B',
    capacity: 10,
    amenities: ['Whiteboard', 'TV Screen'],
    location: 'Floor 2',
    status: 'available',
    description: 'Cozy meeting room perfect for small team discussions',
  },
  {
    id: 3,
    name: 'Training Room C',
    capacity: 30,
    amenities: ['Projector', 'Whiteboard', 'Video Conferencing', 'Sound System'],
    location: 'Floor 3',
    status: 'available',
    description: 'Large training room with advanced audio-visual equipment',
  },
  {
    id: 4,
    name: 'Executive Suite',
    capacity: 8,
    amenities: ['Smart TV', 'Coffee Machine', 'Video Conferencing', 'Sound System'],
    location: 'Floor 4',
    status: 'available',
    description: 'Premium executive meeting room with luxury amenities',
  },
  {
    id: 5,
    name: 'Innovation Lab',
    capacity: 15,
    amenities: ['Interactive Whiteboard', '3D Printer', 'VR Equipment', 'Smart Board'],
    location: 'Floor 2',
    status: 'available',
    description: 'Creative space for innovation and brainstorming sessions',
  },
  {
    id: 6,
    name: 'Board Room',
    capacity: 12,
    amenities: ['Projector', 'Video Conferencing', 'Smart Board', 'Executive Chairs'],
    location: 'Floor 1',
    status: 'available',
    description: 'Elegant board room for executive meetings and presentations',
  },
  {
    id: 7,
    name: 'Collaboration Hub',
    capacity: 25,
    amenities: ['Multiple Screens', 'Wireless Presentation', 'Whiteboard Walls', 'Coffee Station'],
    location: 'Floor 3',
    status: 'available',
    description: 'Dynamic space designed for team collaboration and workshops',
  },
  {
    id: 8,
    name: 'Quiet Room',
    capacity: 4,
    amenities: ['Sound Proofing', 'Comfortable Seating', 'Reading Lights'],
    location: 'Floor 2',
    status: 'available',
    description: 'Peaceful space for focused work or small private meetings',
  },
  {
    id: 9,
    name: 'Presentation Studio',
    capacity: 40,
    amenities: ['Professional Lighting', 'Green Screen', 'High-end Audio', 'Multiple Cameras'],
    location: 'Floor 4',
    status: 'available',
    description: 'Professional studio for presentations and video recordings',
  }
];

const FLOOR_OPTIONS = ['Floor 1', 'Floor 2', 'Floor 3', 'Floor 4'];
const CAPACITY_OPTIONS = [5, 10, 15, 20, 25, 30, 40];
const ROOM_TYPE_OPTIONS = ['Conference', 'Board', 'Projector'];

const RoomSearch = () => {
  const [filters, setFilters] = useState({
    date: new Date(),
    roomName: '',
    floor: '',
    capacity: '',
    roomType: '',
  });
  const [rooms, setRooms] = useState(mockRooms);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookingFormOpen, setBookingFormOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');

  // Filter menu/dialog state
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [filterDialog, setFilterDialog] = useState({ open: false, type: '' });

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = () => {
    const filteredRooms = mockRooms.filter(room => {
      // Room name search
      if (filters.roomName && !room.name.toLowerCase().includes(filters.roomName.toLowerCase())) return false;
      // Floor filter
      if (filters.floor && !room.location.toLowerCase().includes(filters.floor.toLowerCase())) return false;
      // Capacity filter
      if (filters.capacity && room.capacity < parseInt(filters.capacity)) return false;
      // Room type filter (simple match in name or amenities)
      if (filters.roomType) {
        const type = filters.roomType.toLowerCase();
        if (!room.name.toLowerCase().includes(type) && !room.amenities.some(a => a.toLowerCase().includes(type))) return false;
      }
      return true;
    });
    setRooms(filteredRooms);
  };

  // Filter button handlers
  const handleFilterButtonClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };
  const handleFilterMenuClose = () => {
    setFilterAnchorEl(null);
  };
  const handleFilterCategoryClick = (type) => {
    setFilterDialog({ open: true, type });
    setFilterAnchorEl(null);
  };
  const handleFilterDialogClose = () => {
    setFilterDialog({ open: false, type: '' });
  };
  const handleFilterOptionSelect = (type, value) => {
    handleFilterChange(type, value);
    setFilterDialog({ open: false, type: '' });
  };

  const handleBookRoom = (room) => {
    setSelectedRoom(room);
    setBookingFormOpen(true);
  };

  const handleBookingSubmit = (bookingData) => {
    setSnackbarMsg('Room booked successfully!');
    setSnackbarOpen(true);
  };

  const handleCloseBookingForm = () => {
    setBookingFormOpen(false);
    setSelectedRoom(null);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  // Dialog options
  const getDialogOptions = () => {
    switch (filterDialog.type) {
      case 'floor': return FLOOR_OPTIONS;
      case 'capacity': return CAPACITY_OPTIONS;
      case 'roomType': return ROOM_TYPE_OPTIONS;
      default: return [];
    }
  };

  return (
    <div className="room-search-container">
      <Typography variant="h4" className="room-search-title">
        Search Rooms
      </Typography>
      <div className="room-search-bar">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ flex: 1, minWidth: 220 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date"
                value={filters.date}
                onChange={(newValue) => handleFilterChange('date', newValue)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </div>
          <div style={{ flex: 2, minWidth: 220 }}>
            <TextField
              fullWidth
              label="Room Name"
              value={filters.roomName}
              onChange={(e) => handleFilterChange('roomName', e.target.value)}
            />
          </div>
          <div style={{ flex: 1, minWidth: 120 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleFilterButtonClick}
              style={{ height: 56 }}
            >
              Filter
            </Button>
            <Menu
              anchorEl={filterAnchorEl}
              open={Boolean(filterAnchorEl)}
              onClose={handleFilterMenuClose}
            >
              <MenuItem onClick={() => handleFilterCategoryClick('floor')}>Floor</MenuItem>
              <MenuItem onClick={() => handleFilterCategoryClick('capacity')}>Capacity</MenuItem>
              <MenuItem onClick={() => handleFilterCategoryClick('roomType')}>Room Type</MenuItem>
            </Menu>
          </div>
          <div style={{ flex: 1, minWidth: 120 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleSearch}
              style={{ height: 56 }}
            >
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Filter Dialog */}
      <Dialog open={filterDialog.open} onClose={handleFilterDialogClose}>
        <DialogTitle>Select {filterDialog.type === 'floor' ? 'Floor' : filterDialog.type === 'capacity' ? 'Capacity' : 'Room Type'}</DialogTitle>
        <DialogContent>
          <List>
            {getDialogOptions().map(option => (
              <ListItem key={option} disablePadding>
                <ListItemButton onClick={() => handleFilterOptionSelect(filterDialog.type, option)}>
                  <ListItemText primary={option} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFilterDialogClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <div className="room-grid">
        {rooms.map((room) => (
          <div className="room-grid-item" key={room.id}>
            <Card className="room-card">
              <CardContent className="room-card-content">
                <Typography variant="h6" gutterBottom>
                  {room.name}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Location: {room.location}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <b>Capacity:</b> {room.capacity} people
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{ marginBottom: 16 }}>
                  {room.description}
                </Typography>
                <div className="room-amenities">
                  {room.amenities.map((amenity) => (
                    <Chip
                      key={amenity}
                      label={amenity}
                      size="small"
                      variant="outlined"
                    />
                  ))}
                </div>
              </CardContent>
              <CardActions className="room-card-actions">
                <Button
                  size="small"
                  color="primary"
                  onClick={() => handleBookRoom(room)}
                >
                  Book Now
                </Button>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>

      {selectedRoom && (
        <BookingForm
          open={bookingFormOpen}
          onClose={handleCloseBookingForm}
          room={selectedRoom}
          onBook={handleBookingSubmit}
        />
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default RoomSearch; 