import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

// Components
import Layout from './components/layout/Layout';
import Login from './components/auth/Login';
import RoomSearch from './components/room/RoomSearch';

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
                <RoomSearch />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/"
            element={<Navigate to="/search" replace />}
          />
          
          {/* Add more routes here as we implement them */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;