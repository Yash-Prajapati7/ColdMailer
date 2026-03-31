
# ColdMailer

A secure, full-stack cold email automation platform that enables users to send personalized bulk emails with enhanced security features and ease of use.

## Problem Statement

Businesses and professionals often struggle with manual email outreach at scale. Traditional email solutions lack:
- Secure credential management for multiple email accounts
- Simple bulk email sending capabilities
- User-friendly interfaces for composing and scheduling emails
- Password recovery mechanisms
- Encrypted storage of sensitive email credentials

ColdMailer solves these challenges by providing a secure, automated platform for sending cold emails while maintaining user privacy and data security.

## Need for the Project

1. **Business Growth**: Enables efficient customer outreach and lead generation without manual effort
2. **Security**: Encrypts and securely stores user email credentials
3. **Simplicity**: No complex configuration required - just sign up and send
4. **Scalability**: Handle large-scale email campaigns effortlessly
5. **Recovery**: Built-in password reset mechanism with OTP verification

## Implementation Details

### Architecture
<img width="1940" height="694" alt="Coldmailer Architecture" src="https://github.com/user-attachments/assets/d471dfbf-31da-4842-830d-190543993c9a" />
The project is built on a modern, scalable architecture:

- **Frontend**: React with Vite for fast development and optimized builds, styled with Tailwind CSS for responsive design
- **Backend**: Node.js with Express for reliable API endpoints, MongoDB for persistent storage
- **Authentication**: JWT-based secure token authentication with HTTP-only cookies
- **Security**: Password encryption using custom encryption algorithm, SMTP over TLS

### Key Workflows

1. **User Registration**: User signs up with email and password, password is encrypted before storage
2. **Login**: JWT token issued and stored in secure HTTP-only cookie
3. **Email Sending**: Authenticated users can compose and send emails to multiple recipients with optional attachments
4. **Password Recovery**: OTP-based password reset with email verification
5. **Session Management**: Users can check login status and logout

## Unique Features

1. **Custom Password Encryption**: Uses a character-level encryption mechanism (CharCryptor) for enhanced security
2. **OTP-Based Password Reset**: 6-digit OTP sent via email with 5-minute expiration for secure password recovery
3. **Multi-Recipient Support**: Send emails to multiple recipients in a single request
4. **File Attachment Support**: Upload attachments using Multer with secure file handling
5. **Cross-Origin Support**: Fully configured CORS for multiple deployment environments
6. **Responsive UI**: Modern, mobile-friendly interface built with Tailwind CSS
7. **Secure Cookie Management**: HTTP-only, same-site cookies prevent CSRF attacks

## Tech Stack

### Frontend

- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Router** - Client-side routing
- **Lucide React** - Icon library

### Backend

- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Nodemailer** - Email sending
- **JWT** - Token-based authentication
- **Multer** - File upload handling
- **dotenv** - Environment variable management

## Folder Structure

```
ColdMailer/
├── Backend/
│   ├── Attachments/          # Uploaded email attachments
│   ├── authVerify.js         # JWT verification middleware
│   ├── databaseConnection.js # MongoDB connection setup
│   ├── encryptPass.js        # Custom password encryption
│   ├── index.js              # Express server initialization
│   ├── multer.js             # File upload configuration
│   ├── routerFunction.js     # Route handler functions
│   ├── routes.js             # API route definitions
│   ├── sendEmails.js         # Email sending logic
│   ├── user.models.js        # User database schema
│   └── .env                  # Environment variables
│
├── Frontend/
│   ├── src/
│   │   ├── Components/       # React components
│   │   ├── index.css         # Global styles
│   │   ├── Layout.jsx        # App layout wrapper
│   │   └── main.jsx          # App entry point
│   ├── public/               # Static assets
│   ├── package.json          # Dependencies
│   └── vite.config.js        # Vite configuration
│
├── package.json              # Root dependencies
└── README.md                 # Documentation
│   └── user.models.js
│
├── Frontend/
│   └── src/
│       ├── index.html
│       ├── main.jsx
│       └── ... (React components)
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── .gitignore
├── package.json
└── package-lock.json
```

---

## ⚙️ Setup Instructions

### Backend Setup

1. Navigate to the `Backend` directory:

   ```bash
   cd Backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file and add:

   ```
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_secret_key
   ```

4. Start the backend server:

   ```bash
   node index.js
   ```

---

### Frontend Setup

1. Navigate to the `Frontend` directory:

   ```bash
   cd Frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend dev server:

   ```bash
   npm run dev
   ```

---
## 📌 To Be Implemented

* CSV import for bulk emails
* Email tracking (opens/clicks)
* Scheduled mail delivery
* Dashboard analytics and delivery logs
* Template-based email composition


---

