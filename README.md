
---

# 📬 ColdMailer

ColdMailer is a lightweight, full-stack mailing automation system built to send personalized cold emails securely and efficiently. This tool provides a simple UI for composing and sending emails, with backend functionality to support authentication, email dispatch, and encryption.

---

## 🔧 Tech Stack

### Frontend

* React + Vite
* Tailwind CSS

### Backend

* Node.js + Express
* MongoDB (via Mongoose)
* Nodemailer
* JWT (Authentication)
* Multer (File Handling)

---

## 📁 Folder Structure

```
ColdMailer/
├── Backend/
│   ├── Attachments/
│   │── authVerify.js
│   ├── databaseConnection.js
│   ├── encryptPass.js
│   ├── index.js
│   ├── multer.js
│   ├── routerFunction.js
│   ├── routes.js
│   ├── sendEmails.js
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
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
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

## 🔐 Features

* User authentication using JWT
* Password encryption before saving to DB
* Email sending via secure SMTP
* File upload handling with Multer
* Fully responsive frontend UI with Tailwind CSS

---

## 📌 To Be Implemented

* CSV import for bulk emails
* Email tracking (opens/clicks)
* Scheduled mail delivery
* Dashboard analytics and delivery logs
* Template-based email composition


---

