# Authentication System Setup Guide

## Overview
The authentication system has been completely fixed and now supports:
- ✅ Regular email/password login
- ✅ Google OAuth login
- ✅ JWT token-based authentication
- ✅ Profile page with real user data
- ✅ Proper error handling

## Setup Instructions

### 1. Environment Variables

#### Frontend (.env in root directory)
Create a `.env` file in the root directory with:
```
VITE_API_URL=http://localhost:5000/api
REACT_APP_API_URL=http://localhost:5000/api
```

#### Backend (.env in backend directory)
Create a `.env` file in the backend directory with:
```
# Database
MONGODB_URI=mongodb://localhost:27017/biomarine-ai

# JWT Secret (generate a random string)
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here

# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 2. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set application type to "Web application"
6. Add authorized redirect URI: `http://localhost:5000/api/auth/google/callback`
7. Copy the Client ID and Client Secret to your backend .env file

### 3. Generate JWT Secret

Run this command to generate a secure JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 4. Database Setup

Make sure MongoDB is running locally or update the MONGODB_URI to point to your MongoDB Atlas cluster.

## Fixed Issues

### Backend Fixes:
1. ✅ Added Google OAuth routes (`/api/auth/google`, `/api/auth/google/callback`)
2. ✅ Fixed Google Strategy to handle user creation properly
3. ✅ Updated User model to handle Google OAuth users (phone field not required initially)
4. ✅ Added proper JWT token generation in OAuth callback
5. ✅ Fixed password hashing for Google OAuth users

### Frontend Fixes:
1. ✅ Added functional Google login button
2. ✅ Created OAuth callback handler component
3. ✅ Updated AuthContext to handle OAuth login
4. ✅ Completely rewrote profile page to use real user data
5. ✅ Added proper error handling for authentication failures
6. ✅ Fixed API configuration to support both Vite and React environment variables

### Profile Page Features:
- ✅ Displays real user data from authentication
- ✅ Editable profile fields with save/cancel functionality
- ✅ Research statistics display
- ✅ Research interests management
- ✅ Loading states and error handling
- ✅ Logout functionality

## Testing the System

### 1. Start the Backend
```bash
cd backend
npm install
npm start
```

### 2. Start the Frontend
```bash
npm install
npm run dev
```

### 3. Test Authentication
1. Visit `http://localhost:5173/login`
2. Try regular login with existing credentials
3. Try Google OAuth login (requires Google OAuth setup)
4. After login, visit `/profile` to see user data
5. Test profile editing functionality

## Troubleshooting

### Common Issues:
1. **Google OAuth not working**: Check that redirect URI is correctly set in Google Cloud Console
2. **Profile page showing "No User Data"**: Check that JWT token is valid and user data is being fetched
3. **API calls failing**: Verify environment variables are set correctly
4. **Database connection issues**: Ensure MongoDB is running and connection string is correct

### Debug Steps:
1. Check browser console for JavaScript errors
2. Check backend logs for authentication errors
3. Verify environment variables are loaded correctly
4. Test API endpoints directly using tools like Postman

## Security Notes
- JWT tokens expire after 1 day
- Passwords are properly hashed using bcrypt
- Google OAuth users get randomly generated secure passwords
- Environment variables contain sensitive data and should never be committed to version control
