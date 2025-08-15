const express = require('express');
const router = express.Router();
const {
  getAllBookings,
  getBookingById,
  getBookingsBySession,
  getBookingsByUser,
  createBooking,
  updateBooking,
  deleteBooking
} = require('../controllers/bookingController');

// GET /api/bookings - Get all bookings
router.get('/', getAllBookings);

// GET /api/bookings/session/:sessionId - Get bookings by session ID (must come before /:id)
router.get('/session/:sessionId', getBookingsBySession);

// GET /api/bookings/user/:userEmail - Get bookings by user email
router.get('/user/:userEmail', getBookingsByUser);

// GET /api/bookings/:id - Get single booking by ID
router.get('/:id', getBookingById);

// POST /api/bookings - Create new booking
router.post('/', createBooking);

// PUT /api/bookings/:id - Update booking
router.put('/:id', updateBooking);

// DELETE /api/bookings/:id - Delete booking
router.delete('/:id', deleteBooking);

module.exports = router;
