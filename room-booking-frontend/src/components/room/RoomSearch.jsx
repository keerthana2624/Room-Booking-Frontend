import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
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
  Alert
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import BookingForm from '../booking/BookingForm';
import { Checkbox } from 'primereact/checkbox';
import { Menu } from 'primereact/menu';

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

const FILTER_CATEGORIES = [
  { key: 'floor', label: 'Floor' },
  { key: 'capacity', label: 'Capacity' },
  { key: 'roomType', label: 'Room Type' },
];

const RoomSearch = ({ bookings, setBookings }) => {
  const [filters, setFilters] = useState({
    date: new Date(),
    roomName: '',
    floor: [],
    capacity: [],
    roomType: [],
  });
  const [rooms, setRooms] = useState(mockRooms);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookingFormOpen, setBookingFormOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const [sortOption, setSortOption] = useState('name-asc');
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const sortMenuRef = React.useRef(null);

  // Live search and filter
  React.useEffect(() => {
    let filtered = mockRooms.filter(room => {
      // Live room name search (starts with)
      if (filters.roomName && !room.name.toLowerCase().startsWith(filters.roomName.toLowerCase())) return false;
      // Floor filter
      if (filters.floor.length > 0 && !filters.floor.includes(room.location)) return false;
      // Capacity filter
      if (filters.capacity.length > 0 && !filters.capacity.includes(room.capacity)) return false;
      // Room type filter
      if (filters.roomType.length > 0) {
        const match = filters.roomType.some(type =>
          room.name.toLowerCase().includes(type.toLowerCase()) ||
          room.amenities.some(a => a.toLowerCase().includes(type.toLowerCase()))
        );
        if (!match) return false;
      }
      return true;
    });
    // Sort
    if (sortOption === 'name-asc') {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'name-desc') {
      filtered = filtered.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortOption === 'capacity-asc') {
      filtered = filtered.sort((a, b) => a.capacity - b.capacity);
    } else if (sortOption === 'capacity-desc') {
      filtered = filtered.sort((a, b) => b.capacity - a.capacity);
    }
    setRooms(filtered);
  }, [filters, sortOption]);

  // Filter options
  const handleFilterChange = (type, value) => {
    setFilters(prev => {
      const arr = prev[type];
      const newArr = arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value];
      return { ...prev, [type]: newArr };
    });
  };

  // Sort menu
  const sortItems = [
    {
      label: 'Room Name A-Z',
      icon: 'pi pi-sort-alpha-down',
      command: () => setSortOption('name-asc'),
    },
    {
      label: 'Room Name Z-A',
      icon: 'pi pi-sort-alpha-up',
      command: () => setSortOption('name-desc'),
    },
    {
      separator: true
    },
    {
      label: 'Capacity Ascending',
      icon: 'pi pi-sort-numeric-down',
      command: () => setSortOption('capacity-asc'),
    },
    {
      label: 'Capacity Descending',
      icon: 'pi pi-sort-numeric-up',
      command: () => setSortOption('capacity-desc'),
    },
  ];

  const handleBookRoom = (room) => {
    setSelectedRoom(room);
    setBookingFormOpen(true);
  };

  const handleBookingSubmit = (bookingData) => {
    setSnackbarMsg('Room booked successfully!');
    setSnackbarOpen(true);
    // Ensure bookingData.startTime and endTime are Date objects
    const start = new Date(bookingData.startTime);
    const end = new Date(bookingData.endTime);
    setBookings(prev => [
      ...prev,
      {
        id: prev.length ? Math.max(...prev.map(b => b.id)) + 1 : 1,
        roomName: selectedRoom.name,
        date: start.toISOString().slice(0, 10),
        startTime: start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        endTime: end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'pending',
        purpose: bookingData.purpose,
      }
    ]);
  };

  const handleCloseBookingForm = () => {
    setBookingFormOpen(false);
    setSelectedRoom(null);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  // Open filter menu
  const handleFilterButtonClick = (e) => {
    setFilterMenuOpen(true);
    setActiveCategory(null);
  };
  // Close filter menu
  const handleFilterMenuClose = () => {
    setFilterMenuOpen(false);
    setActiveCategory(null);
  };
  // Open submenu for category
  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
  };
  // Get submenu options
  const getSubmenuOptions = () => {
    if (activeCategory === 'floor') return FLOOR_OPTIONS;
    if (activeCategory === 'capacity') return CAPACITY_OPTIONS;
    if (activeCategory === 'roomType') return ROOM_TYPE_OPTIONS;
    return [];
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
                onChange={(newValue) => setFilters(prev => ({ ...prev, date: newValue }))}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </div>
          <div style={{ flex: 2, minWidth: 220 }}>
            <TextField
              fullWidth
              label="Room Name"
              value={filters.roomName}
              onChange={e => setFilters(prev => ({ ...prev, roomName: e.target.value }))}
            />
          </div>
          <div style={{ flex: 1, minWidth: 120, display: 'flex', alignItems: 'center', gap: 8, position: 'relative' }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleFilterButtonClick}
              className="p-button p-component"
              style={{ height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <i className="pi pi-filter" style={{ marginRight: 8 }} /> Filter
            </Button>
            {filterMenuOpen && (
              <div
                className="filter-main-menu"
                style={{ position: 'absolute', top: 60, right: 0 }}
                onMouseLeave={handleFilterMenuClose}
              >
                {FILTER_CATEGORIES.map(cat => (
                  <div
                    key={cat.key}
                    className={`filter-main-menu-item${activeCategory === cat.key ? ' active' : ''}`}
                    onMouseEnter={() => handleCategoryClick(cat.key)}
                    onClick={() => handleCategoryClick(cat.key)}
                  >
                    {cat.label}
                  </div>
                ))}
                {/* Submenu */}
                {activeCategory && (
                  <div className="filter-submenu-panel">
                    <div className="filter-submenu-title">
                      {FILTER_CATEGORIES.find(c => c.key === activeCategory)?.label}
                    </div>
                    {getSubmenuOptions().map(option => (
                      <div className="filter-checkbox-row" key={option}>
                        <Checkbox inputId={`filter-${activeCategory}-${option}`} checked={filters[activeCategory].includes(option)} onChange={() => handleFilterChange(activeCategory, option)} />
                        <label htmlFor={`filter-${activeCategory}-${option}`}>{activeCategory === 'capacity' ? `${option} people` : option}</label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            <Button
              fullWidth
              variant="contained"
              onClick={e => sortMenuRef.current.toggle(e)}
              className="p-button p-component"
              style={{ height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <i className="pi pi-sort-alt" style={{ marginRight: 8 }} /> Sort
            </Button>
            <Menu model={sortItems} popup ref={sortMenuRef} />
          </div>
        </div>
      </div>

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