# FE-Social-Media

## Overview

FE-Social-Media is a social media application with real-time chat, chat groups, post auto-censorship using a bot, user groups, and chatbot integration for university students. The chatbot assists students with viewing their calendar, exam schedules, and more.

## Features

- **Real-time Chat**: One-on-one and group chat functionality.
- **Chat Groups**: Users can create and join chat groups.
- **Post Auto-Censorship**: A bot automatically censors inappropriate content in posts.
- **User Groups**: Users can join and manage groups related to their interests.
- **Chatbot Integration**: A chatbot helps students check their academic schedule, exams, and events.
- **Profile Management**: Users can update their profiles with personal information and preferences.

## Tech Stack

- **Frontend**: React, React Router, React Hook Form, Framer Motion
- **Styling**: Tailwind CSS, Flowbite React, ShadCN/UI
- **State Management & Animations**: Framer Motion, Popmotion
- **Real-time Database**: Firebase
- **Form Handling**: React Hook Form
- **Emoji & GIF Support**: Emoji Mart, GIF Picker React
- **Notifications**: React Toastify

## Installation

### Prerequisites

Make sure you have Node.js and npm installed.

### Clone the Repository

```bash
git clone https://github.com/nguyenhoanganh1808/fe-social-media.git
cd fe-social-media
```

### Install Dependencies

```bash
npm install
```

### Environment Setup

Create a `.env` file in the root directory and configure the necessary environment variables.

#### Example `.env` file:

```env
VITE_TENSOR_API_KEY=your_tensor_api_key
VITE_API_ENDPOINT=https://your-api-endpoint.com/api
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

### Run the Application

```bash
npm run dev
```

## Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production-ready project
- `npm run lint` - Run ESLint for code quality checks
- `npm run preview` - Preview the built project

## Folder Structure

```
fe-social-media/
├── public/          # Static assets
├── src/             # Source code
│   ├── assets/      # Assets file
│   ├── components/  # Reusable components
│   ├── config/      # Config file (Firebase)
│   ├── context/     # Context API for global state management
│   ├── hooks/       # Custom hooks
│   ├── lib/         # Utility functions
│   ├── pages/       # Application pages
│   ├── assets/      # Images and icons
│   ├── services/    # API calls and Firebase integration
│   └── styles/      # Global styles
├── .env             # Environment variables
├── package.json     # Dependencies and scripts
└── README.md        # Project documentation
```

## 🔗 Related Projects

- **Social Media API Backend**: [GitHub Repository](https://github.com/nguyenbinh09/UIT-Social-Media-BE/tree/master)
- **Social Media Admin Panel**: [GitHub Repository](https://github.com/nguyenhoanganh1808/admin-dashboard-uit)

## Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.

## Contact

For questions or suggestions, please reach out via GitHub Issues.
