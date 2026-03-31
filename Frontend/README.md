# ColdMailer Frontend

A modern, responsive React-based user interface for the ColdMailer email automation platform. Built with Vite and styled with Tailwind CSS for optimal performance and user experience.

## Overview

The frontend provides a complete user interface for cold email management, including authentication, email composition, password recovery, and educational resources.

## Features

- **User Authentication**: Sign up and login with secure JWT tokens
- **Email Composition**: Intuitive interface for composing and sending bulk emails
- **Recipient Management**: Support for multiple email recipients
- **File Attachments**: Upload and attach files to emails
- **Password Recovery**: OTP-based password reset workflow
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS
- **Real-time Auth Status**: Check login state without page reload
- **Navigation**: Smooth client-side routing with React Router

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for styling
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests
- **Lucide React** - Icon library
- **ESLint** - Code quality and consistency

## Project Structure

```
Frontend/
├── src/
│   ├── Components/
│   │   ├── Header.jsx          # Navigation header with auth status
│   │   ├── Home.jsx            # Landing page
│   │   ├── Login.jsx           # User login form
│   │   ├── GetStarted.jsx      # Email composition interface
│   │   ├── ForgotPassword.jsx  # Password reset workflow
│   │   ├── Guide.jsx           # User guide and documentation
│   │   ├── About.jsx           # About ColdMailer
│   │   ├── Contact.jsx         # Contact information
│   │   ├── Privacy.jsx         # Privacy policy
│   │   ├── Troubles.jsx        # Troubleshooting help
│   │   ├── Index.jsx           # Route definitions
│   │   └── style.css           # Component-specific styles
│   ├── index.css               # Global styles
│   ├── Layout.jsx              # App layout wrapper
│   └── main.jsx                # Application entry point
├── public/                     # Static assets
├── package.json                # Dependencies and scripts
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
├── eslint.config.js            # ESLint rules
└── README.md                   # This file
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file with the API endpoint:
```
VITE_API_URL=https://your-backend-api.com
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

Create an optimized production build:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

## API Integration

The frontend communicates with the backend via RESTful API endpoints. Key API calls include:

- **Authentication**: Login, signup, logout, check auth status
- **Password Reset**: Request OTP, verify OTP and reset password
- **Email Operations**: Send emails with attachments

All API requests include credentials for cookie-based authentication.

## Key Components

### Header
- Displays site logo and navigation
- Shows login/logout buttons based on authentication state
- Responsive hamburger menu for mobile

### Authentication Pages
- **Login**: User login form with email and password
- **GetStarted**: Email composition interface with subject, body, recipients, and attachment upload

### Additional Pages
- **Guide**: How to use ColdMailer
- **About**: Information about the project
- **Contact**: Contact details
- **Privacy**: Privacy policy
- **Troubles**: Troubleshooting and FAQ

## Styling

- Uses Tailwind CSS for responsive design
- Custom CSS for component-specific styling
- Mobile-first responsive approach
- Dark mode ready with proper color schemes

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Deployment

The frontend is configured for deployment on Vercel with the following environments:
- Production: https://coldmailer-xi.vercel.app
- Custom Domain: https://coldmailer.yp7.xyz
- Local Development: http://localhost:5173

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

When contributing to the frontend:
1. Follow the existing code structure
2. Use functional components and hooks
3. Maintain consistent styling with Tailwind CSS
4. Ensure responsive design for all screen sizes
5. Update this README if adding new routes or components

## License

This project is part of the ColdMailer application.
