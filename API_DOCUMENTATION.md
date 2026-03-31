# ColdMailer API Documentation

Complete API reference for ColdMailer backend. All endpoints are prefixed with `/v1`.

## Base URL

**Production:** https://coldmailer-aw4c.onrender.com/v1  
**Development:** http://localhost:5000/v1

## Authentication

The API uses JWT tokens stored in HTTP-only cookies for authentication. Protected endpoints require a valid token.

### Authentication Headers

```
Cookie: token=<jwt_token>
Content-Type: application/json
```

---

## API Endpoints

### 1. Home Route

#### GET /

Returns a welcome message from the API.

**Request:**
```
GET /v1/
```

**Response (200 OK):**
```json
{
  "message": "You are on the Home route"
}
```

---

### 2. User Registration

#### PUT /signup

Create a new user account with email and password.

**Request:**
```
PUT /v1/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Request Body Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| email | string | Yes | User's email address (must be unique) |
| password | string | Yes | User's password (minimum 1 character recommended) |

**Response (201 Created):**
```json
{
  "message": "Signup successful"
}
```

**Response (200 OK) - User Exists:**
```json
{
  "message": "User already exists"
}
```

**Response (400 Bad Request):**
```json
{
  "message": "All fields are required"
}
```

**Response (500 Server Error):**
```json
{
  "message": "Signup failed",
  "error": "error details"
}
```

---

### 3. User Login

#### PUT /login

Authenticate user and receive JWT token.

**Request:**
```
PUT /v1/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Request Body Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| email | string | Yes | User's registered email |
| password | string | Yes | User's password |

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Sets Cookie:**
```
Set-Cookie: token=<jwt_token>; HttpOnly; Secure; SameSite=None; Max-Age=3600000
```

**Response (400 Bad Request):**
```json
{
  "message": "Enter email and password"
}
```

**Response (404 Not Found):**
```json
{
  "message": "User does not exist"
}
```

**Response (404 Not Found) - Wrong Password:**
```json
{
  "message": "Incorrect password"
}
```

**Response (500 Server Error):**
```json
{
  "message": "error message"
}
```

---

### 4. Check Login Status

#### GET /auth/status

Check if user is currently authenticated.

**Request:**
```
GET /v1/auth/status
```

**Response (200 OK) - Authenticated:**
```json
{
  "isAuthenticated": true
}
```

**Response (200 OK) - Not Authenticated:**
```json
{
  "isAuthenticated": false
}
```

---

### 5. User Logout

#### POST /auth/logout

Clear user authentication token and logout.

**Request:**
```
POST /v1/auth/logout
Cookie: token=<jwt_token>
```

**Response (200 OK):**
```json
{
  "message": "Logged out successfully"
}
```

**Clears Cookie:**
```
Set-Cookie: token=; HttpOnly; Secure; SameSite=None; Max-Age=0
```

---

### 6. Request Password Reset

#### POST /auth/forgot-password

Request an OTP for password reset via email.

**Request:**
```
POST /v1/auth/forgot-password
Content-Type: application/json

{
  "email": "user@example.com"
}
```

**Request Body Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| email | string | Yes | User's registered email address |

**Response (200 OK):**
```json
{
  "message": "OTP sent to your email"
}
```

**OTP Details:**
- 6-digit numeric OTP
- Sent via Gmail SMTP
- Expires in 5 minutes
- One time use only

**Response (400 Bad Request):**
```json
{
  "message": "Email is required"
}
```

**Response (404 Not Found):**
```json
{
  "message": "User not found"
}
```

**Response (500 Server Error):**
```json
{
  "message": "Failed to send OTP",
  "error": "error details"
}
```

---

### 7. Reset Password with OTP

#### POST /auth/reset-password

Verify OTP and reset user password.

**Request:**
```
POST /v1/auth/reset-password
Content-Type: application/json

{
  "email": "user@example.com",
  "otp": "123456",
  "newPassword": "newSecurePassword123",
  "confirmPassword": "newSecurePassword123"
}
```

**Request Body Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| email | string | Yes | User's registered email |
| otp | string | Yes | 6-digit OTP sent via email |
| newPassword | string | Yes | New password for the account |
| confirmPassword | string | Yes | Must match newPassword |

**Response (200 OK):**
```json
{
  "message": "Password reset successful"
}
```

**Response (400 Bad Request) - Missing Fields:**
```json
{
  "message": "All fields are required"
}
```

**Response (400 Bad Request) - Passwords Mismatch:**
```json
{
  "message": "Passwords do not match"
}
```

**Response (400 Bad Request) - Invalid OTP:**
```json
{
  "message": "Invalid OTP"
}
```

**Response (400 Bad Request) - OTP Expired:**
```json
{
  "message": "OTP has expired"
}
```

**Response (404 Not Found):**
```json
{
  "message": "User not found"
}
```

---

### 8. Send Emails

#### POST /sendEmails

Send emails to one or multiple recipients (protected endpoint).

**Authentication Required:** Yes (JWT token in cookie)

**Request:**
```
POST /v1/sendEmails
Cookie: token=<jwt_token>
Content-Type: multipart/form-data

Form Data:
- emails: "recipient1@example.com,recipient2@example.com"
- subject: "Email Subject"
- body: "Email body content"
- attachment: [file object] (optional)
```

**Request Body Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| emails | string | Yes | Comma-separated recipient email addresses |
| subject | string | Yes | Email subject line |
| body | string | Yes | Email body content (HTML supported) |
| attachment | file | No | File attachment (size limit: depends on server config) |

**Request Examples:**

### Single Recipient:
```json
{
  "emails": "customer@example.com",
  "subject": "Hello from ColdMailer",
  "body": "Welcome to ColdMailer!"
}
```

### Multiple Recipients:
```json
{
  "emails": "customer1@example.com,customer2@example.com,customer3@example.com",
  "subject": "Bulk Email Campaign",
  "body": "This is a bulk email sent via ColdMailer"
}
```

**Response (200 OK):**
```json
{
  "message": "Emails sent!"
}
```

**Response (400 Bad Request) - Missing Fields:**
```json
{
  "message": "All required fields (recipients, subject, body, sender's credentials) must be provided."
}
```

**Response (404 Not Found):**
```json
{
  "message": "User not found"
}
```

**Response (500 Server Error):**
```json
{
  "message": "Failed to send emails.",
  "error": "error details"
}
```

**Attachment Details:**
- Uploaded files saved to `Backend/Attachments/` directory
- Supported formats: All file types
- Single file per request
- Accessible via FormData with key "attachment"

---

## HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource successfully created |
| 400 | Bad Request - Invalid request data or validation error |
| 404 | Not Found - User or resource not found |
| 500 | Server Error - Internal server error |

---

## Error Handling

All error responses follow this format:

```json
{
  "message": "Error description",
  "error": "Additional error details (optional)"
}
```

Common error scenarios:
- Missing required fields
- Invalid credentials
- User not found
- OTP expired or invalid
- Database connection issues
- Email sending failures

---

## Request/Response Examples

### Complete Signup & Login Flow

**Step 1: Signup**
```bash
curl -X PUT http://localhost:5000/v1/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "MyPassword123"
  }'
```

Response:
```json
{
  "message": "Signup successful"
}
```

**Step 2: Login**
```bash
curl -X PUT http://localhost:5000/v1/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "MyPassword123"
  }' \
  -c cookies.txt
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Step 3: Check Status**
```bash
curl -X GET http://localhost:5000/v1/auth/status \
  -b cookies.txt
```

Response:
```json
{
  "isAuthenticated": true
}
```

**Step 4: Send Email**
```bash
curl -X POST http://localhost:5000/v1/sendEmails \
  -H "Content-Type: multipart/form-data" \
  -F "emails=recipient@example.com" \
  -F "subject=Test Email" \
  -F "body=Hello from ColdMailer!" \
  -F "attachment=@path/to/file.pdf" \
  -b cookies.txt
```

Response:
```json
{
  "message": "Emails sent!"
}
```

### Complete Password Reset Flow

**Step 1: Request OTP**
```bash
curl -X POST http://localhost:5000/v1/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com"
  }'
```

Response:
```json
{
  "message": "OTP sent to your email"
}
```

**Step 2: Verify OTP & Reset Password**
```bash
curl -X POST http://localhost:5000/v1/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "otp": "123456",
    "newPassword": "NewPassword123",
    "confirmPassword": "NewPassword123"
  }'
```

Response:
```json
{
  "message": "Password reset successful"
}
```

---

## Rate Limiting

Currently, no rate limiting is implemented. It is recommended to add rate limiting in production for security.

---

## CORS Configuration

Allowed origins:
- https://coldmailer-xi.vercel.app (Production)
- https://coldmailer.yp7.xyz (Custom domain)
- http://localhost:5173 (Development)

Requests from other origins will be rejected.

---

## Cookies & Session Management

### JWT Cookie Properties
- **Name:** token
- **HttpOnly:** true (prevents JavaScript access)
- **Secure:** true (only sent over HTTPS)
- **SameSite:** None (allows cross-site requests)
- **Max-Age:** 3600000ms (1 hour)

---

## Security Notes

1. **Password Encryption:** All passwords are encrypted using a custom encryption algorithm before storage
2. **JWT Tokens:** Tokens contain user ID and are signed with a secret key
3. **OTP Security:** 6-digit OTP with 5-minute expiration
4. **HTTPS Only:** API should be accessed over HTTPS in production
5. **CORS Limited:** Only specific origins allowed

---

## Contact & Support

For API issues or questions, refer to the Backend README or contact the development team.
