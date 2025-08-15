# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a session-based mentor booking API built with Node.js, Express, and Prisma ORM. The application manages mentors, their sessions, and user bookings.

## Architecture

### Database Layer
- **ORM**: Prisma with PostgreSQL
- **Database Models**:
  - `Mentor`: Stores mentor information (id, name, bio)
  - `Session`: Represents mentoring sessions (title, description, duration, price)
  - `Booking`: User bookings for sessions (userName, userEmail, preferredDateTime, message)

### Technology Stack
- **Runtime**: Node.js
- **Framework**: Express.js (v5.1.0)
- **Database**: PostgreSQL
- **ORM**: Prisma (v6.14.0)
- **Development**: Nodemon for auto-reloading

## Project Structure

### Complete Project Structure
```
mentor-booking-api/
├── src/                       # Source code directory
│   ├── controllers/           # Route controllers
│   │   ├── mentorController.js    # Mentor CRUD operations
│   │   ├── sessionController.js   # Session CRUD operations
│   │   └── bookingController.js   # Booking CRUD operations
│   ├── routes/                # Express route definitions
│   │   ├── mentorRoutes.js        # Mentor API routes
│   │   ├── sessionRoutes.js       # Session API routes
│   │   └── bookingRoutes.js       # Booking API routes
│   └── app.js                 # Express app configuration
├── prisma/
│   ├── schema.prisma          # Database schema definition
│   └── migrations/            # Database migration files
├── generated/                 # Auto-generated Prisma client
├── index.js                   # Main server entry point
├── README.md                  # API documentation
├── .env                      # Environment variables
└── package.json              # Dependencies and scripts
```

## Development Commands

### Database Operations
```bash
# Navigate to the API directory
cd mentor-booking-api

# Generate Prisma client after schema changes
npx prisma generate

# Create and run database migrations
npx prisma migrate dev --name <migration_name>

# Reset database (destructive)
npx prisma migrate reset

# View database in Prisma Studio
npx prisma studio

# Push schema changes without migration (development)
npx prisma db push

# Seed database (if seed script exists)
npx prisma db seed
```

### Application Development
```bash
# Install dependencies
npm install

# Start development server (when main application exists)
npm run dev

# Start production server
npm start

# Run tests (when test suite exists)
npm test
```

## Environment Configuration

The application uses a `.env` file for configuration:
- `DATABASE_URL`: PostgreSQL connection string for Prisma

## Database Schema

### Core Entities
1. **Mentor**: Individual mentors offering sessions
   - Unique UUID identifier
   - Profile information (name, bio)
   - Timestamps for creation and updates

2. **Session**: Mentoring sessions offered by mentors
   - Belongs to a mentor (mentorId foreign key)
   - Session details (title, description, duration in minutes)
   - Pricing information (Decimal for precise currency handling)
   - Cascade deletion when mentor is removed

3. **Booking**: User reservations for sessions
   - Belongs to a session (sessionId foreign key)
   - User contact information (userName, userEmail)
   - Preferred date/time for the session
   - Optional message from user
   - Cascade deletion when session is removed

### Key Relationships
- One Mentor can have many Sessions (1:N)
- One Session can have many Bookings (1:N)
- Cascade deletion ensures referential integrity

## Current Development Status

**✅ COMPLETE: Full application structure implemented!**

The project now includes:
- ✅ Database schema defined and migrated
- ✅ Complete Express.js application structure
- ✅ RESTful API endpoints for all entities
- ✅ Prisma ORM integration
- ✅ Input validation and error handling
- ✅ CORS support and health check endpoint
- ✅ Comprehensive README with API documentation

## Next Development Steps

Once the basic structure is created, implement:
1. **Express server setup** in `src/app.js`
2. **Prisma client integration** for database operations
3. **API routes** for mentors, sessions, and bookings
4. **Controllers** to handle business logic
5. **Middleware** for error handling and validation
6. **Input validation** using libraries like Joi or express-validator

## Common Issues and Solutions

### Prisma Client Generation
- After modifying `prisma/schema.prisma`, always run `npx prisma generate`
- The generated client is located in `generated/prisma/`

### Database Connection
- Ensure PostgreSQL server is running and accessible
- Verify DATABASE_URL format: `postgresql://user:password@host:port/database?schema=public`
- Check that the database exists before running migrations

### Migration Conflicts
- Use `npx prisma migrate reset` for development database resets
- For production, create proper migration files with `npx prisma migrate dev`

## Testing Strategy

When implementing tests, consider:
- Unit tests for business logic
- Integration tests for API endpoints
- Database integration tests using test database
- Use Jest or similar testing framework for Node.js
