import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Stack,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Mock data for rooms
const mockRooms = [
  {
    id: 1,
    name: 'Conference Room A',
    capacity: 20,
    amenities: ['Projector', 'Whiteboard', 'Video Conferencing'],
    location: 'Floor 1',
    status: 'available',
  },
  {
    id: 2,
    name: 'Meeting Room B',
    capacity: 10,
    amenities: ['Whiteboard', 'TV Screen'],
    location: 'Floor 2',
    status: 'available',
  },
  {
    id: 3,
    name: 'Training Room C',
    capacity: 30,
    amenities: ['Projector', 'Whiteboard', 'Video Conferencing', 'Sound System'],
    location: 'Floor 3',
    status: 'available',
  },
];

const RoomSearch = () => {
  const [filters, setFilters] = useState({
    date: new Date(),
    capacity: '',
    location: '',
    amenities: [],
  });

  const [rooms, setRooms] = useState(mockRooms);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = () => {
    // TODO: Implement actual search logic
    // For now, we'll just filter the mock data
    const filteredRooms = mockRooms.filter(room => {
      if (filters.capacity && room.capacity < parseInt(filters.capacity)) return false;
      if (filters.location && !room.location.includes(filters.location)) return false;
      if (filters.amenities.length > 0) {
        return filters.amenities.every(amenity => room.amenities.includes(amenity));
      }
      return true;
    });
    setRooms(filteredRooms);
  };

  const handleBookRoom = (roomId) => {
    // TODO: Implement booking logic
    console.log('Booking room:', roomId);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Search Rooms
      </Typography>
      
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date"
                value={filters.date}
                onChange={(newValue) => handleFilterChange('date', newValue)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Capacity</InputLabel>
              <Select
                value={filters.capacity}
                label="Capacity"
                onChange={(e) => handleFilterChange('capacity', e.target.value)}
              >
                <MenuItem value="">Any</MenuItem>
                <MenuItem value="5">5+ people</MenuItem>
                <MenuItem value="10">10+ people</MenuItem>
                <MenuItem value="20">20+ people</MenuItem>
                <MenuItem value="30">30+ people</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Location"
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
            />
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleSearch}
              sx={{ height: '56px' }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {rooms.map((room) => (
          <Grid item xs={12} md={4} key={room.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {room.name}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Location: {room.location}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Capacity: {room.capacity} people
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                  {room.amenities.map((amenity) => (
                    <Chip
                      key={amenity}
                      label={amenity}
                      size="small"
                      variant="outlined"
                    />
                  ))}
                </Stack>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => handleBookRoom(room.id)}
                >
                  Book Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RoomSearch; 