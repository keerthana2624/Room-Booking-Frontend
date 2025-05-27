import React from 'react';
import './BookingStatus.css';

const statusClass = {
  pending: 'booking-status-badge booking-status-pending',
  approved: 'booking-status-badge booking-status-approved',
  rejected: 'booking-status-badge booking-status-rejected',
};

const BookingStatus = ({ bookings, setBookings }) => {
  const handleCancel = (id) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'rejected' } : b));
  };

  return (
    <div className="booking-status-container">
      <h2>My Bookings</h2>
      <div className="booking-list">
        {bookings.length === 0 && <div>No bookings found.</div>}
        {bookings.map(booking => (
          <div className="booking-card" key={booking.id}>
            <div className="booking-card-header">
              <span>{booking.roomName}</span>
              <span className={statusClass[booking.status]}>{booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</span>
            </div>
            <div className="booking-card-details">
              <div><b>Date:</b> {booking.date}</div>
              <div><b>Time:</b> {booking.startTime} - {booking.endTime}</div>
              <div><b>Purpose:</b> {booking.purpose}</div>
            </div>
            {booking.status === 'pending' && (
              <div className="booking-card-actions">
                <button className="booking-cancel-btn" onClick={() => handleCancel(booking.id)}>
                  Cancel Booking
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingStatus; 