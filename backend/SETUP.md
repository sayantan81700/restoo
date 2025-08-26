# Backend Setup Guide

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud)

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/restoo
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=30d

# Cloudinary (optional for now)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Stripe (optional for now)
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Node Environment
NODE_ENV=development
```

### 3. MongoDB Setup

Make sure MongoDB is running on your system:

**Local MongoDB:**

```bash
# Start MongoDB service
mongod
```

**Or use MongoDB Atlas (cloud):**

- Sign up at https://www.mongodb.com/atlas
- Create a cluster
- Get your connection string
- Replace MONGODB_URI in .env

### 4. Start the Server

```bash
# Development mode (with nodemon)
npm run dev

# Or production mode
npm start

# Or test mode (without database)
npm test
```

### 5. Test the API

Once the server is running, you can test it:

```bash
# Health check
curl http://localhost:5000/health

# Main endpoint
curl http://localhost:5000/

# Register a user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "phone": "1234567890"
  }'
```

## Troubleshooting

### MongoDB Connection Issues

1. Make sure MongoDB is running
2. Check your connection string
3. Verify network connectivity
4. Check firewall settings

### Port Already in Use

If port 5000 is already in use, change the PORT in your .env file:

```env
PORT=5001
```

### Missing Dependencies

If you get module not found errors:

```bash
npm install
```

## API Endpoints

### Auth Routes

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `PUT /api/auth/updatedetails` - Update user details (protected)
- `PUT /api/auth/updatepassword` - Update password (protected)
- `POST /api/auth/forgotpassword` - Forgot password
- `PUT /api/auth/resetpassword/:token` - Reset password
- `GET /api/auth/verify/:token` - Verify email

### Health Check

- `GET /health` - Server health status
- `GET /` - Welcome message
