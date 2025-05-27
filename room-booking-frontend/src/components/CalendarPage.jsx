import React from 'react';
import { Typography, Box } from '@mui/material';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarPage.css'; // Import the new CSS file

const localizer = momentLocalizer(moment);

// CalendarPage component receives bookings as a prop
const CalendarPage = ({ bookings }) => {

  // Format bookings data for react-big-calendar
  const events = bookings.map(booking => ({
    title: `${booking.roomName} - ${booking.purpose}`,
    start: new Date(`${booking.date}T${booking.startTime}`), // Combine date and time
    end: new Date(`${booking.date}T${booking.endTime}`),     // Combine date and time
  }));

  // TODO: Implement real-time availability and double booking prevention.
  // This will likely involve fetching real-time booking data from a backend
  // and adding logic to handle new booking requests and check for conflicts.

  return (
    <Box className="calendar-container"> {/* Apply the CSS class */} 
      <Typography variant="h4" component="h1" gutterBottom>
        Room Booking Calendar
      </Typography>
      {/* Calendar component */} 
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
      />
      <Typography variant="body1" sx={{ marginTop: '20px' }}>
        Note: Real-time availability and double booking prevention require backend implementation.
      </Typography>
    </Box>
  );
};

export default CalendarPage; 