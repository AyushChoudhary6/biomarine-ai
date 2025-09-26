# Biomarine AI - Frontend/Backend Integration Guide

## Overview
This guide documents the complete integration between the frontend React application and the backend Node.js/Express API for the Biomarine AI platform.

## Architecture Summary

### Backend (Node.js/Express)
- **Framework**: Express.js with MongoDB/Mongoose
- **Authentication**: JWT tokens with Passport.js
- **API Base URL**: `http://localhost:5000/api`
- **Key Features**: User management, authentication, profile management, research stats

### Frontend (React/Vite)
- **Framework**: React 19 with Vite
- **State Management**: Context API for authentication
- **HTTP Client**: Axios with interceptors
- **Routing**: React Router DOM
- **UI**: Tailwind CSS with Framer Motion

## Key Integration Points

### 1. User Authentication Flow

#### Registration (`POST /api/auth/register`)
**Frontend Form Fields:**
```javascript
{
  name: string,           // Full name
  email: string,          // Email address
  phone: string,          // Phone number (10-15 chars)
  password: string,       // Password (min 6 chars)
  country: string,        // Country selection
  userType: 'student' | 'researcher',
  // Researcher-specific fields (conditional)
  qualifications?: string,
  popularArticle?: string,
  institute?: string
}
```

**Backend Response:**
```javascript
{
  token: string,          // JWT token
  user: {
    id: string,
    name: string,
    email: string,
    phone: string,
    country: string,
    userType: string,
    qualifications?: string,
    popularArticle?: string,
    institute?: string,
    specialization?: string,
    yearsOfExperience?: number,
    researchInterests?: string[],
    createdAt: Date
  }
}
```

#### Login (`POST /api/auth/login`)
**Frontend Form Fields:**
```javascript
{
  email: string,
  password: string
}
```

**Backend Response:** Same as registration response

### 2. Profile Management

#### Get Profile (`GET /api/profile`)
**Headers Required:** `Authorization: Bearer <token>`

**Backend Response:**
```javascript
{
  user: {
    // Complete user data (excluding password)
  },
  researchStats: {
    publications: number,
    citations: number,
    projects: number
  } | null
}
```

#### Update Profile (`PUT /api/profile`)
**Frontend Payload:** Any subset of user fields to update
**Backend Response:** Updated user object

### 3. Data Models Alignment

#### User Schema (Backend)
```javascript
{
  name: { type: String, required: true, minlength: 2, maxlength: 50 },
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: { type: String, required: true, unique: true, minlength: 10, maxlength: 15 },
  password: { type: String, required: true, minlength: 6 },
  country: { type: String, required: true },
  userType: { type: String, enum: ['student', 'researcher'], required: true },
  qualifications: { type: String, required: function() { return this.userType === 'researcher'; } },
  popularArticle: { type: String },
  institute: { type: String, required: function() { return this.userType === 'researcher'; } },
  specialization: { type: String },
  yearsOfExperience: { type: Number, default: 0 },
  researchInterests: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
}
```

#### Research Stats Schema (Backend)
```javascript
{
  userId: { type: ObjectId, ref: 'User', required: true },
  publications: { type: Number, default: 0 },
  citations: { type: Number, default: 0 },
  projects: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now }
}
```

## Setup Instructions

### Backend Setup

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Environment Configuration**
   Create `backend/.env`:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/biomarine-ai
   JWT_SECRET=your-super-secret-jwt-key-here
   NODE_ENV=development
   ```

3. **Start Backend Server**
   ```bash
   npm start
   ```

### Frontend Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   Create `.env.local`:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

3. **Start Frontend Development Server**
   ```bash
   npm run dev
   ```

## API Endpoints Summary

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | User registration | No |
| POST | `/api/auth/login` | User login | No |
| GET | `/api/profile` | Get user profile | Yes |
| PUT | `/api/profile` | Update user profile | Yes |

## Authentication Context Usage

### Frontend Implementation
```javascript
import { useAuth } from '../contexts/AuthContext'

const MyComponent = () => {
  const { 
    user, 
    isAuthenticated, 
    login, 
    register, 
    logout, 
    loading, 
    error 
  } = useAuth()

  // Use authentication methods
}
```

### API Integration
```javascript
import { authAPI, profileAPI } from '../utils/api'

// Login
const result = await authAPI.login({ email, password })

// Register
const result = await authAPI.register(userData)

// Get profile
const profile = await profileAPI.getProfile()

// Update profile
const updated = await profileAPI.updateProfile(data)
```

## Error Handling

### Backend Error Responses
```javascript
{
  message: string,  // Error description
  status?: number   // HTTP status code
}
```

### Frontend Error Handling
- Form validation errors displayed inline
- API errors shown in error banners
- Network errors handled with retry mechanisms
- Authentication errors redirect to login

## Security Features

1. **Password Hashing**: bcryptjs with salt rounds
2. **JWT Tokens**: Secure token-based authentication
3. **Input Validation**: Joi validation on backend
4. **CORS**: Configured for cross-origin requests
5. **Helmet**: Security headers middleware

## Testing the Integration

### Manual Testing Steps

1. **Registration Flow**
   - Navigate to `/signup`
   - Fill out form with valid data
   - Submit and verify redirect to dashboard
   - Check that user data is stored correctly

2. **Login Flow**
   - Navigate to `/login`
   - Enter valid credentials
   - Verify successful login and redirect
   - Check that user context is populated

3. **Profile Management**
   - Navigate to `/profile`
   - Verify user data is displayed correctly
   - Update profile information
   - Verify changes are saved

4. **Authentication Persistence**
   - Login and refresh the page
   - Verify user remains authenticated
   - Logout and verify redirect to login

## Common Issues and Solutions

### CORS Issues
If you encounter CORS errors, ensure the backend CORS configuration allows the frontend origin:
```javascript
app.use(cors({
  origin: 'http://localhost:5173', // Vite default port
  credentials: true
}))
```

### Token Expiration
Tokens expire after 24 hours. The frontend automatically handles expired tokens by redirecting to login.

### Database Connection
Ensure MongoDB is running and the connection string in `.env` is correct.

## Production Deployment Notes

1. **Environment Variables**: Update API URLs for production
2. **Database**: Use MongoDB Atlas or production database
3. **Security**: Use strong JWT secrets and HTTPS
4. **CORS**: Configure for production domain
5. **Build**: Use `npm run build` for frontend production build

## File Structure Summary

```
biomarine-ai/
├── backend/
│   ├── config/database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── profileController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── validation.js
│   ├── models/
│   │   ├── User.js
│   │   └── ResearchStats.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── profile.js
│   └── server.js
├── src/
│   ├── contexts/
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   ├── pages/
│   │   ├── login.jsx
│   │   ├── signup.jsx
│   │   └── profile.jsx
│   ├── utils/
│   │   └── api.js
│   └── main.jsx
└── INTEGRATION_GUIDE.md
```

This integration provides a robust, secure, and scalable foundation for the Biomarine AI platform with proper separation of concerns and clean API design.
