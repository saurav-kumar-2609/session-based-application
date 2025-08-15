const express = require('express');
const router = express.Router();
const {
  getAllMentors,
  getMentorById,
  createMentor,
  updateMentor,
  deleteMentor
} = require('../controllers/mentorController');

// GET /api/mentors - Get all mentors
router.get('/', getAllMentors);

// GET /api/mentors/:id - Get single mentor by ID
router.get('/:id', getMentorById);

// POST /api/mentors - Create new mentor
router.post('/', createMentor);

// PUT /api/mentors/:id - Update mentor
router.put('/:id', updateMentor);

// DELETE /api/mentors/:id - Delete mentor
router.delete('/:id', deleteMentor);

// Assignment-specific routes
// POST /api/mentors/:id/sessions - Add a new session offering to a mentor
router.post('/:id/sessions', require('../controllers/sessionController').createSession);

// GET /api/mentors/:id/sessions - Get all session offerings by mentor
router.get('/:id/sessions', require('../controllers/sessionController').getSessionsByMentor);

module.exports = router;
