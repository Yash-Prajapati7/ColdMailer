# ColdMailer Backend

A secure, scalable Node.js and Express-based backend server for the ColdMailer email automation platform. Handles user authentication, email dispatch, password management, and file uploads.

## Overview

The backend provides RESTful API endpoints for user management, email sending, authentication, and password recovery. It uses MongoDB for data persistence and implements JWT-based authentication with secure encryption.

## Features

- **User Authentication**: JWT-based token authentication with HTTP-only cookies
- **Password Encryption**: Custom character-level encryption for enhanced security
- **Email Sending**: SMTP integration via Nodemailer for reliable email dispatch
- **Password Recovery**: OTP-based (One-Time Password) password reset mechanism
- **File Uploads**: Secure file upload handling with Multer
- **CORS Configuration**: Support for multiple frontend origins
- **Error Handling**: Comprehensive error handling and validation
- **Environment Configuration**: Centralized environment variable management

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - Object Data Modeling (ODM)
- **Nodemailer** - Email service
- **JWT (jsonwebtoken)** - Token-based authentication
- **Multer** - File upload middleware
- **dotenv** - Environment variable loader
- **Cookie Parser** - Cookie management
- **CORS** - Cross-Origin Resource Sharing

## Project Structure

```
Backend/
├── Attachments/              # Directory for uploaded email attachments
├── authVerify.js             # JWT verification middleware
├── databaseConnection.js      # MongoDB connection initialization
├── encryptPass.js            # Custom password encryption/decryption
├── index.js                  # Express server setup and startup
├── multer.js                 # File upload configuration
├── routerFunction.js         # API endpoint handler functions
├── routes.js                 # Route definitions
├── sendEmails.js             # Email sending logic and SMTP setup
├── user.models.js            # Mongoose user schema and model
├── .env                      # Environment variables (not tracked)
└── README.md                 # This file
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn
- Gmail account (for SMTP configuration)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the Backend directory:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
SECRET=your_jwt_secret_key
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
```

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `MONGODB_URI` | MongoDB connection string | mongodb+srv://user:pass@cluster.mongodb.net/dbname |
| `SECRET` | JWT signing secret | your-secret-key-here |
| `EMAIL_USER` | Gmail account for SMTP | your-email@gmail.com |
| `EMAIL_PASS` | Gmail app password (not regular password) | generated-app-password |

### Running the Server

Start the development server:
```bash
npm start
```

The server will be available at `http://localhost:5000`

## API Endpoints

### Authentication

#### Home Route
- **GET** `/v1/`
- Response: `{ "message": "You are on the Home route" }`

#### Signup
- **PUT** `/v1/signup`
- Request body:
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```
- Response: `{ "message": "Signup successful" }`

#### Login
- **PUT** `/v1/login`
- Request body:
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```
- Response: `{ "token": "jwt_token_here" }`

#### Check Login Status
- **GET** `/v1/auth/status`
- Response: `{ "isAuthenticated": true/false }`

#### Logout
- **POST** `/v1/auth/logout`
- Response: `{ "message": "Logged out successfully" }`

### Password Recovery

#### Request Password Reset
- **POST** `/v1/auth/forgot-password`
- Request body:
  ```json
  {
    "email": "user@example.com"
  }
  ```
- Response: `{ "message": "OTP sent to your email" }`

#### Reset Password with OTP
- **POST** `/v1/auth/reset-password`
- Request body:
  ```json
  {
    "email": "user@example.com",
    "otp": "123456",
    "newPassword": "newpassword",
    "confirmPassword": "newpassword"
  }
  ```
- Response: `{ "message": "Password reset successful" }`

### Email Operations

#### Send Emails
- **POST** `/v1/sendEmails` (Requires Authentication)
- Headers: Cookie with JWT token
- Request body:
  ```json
  {
    "emails": "email1@example.com,email2@example.com",
    "subject": "Email Subject",
    "body": "Email body content"
  }
  ```
- Optional: Upload file as attachment using FormData
- Response: `{ "message": "Emails sent!" }`

## Core Modules

### authVerify.js
Middleware for JWT token verification. Checks for valid tokens in cookies before allowing access to protected routes.

### databaseConnection.js
Establishes MongoDB connection using Mongoose. Handles connection errors and logging.

### encryptPass.js
Custom encryption module using character-level encryption:
- `encrypt()` - Encrypts password with random key
- `decrypt()` - Decrypts password using stored encryption key
- Provides enhanced security over standard hashing

### index.js
Main Express server:
- Sets up middleware (JSON, CORS, cookies, URL encoding)
- Initializes database connection
- Registers routes at `/v1` prefix
- Starts server listening on specified port

### multer.js
Configures file upload handling:
- Saves files to `Attachments/` directory
- Accepts single file upload with field name "attachment"
- Validates file types and sizes

### routerFunction.js
Contains all route handler functions:
- `signup()` - User registration with password encryption
- `login()` - User authentication with JWT token generation
- `sendEmail()` - Email dispatch with attachment support
- `loginStatus()` - Check user authentication status
- `logout()` - Clear authentication cookie
- `requestPasswordReset()` - Generate and send OTP
- `verifyOtpAndResetPassword()` - Reset password with OTP

### routes.js
Defines API routes and associates them with handler functions. Applies authentication middleware where needed.

### sendEmails.js
Handles email sending via SMTP:
- Initializes Nodemailer transporter with Gmail
- Sends emails to multiple recipients
- Supports attachments
- Returns success/failure status

### user.models.js
Mongoose schema and model for user data:
- Fields: email, password (encrypted), encKey (encryption key)
- Indexes on email for quick lookups
- Stores encrypted password and associated encryption key

## Security Considerations

### Password Security
- Passwords are encrypted using custom CharCryptor before database storage
- Encryption keys are stored separately for added security
- Passwords are never transmitted in plain text

### Authentication
- JWT tokens generated with secret key
- Tokens stored in HTTP-only cookies to prevent XSS attacks
- Secure flag enabled for HTTPS environments
- Same-site cookie policy prevents CSRF attacks

### CORS Configuration
- Limited to trusted origins:
  - Production: https://coldmailer-xi.vercel.app
  - Custom domain: https://coldmailer.yp7.xyz
  - Development: http://localhost:5173
- Credentials required for cross-origin requests

### OTP Security
- 6-digit OTP with random generation
- 5-minute expiration time
- Stored temporarily (use Redis in production)
- Single use per reset request

## Error Handling

All endpoints return appropriate HTTP status codes:
- `200` - Success
- `201` - Successfully created
- `400` - Bad request (validation error)
- `404` - Not found
- `500` - Server error

Error responses include descriptive messages for debugging.

## Database Schema

### User Model

```javascript
{
  email: String (unique, required),
  password: String (encrypted),
  encKey: String (encryption key for password),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## Development Commands

- `npm start` - Start the server
- `npm run dev` - Start with nodemon (if configured)

## Deployment

### Vercel Deployment
The backend is deployed on Vercel. Configure environment variables in the Vercel dashboard before deployment.

### Render Deployment
Currently deployed at: https://coldmailer-aw4c.onrender.com

## Email Configuration (Gmail)

To use Gmail as SMTP provider:

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password at https://myaccount.google.com/apppasswords
3. Use the generated password as `EMAIL_PASS` in `.env`
4. Use your Gmail address as `EMAIL_USER`

## Testing the API

### Using cURL

```bash
# Signup
curl -X PUT http://localhost:5000/v1/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Login
curl -X PUT http://localhost:5000/v1/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Check auth status
curl -X GET http://localhost:5000/v1/auth/status
```

### Using Postman

1. Import the API endpoints
2. Set Cookie header with JWT token for protected routes
3. Use FormData for file uploads in sendEmails endpoint

## Contributing

When contributing to the backend:
1. Follow existing code structure
2. Add proper error handling for new endpoints
3. Validate all user inputs
4. Use environment variables for sensitive data
5. Update this README with API changes
6. Test endpoints before submitting changes

## License

This project is part of the ColdMailer application.
