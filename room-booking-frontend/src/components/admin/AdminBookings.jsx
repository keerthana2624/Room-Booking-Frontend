import React from 'react';
import './AdminBookings.css';

const AdminBookings = ({ bookings, setBookings }) => {
  const pendingBookings = bookings.filter(b => b.status === 'pending');

  const handleApprove = (id) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'approved' } : b));
  };
  const handleReject = (id) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'rejected' } : b));
  };

  return (
    <div className="admin-bookings-container">
      <div className="admin-bookings-title">Pending Booking Requests</div>
      <div className="admin-booking-list">
        {pendingBookings.length === 0 && <div>No pending bookings.</div>}
        {pendingBookings.map(booking => (
          <div className="admin-booking-card" key={booking.id}>
            <div className="admin-booking-card-header">
              <span>{booking.roomName}</span>
              <span className="admin-booking-status-badge">Pending</span>
            </div>
            <div className="admin-booking-card-details">
              <div><b>Date:</b> {booking.date}</div>
              <div><b>Time:</b> {booking.startTime} - {booking.endTime}</div>
              <div><b>Purpose:</b> {booking.purpose}</div>
            </div>
            <div className="admin-booking-card-actions">
              <button className="admin-approve-btn" onClick={() => handleApprove(booking.id)}>Approve</button>
              <button className="admin-reject-btn" onClick={() => handleReject(booking.id)}>Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBookings;