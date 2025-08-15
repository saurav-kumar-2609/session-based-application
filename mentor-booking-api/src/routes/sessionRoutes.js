const express = require('express');
const router = express.Router();
const {
  getAllSessions,
  getSessionById,
  getSessionsByMentor,
  createSession,
  updateSession,
  deleteSession
} = require('../controllers/sessionController');

// GET /api/sessions - Get all sessions
router.get('/', getAllSessions);

// GET /api/sessions/mentor/:mentorId - Get sessions by mentor ID (must come before /:id)
router.get('/mentor/:mentorId', getSessionsByMentor);

// GET /api/sessions/:id - Get single session by ID
router.get('/:id', getSessionById);

// POST /api/sessions - Create new session
router.post('/', createSession);

// PUT /api/sessions/:id - Update session
router.put('/:id', updateSession);

// DELETE /api/sessions/:id - Delete session
router.delete('/:id', deleteSession);

// Assignment-specific routes
// POST /api/sessions/:id/bookings - Book a session
router.post('/:id/bookings', require('../controllers/bookingController').createBooking);

module.exports = router;
