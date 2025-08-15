# Mentor Booking API

A RESTful API for managing mentor sessions and bookings built with Node.js, Express, and Prisma ORM.

## 🚀 Features

- **Mentor Management**: Create, read, update, and delete mentor profiles
- **Session Management**: Manage mentoring sessions with pricing and duration
- **Booking System**: Handle user bookings for sessions with validation
- **Database Integration**: PostgreSQL with Prisma ORM
- **Input Validation**: Comprehensive validation for all endpoints
- **Error Handling**: Structured error responses
- **CORS Support**: Cross-origin resource sharing enabled

## 🛠️ Technology Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Prisma** - Database ORM
- **PostgreSQL** - Database
- **dotenv** - Environment variable management

## 📋 Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn package manager

## ⚡ Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set up Environment Variables**
   ```bash
   # Copy .env and update with your database URL
   DATABASE_URL="postgresql://username:password@localhost:5432/mydb?schema=public"
   ```

3. **Set up Database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run migrations
   npx prisma migrate dev
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Start Production Server**
   ```bash
   npm start
   ```

## 🔗 API Endpoints

### Mentors

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/mentors` | Get all mentors |
| GET | `/api/mentors/:id` | Get mentor by ID |
| POST | `/api/mentors` | Create new mentor |
| PUT | `/api/mentors/:id` | Update mentor |
| DELETE | `/api/mentors/:id` | Delete mentor |

### Sessions

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/sessions` | Get all sessions |
| GET | `/api/sessions/:id` | Get session by ID |
| GET | `/api/sessions/mentor/:mentorId` | Get sessions by mentor |
| POST | `/api/sessions` | Create new session |
| PUT | `/api/sessions/:id` | Update session |
| DELETE | `/api/sessions/:id` | Delete session |

### Bookings

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/bookings` | Get all bookings |
| GET | `/api/bookings/:id` | Get booking by ID |
| GET | `/api/bookings/session/:sessionId` | Get bookings by session |
| GET | `/api/bookings/user/:userEmail` | Get bookings by user |
| POST | `/api/bookings` | Create new booking |
| PUT | `/api/bookings/:id` | Update booking |
| DELETE | `/api/bookings/:id` | Delete booking |

## 📝 API Usage Examples

### Create a Mentor
```bash
curl -X POST http://localhost:3000/api/mentors \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "bio": "Experienced software engineer with 10 years in full-stack development"
  }'
```

### Create a Session
```bash
curl -X POST http://localhost:3000/api/sessions \
  -H "Content-Type: application/json" \
  -d '{
    "title": "JavaScript Fundamentals",
    "description": "Learn the basics of JavaScript programming",
    "duration": 60,
    "price": 50.00,
    "mentorId": "your-mentor-id"
  }'
```

### Create a Booking
```bash
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "userName": "Jane Smith",
    "userEmail": "jane@example.com",
    "preferredDateTime": "2024-12-01T10:00:00Z",
    "message": "Looking forward to learning JavaScript!",
    "sessionId": "your-session-id"
  }'
```

## 🗃️ Database Schema

The application uses three main entities:

- **Mentor**: Stores mentor profiles and information
- **Session**: Represents mentoring sessions with pricing
- **Booking**: Manages user bookings for sessions

## 🚀 Development Commands

```bash
# Install dependencies
npm install

# Start development server with auto-reload
npm run dev

# Start production server
npm start

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# View database in Prisma Studio
npx prisma studio

# Reset database (development only)
npx prisma migrate reset
```

## 🔍 Health Check

Check if the API is running:
```bash
curl http://localhost:3000/health
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support, please open an issue in the repository or contact the development team.
