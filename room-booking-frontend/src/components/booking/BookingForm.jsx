import React, { useState } from 'react';
import './BookingForm.css';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useFormik } from 'formik';
import * as yup from 'yup';

// Validation schema
const validationSchema = yup.object({
  purpose: yup
    .string()
    .required('Purpose is required')
    .min(10, 'Purpose should be at least 10 characters'),
  attendees: yup
    .number()
    .required('Number of attendees is required')
    .min(1, 'Minimum 1 attendee')
    .max(100, 'Maximum 100 attendees'),
  startTime: yup
    .date()
    .required('Start time is required')
    .min(new Date(), 'Start time cannot be in the past'),
  endTime: yup
    .date()
    .required('End time is required')
    .min(yup.ref('startTime'), 'End time must be after start time'),
  additionalRequirements: yup
    .string()
    .max(500, 'Additional requirements should not exceed 500 characters'),
});

const BookingForm = ({ open, onClose, room, onBook }) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      purpose: '',
      attendees: 1,
      startTime: new Date(),
      endTime: new Date(new Date().getTime() + 60 * 60 * 1000), // 1 hour later
      additionalRequirements: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        // TODO: Implement actual booking logic
        console.log('Booking submitted:', {
          roomId: room.id,
          ...values,
        });
        
        // Mock successful booking
        await new Promise(resolve => setTimeout(resolve, 1000));
        onBook({
          roomId: room.id,
          ...values,
        });
        onClose();
      } catch (error) {
        console.error('Booking failed:', error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Book Room: {room?.name}
        <Typography variant="subtitle1" color="text.secondary">
          {room?.location} • Capacity: {room?.capacity} people
        </Typography>
      </DialogTitle>
      
      <form onSubmit={formik.handleSubmit}>
        <DialogContent className="booking-form-content">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="purpose"
                name="purpose"
                label="Purpose of Booking"
                multiline
                rows={2}
                value={formik.values.purpose}
                onChange={formik.handleChange}
                error={formik.touched.purpose && Boolean(formik.errors.purpose)}
                helperText={formik.touched.purpose && formik.errors.purpose}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Number of Attendees</InputLabel>
                <Select
                  id="attendees"
                  name="attendees"
                  value={formik.values.attendees}
                  onChange={formik.handleChange}
                  error={formik.touched.attendees && Boolean(formik.errors.attendees)}
                >
                  {[...Array(Math.min(room?.capacity || 10, 20))].map((_, i) => (
                    <MenuItem key={i + 1} value={i + 1}>
                      {i + 1} {i === 0 ? 'person' : 'people'}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label="Start Time"
                  value={formik.values.startTime}
                  onChange={(newValue) => formik.setFieldValue('startTime', newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={formik.touched.startTime && Boolean(formik.errors.startTime)}
                      helperText={formik.touched.startTime && formik.errors.startTime}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label="End Time"
                  value={formik.values.endTime}
                  onChange={(newValue) => formik.setFieldValue('endTime', newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={formik.touched.endTime && Boolean(formik.errors.endTime)}
                      helperText={formik.touched.endTime && formik.errors.endTime}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="additionalRequirements"
                name="additionalRequirements"
                label="Additional Requirements"
                multiline
                rows={3}
                value={formik.values.additionalRequirements}
                onChange={formik.handleChange}
                error={formik.touched.additionalRequirements && Boolean(formik.errors.additionalRequirements)}
                helperText={formik.touched.additionalRequirements && formik.errors.additionalRequirements}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions className="booking-form-actions">
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
          >
            {loading ? 'Booking...' : 'Confirm Booking'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default BookingForm; 