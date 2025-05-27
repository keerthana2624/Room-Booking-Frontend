import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

// Components
import Layout from './components/layout/Layout';
import Login from './components/auth/Login';
import RoomSearch from './components/room/RoomSearch';
import BookingStatus from './components/booking/BookingStatus';

// Initial mock bookings
const initialBookings = [
  {
    id: 1,
    roomName: 'Conference Room A',
    date: '2024-07-01',
    startTime: '10:00',
    endTime: '11:00',
    status: 'pending',
    purpose: 'Team Meeting',
  },
  {
    id: 2,
    roomName: 'Board Room',
    date: '2024-07-02',
    startTime: '14:00',
    endTime: '15:30',
    status: 'approved',
    purpose: 'Client Presentation',
  },
  {
    id: 3,
    roomName: 'Training Room C',
    date: '2024-07-03',
    startTime: '09:00',
    endTime: '12:00',
    status: 'rejected',
    purpose: 'Workshop',
  },
];

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

// Mock authentication state
const isAuthenticated = true ; // This will be replaced with actual auth logic

// Protected Route component
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <Layout>{children}</Layout>;
};

function App() {
  const [bookings, setBookings] = useState(initialBookings);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <RoomSearch bookings={bookings} setBookings={setBookings} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <BookingStatus bookings={bookings} setBookings={setBookings} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={<Navigate to="/search" replace />}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;