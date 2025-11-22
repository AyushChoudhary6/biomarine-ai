# MongoDB Setup Guide

## Option 1: MongoDB Atlas (Recommended - Free Cloud Database)

### Step 1: Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new cluster (choose the free M0 tier)
4. Select a cloud provider and region (closest to you)

### Step 2: Configure Database Access
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Create a username and password (save these!)
4. Set privileges to "Read and write to any database"

### Step 3: Configure Network Access
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
4. Or add your specific IP address for better security

### Step 4: Get Connection String
1. Go to "Clusters" and click "Connect"
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `<dbname>` with your database name (e.g., `biomarine-ai`)

### Step 5: Update Your .env File
Replace the MONGODB_URI in your backend/.env file:
```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/biomarine-ai?retryWrites=true&w=majority
```

## Option 2: Local MongoDB Installation

### Windows:
1. Download MongoDB Community Server from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
2. Run the installer and follow the setup wizard
3. Start MongoDB service:
   ```cmd
   net start MongoDB
   ```

### Alternative: MongoDB with Docker
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

## Testing the Connection

After setting up MongoDB, restart your server:
```bash
cd backend
npm start
```

You should see "MongoDB connected successfully" in the console.
