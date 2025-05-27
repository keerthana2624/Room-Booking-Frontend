import React, { useState } from 'react';
import './AdminDashboard.css';

// Mock rooms data
const initialRooms = [
  {
    id: 1,
    name: 'Conference Room A',
    capacity: 20,
    location: 'Floor 1',
    type: 'Conference',
  },
  {
    id: 2,
    name: 'Board Room',
    capacity: 12,
    location: 'Floor 1',
    type: 'Board',
  },
  {
    id: 3,
    name: 'Training Room C',
    capacity: 30,
    location: 'Floor 3',
    type: 'Projector',
  },
];

const AdminDashboard = () => {
  const [rooms, setRooms] = useState(initialRooms);
  const [form, setForm] = useState({ name: '', capacity: '', location: '', type: '' });
  const [editId, setEditId] = useState(null);

  // Dashboard stats (mock)
  const totalRooms = rooms.length;
  const totalBookings = 42; // mock
  const pendingApprovals = 3; // mock

  // Add or edit room
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      setRooms(rooms.map(r => r.id === editId ? { ...form, id: editId, capacity: Number(form.capacity) } : r));
      setEditId(null);
    } else {
      setRooms([
        ...rooms,
        { ...form, id: rooms.length ? Math.max(...rooms.map(r => r.id)) + 1 : 1, capacity: Number(form.capacity) }
      ]);
    }
    setForm({ name: '', capacity: '', location: '', type: '' });
  };

  // Edit room
  const handleEdit = (room) => {
    setForm({ name: room.name, capacity: room.capacity, location: room.location, type: room.type });
    setEditId(room.id);
  };

  // Delete room
  const handleDelete = (id) => {
    setRooms(rooms.filter(r => r.id !== id));
    if (editId === id) setEditId(null);
  };

  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-title">Admin Dashboard</div>
      <div className="admin-dashboard-cards">
        <div className="admin-dashboard-card">Total Rooms<br />{totalRooms}</div>
        <div className="admin-dashboard-card">Total Bookings<br />{totalBookings}</div>
        <div className="admin-dashboard-card">Pending Approvals<br />{pendingApprovals}</div>
      </div>
      <div className="admin-room-list">
        <div className="admin-room-list-title">Room Management</div>
        <table className="admin-room-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Capacity</th>
              <th>Location</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map(room => (
              <tr key={room.id}>
                <td>{room.name}</td>
                <td>{room.capacity}</td>
                <td>{room.location}</td>
                <td>{room.type}</td>
                <td>
                  <div className="admin-room-actions">
                    <button className="admin-room-btn edit" onClick={() => handleEdit(room)}>Edit</button>
                    <button className="admin-room-btn delete" onClick={() => handleDelete(room.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <form className="admin-add-room-form" onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Room Name"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            required
          />
          <input
            type="number"
            placeholder="Capacity"
            value={form.capacity}
            onChange={e => setForm(f => ({ ...f, capacity: e.target.value }))}
            required
            min={1}
          />
          <input
            type="text"
            placeholder="Location"
            value={form.location}
            onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
            required
          />
          <input
            type="text"
            placeholder="Type"
            value={form.type}
            onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
            required
          />
          <button type="submit">{editId ? 'Update Room' : 'Add Room'}</button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;