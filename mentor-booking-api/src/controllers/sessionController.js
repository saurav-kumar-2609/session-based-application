const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all sessions
const getAllSessions = async (req, res) => {
  try {
    const sessions = await prisma.session.findMany({
      include: {
        mentor: true,
        bookings: true
      }
    });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
};

// Get single session by ID
const getSessionById = async (req, res) => {
  try {
    const { id } = req.params;
    const session = await prisma.session.findUnique({
      where: { id },
      include: {
        mentor: true,
        bookings: true
      }
    });
    
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }
    
    res.json(session);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch session' });
  }
};

// Get sessions by mentor ID
const getSessionsByMentor = async (req, res) => {
  try {
    // Handle both /mentors/:id/sessions and /sessions/mentor/:mentorId patterns
    const mentorId = req.params.id || req.params.mentorId;
    const sessions = await prisma.session.findMany({
      where: { mentorId },
      include: {
        mentor: true,
        bookings: true
      }
    });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
};

// Create new session
const createSession = async (req, res) => {
  try {
    // Check if mentorId is from URL params (for /mentors/:id/sessions route)
    const mentorIdFromParams = req.params.id;
    const { title, description, duration, price, mentorId: mentorIdFromBody } = req.body;
    
    // Use mentorId from URL params if available, otherwise from body
    const mentorId = mentorIdFromParams || mentorIdFromBody;
    
    if (!title || !description || !duration || !price || !mentorId) {
      return res.status(400).json({ 
        error: 'Title, description, duration, price, and mentorId are required' 
      });
    }
    
    // Verify mentor exists
    const mentor = await prisma.mentor.findUnique({
      where: { id: mentorId }
    });
    
    if (!mentor) {
      return res.status(404).json({ error: 'Mentor not found' });
    }
    
    const session = await prisma.session.create({
      data: {
        title,
        description,
        duration: parseInt(duration),
        price: parseFloat(price),
        mentorId
      },
      include: {
        mentor: true
      }
    });
    
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create session' });
  }
};

// Update session
const updateSession = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, duration, price } = req.body;
    
    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (duration) updateData.duration = parseInt(duration);
    if (price) updateData.price = parseFloat(price);
    
    const session = await prisma.session.update({
      where: { id },
      data: updateData,
      include: {
        mentor: true
      }
    });
    
    res.json(session);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Session not found' });
    }
    res.status(500).json({ error: 'Failed to update session' });
  }
};

// Delete session
const deleteSession = async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.session.delete({
      where: { id }
    });
    
    res.status(204).send();
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Session not found' });
    }
    res.status(500).json({ error: 'Failed to delete session' });
  }
};

module.exports = {
  getAllSessions,
  getSessionById,
  getSessionsByMentor,
  createSession,
  updateSession,
  deleteSession
};
