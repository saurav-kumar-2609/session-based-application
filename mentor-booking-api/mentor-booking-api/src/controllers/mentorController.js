const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all mentors
const getAllMentors = async (req, res) => {
  try {
    const mentors = await prisma.mentor.findMany({
      include: {
        sessions: true
      }
    });
    res.json(mentors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch mentors' });
  }
};

// Get single mentor by ID
const getMentorById = async (req, res) => {
  try {
    const { id } = req.params;
    const mentor = await prisma.mentor.findUnique({
      where: { id },
      include: {
        sessions: {
          include: {
            bookings: true
          }
        }
      }
    });
    
    if (!mentor) {
      return res.status(404).json({ error: 'Mentor not found' });
    }
    
    res.json(mentor);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch mentor' });
  }
};

// Create new mentor
const createMentor = async (req, res) => {
  try {
    const { name, bio } = req.body;
    
    if (!name || !bio) {
      return res.status(400).json({ error: 'Name and bio are required' });
    }
    
    const mentor = await prisma.mentor.create({
      data: {
        name,
        bio
      }
    });
    
    res.status(201).json(mentor);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create mentor' });
  }
};

// Update mentor
const updateMentor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, bio } = req.body;
    
    const mentor = await prisma.mentor.update({
      where: { id },
      data: {
        name,
        bio
      }
    });
    
    res.json(mentor);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Mentor not found' });
    }
    res.status(500).json({ error: 'Failed to update mentor' });
  }
};

// Delete mentor
const deleteMentor = async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.mentor.delete({
      where: { id }
    });
    
    res.status(204).send();
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Mentor not found' });
    }
    res.status(500).json({ error: 'Failed to delete mentor' });
  }
};

module.exports = {
  getAllMentors,
  getMentorById,
  createMentor,
  updateMentor,
  deleteMentor
};
