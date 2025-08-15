const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        session: {
          include: {
            mentor: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

// Get single booking by ID
const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        session: {
          include: {
            mentor: true
          }
        }
      }
    });
    
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch booking' });
  }
};

// Get bookings by session ID
const getBookingsBySession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const bookings = await prisma.booking.findMany({
      where: { sessionId },
      include: {
        session: {
          include: {
            mentor: true
          }
        }
      },
      orderBy: {
        preferredDateTime: 'asc'
      }
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

// Get bookings by user email
const getBookingsByUser = async (req, res) => {
  try {
    const { userEmail } = req.params;
    const bookings = await prisma.booking.findMany({
      where: { userEmail },
      include: {
        session: {
          include: {
            mentor: true
          }
        }
      },
      orderBy: {
        preferredDateTime: 'desc'
      }
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

// Create new booking
const createBooking = async (req, res) => {
  try {
    // Check if sessionId is from URL params (for /sessions/:id/bookings route)
    const sessionIdFromParams = req.params.id;
    const { userName, userEmail, preferredDateTime, message, sessionId: sessionIdFromBody } = req.body;
    
    // Use sessionId from URL params if available, otherwise from body
    const sessionId = sessionIdFromParams || sessionIdFromBody;
    
    if (!userName || !userEmail || !preferredDateTime || !sessionId) {
      return res.status(400).json({ 
        error: 'userName, userEmail, preferredDateTime, and sessionId are required' 
      });
    }
    
    // Verify session exists
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: { mentor: true }
    });
    
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    
    // Validate date format
    const preferredDate = new Date(preferredDateTime);
    if (isNaN(preferredDate.getTime())) {
      return res.status(400).json({ error: 'Invalid date format' });
    }
    
    // Check if the preferred date is in the future
    if (preferredDate <= new Date()) {
      return res.status(400).json({ error: 'Preferred date must be in the future' });
    }
    
    const booking = await prisma.booking.create({
      data: {
        userName,
        userEmail,
        preferredDateTime: preferredDate,
        message: message || null,
        sessionId
      },
      include: {
        session: {
          include: {
            mentor: true
          }
        }
      }
    });
    
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create booking' });
  }
};

// Update booking
const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { userName, userEmail, preferredDateTime, message } = req.body;
    
    const updateData = {};
    if (userName) updateData.userName = userName;
    if (userEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userEmail)) {
        return res.status(400).json({ error: 'Invalid email format' });
      }
      updateData.userEmail = userEmail;
    }
    if (preferredDateTime) {
      const preferredDate = new Date(preferredDateTime);
      if (isNaN(preferredDate.getTime())) {
        return res.status(400).json({ error: 'Invalid date format' });
      }
      if (preferredDate <= new Date()) {
        return res.status(400).json({ error: 'Preferred date must be in the future' });
      }
      updateData.preferredDateTime = preferredDate;
    }
    if (message !== undefined) updateData.message = message;
    
    const booking = await prisma.booking.update({
      where: { id },
      data: updateData,
      include: {
        session: {
          include: {
            mentor: true
          }
        }
      }
    });
    
    res.json(booking);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.status(500).json({ error: 'Failed to update booking' });
  }
};

// Delete booking
const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.booking.delete({
      where: { id }
    });
    
    res.status(204).send();
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.status(500).json({ error: 'Failed to delete booking' });
  }
};

module.exports = {
  getAllBookings,
  getBookingById,
  getBookingsBySession,
  getBookingsByUser,
  createBooking,
  updateBooking,
  deleteBooking
};
