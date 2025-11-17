# Evify Backend API Documentation

## Setup Instructions

### 1. Firebase Setup
```bash
# Install Firebase
npm install firebase firebase-admin

# Install additional dependencies
npm install express cors dotenv
```

### 2. Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing
3. Enable Firestore Database
4. Enable Authentication (Email/Password)
5. Get your configuration from Project Settings

### 3. Environment Variables

Create `.env` file in backend folder:

```env
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
PORT=5000
```

---

## API Endpoints

### Base URL
```
http://localhost:5000/api
```

---

## Events API

### GET /events
Get all events

**Query Parameters:**
- `category` (optional) - Filter by category ID
- `status` (optional) - Filter by status (upcoming/ongoing/completed)
- `featured` (optional) - Filter featured events (true/false)
- `limit` (optional) - Limit results (default: 50)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "evt_001",
      "title": "International Science Olympiad 2025",
      "categoryName": "Competition",
      "location": {
        "city": "Singapore",
        "country": "Singapore"
      },
      "dates": {
        "startDate": "2025-01-20T09:00:00Z"
      }
    }
  ]
}
```

---

### GET /events/:id
Get single event by ID

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "evt_001",
    "title": "International Science Olympiad 2025",
    "description": "...",
    "organizer": { ... },
    "registration": { ... }
  }
}
```

---

### POST /events
Create new event (Admin only)

**Request Body:**
```json
{
  "title": "New Event",
  "description": "Event description",
  "categoryId": "cat_competitions",
  "location": {
    "venue": "Event Hall",
    "city": "New York",
    "country": "USA"
  },
  "dates": {
    "registrationDeadline": "2025-12-01T23:59:59Z",
    "startDate": "2025-12-15T09:00:00Z",
    "endDate": "2025-12-17T18:00:00Z"
  }
}
```

---

### PUT /events/:id
Update event (Admin only)

---

### DELETE /events/:id
Delete event (Admin only)

---

### GET /events/search
Search events

**Query Parameters:**
- `q` (required) - Search query

---

## Users API

### GET /users/:id
Get user profile

---

### PUT /users/:id
Update user profile

**Request Body:**
```json
{
  "name": "John Doe",
  "age": 16,
  "school": "High School",
  "interests": ["cat_competitions"]
}
```

---

## Saved Events API

### GET /saved-events/:userId
Get user's saved events

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "saved_001",
      "userId": "user_123",
      "eventId": "evt_001",
      "savedAt": "2024-11-10T10:00:00Z"
    }
  ]
}
```

---

### POST /saved-events
Save an event

**Request Body:**
```json
{
  "userId": "user_123",
  "eventId": "evt_001",
  "notes": "Interested in participating"
}
```

---

### DELETE /saved-events/:userId/:eventId
Unsave an event

---

## Categories API

### GET /categories
Get all categories

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "cat_competitions",
      "name": "Competitions",
      "icon": "🏆",
      "color": "#F59E0B",
      "eventCount": 25
    }
  ]
}
```

---

### GET /categories/:id
Get category by ID

---

### GET /categories/:id/events
Get events in a category

---

## Authentication

### POST /auth/register
Register new user

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

---

### POST /auth/login
Login user

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "name": "John Doe"
    },
    "token": "jwt_token_here"
  }
}
```

---

## Error Responses

All endpoints return errors in this format:

```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE"
  }
}
```

**Common Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error
