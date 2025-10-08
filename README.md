# 📘 Learning Management System (LMS)

A **modern, responsive Learning Management System (LMS)** built with React (Vite) + TailwindCSS + Material UI + Framer Motion.
This project was developed as part of a Frontend Internship Assignment.

![lmsl Preview](https://img.shields.io/badge/LMS%20Website-React%20%7C%20Tailwind-blue?style=for-the-badge&logo=react)  
![Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)  
---

## ✨ Features

- ⚡ Fast & Responsive – Powered by Vite + TailwindCSS for high performance
- 🎨 Beautiful UI – Styled with Material UI & Framer Motion animations
- 👨‍🎓 Student Dashboard – View, search, enroll, and track course progress
- 👨‍🏫 Instructor Dashboard – Create and manage courses easily
- 💾 Local Storage Integration – Saves user data, enrollments & progress
- 🌙 Light/Dark Mode – Toggle-friendly modern theme

---

## 🛠️ Tech Stack

- ⚛️ React (Vite) – Frontend framework
- 🎨 TailwindCSS – Utility-first styling
- 🧩 Material UI (MUI) – Component library
- 🌀 Framer Motion – Smooth animations
- 🧠 React Context API – State management (Auth, Data, Theme)
- 💾 LocalStorage – Data persistence

---
## 👥 Default Users

The LMS comes with preconfigured users for testing:

| Name         | Email                 | Password        | Role       |
|--------------|---------------------|----------------|------------|
| Admin User   | admin@lms.com       | admin123       | Admin      |
| John Doe     | instructor@lms.com  | instructor123  | Instructor |
| Jane Smith   | student@lms.com     | student123     | Student    |

---



## 📂 Project Structure
```
Learning Managing System-Web/
│── public/                     # Static assets (icons, images)
│── src/
│   ├── components/             # Reusable UI components
│   │   ├── common/             # TopBar, Navbar, etc.
│   │   └── course/             # CourseCard, CourseDetails
│   ├── contexts/               # AuthContext, DataContext, ThemeContext
│   ├── data/                   # courses.json (initial data)
│   ├── pages/
│   │   ├── auth/               # Login / Register
│   │   ├── student/            # StudentDashboard.jsx
│   │   └── instructor/         # InstructorDashboard.jsx
│   ├── utils/                  # Helper functions (progress calculation)
│   ├── App.jsx                 # App routes and layout
│   ├── main.jsx                # Entry point
│   └── index.css               # Global Tailwind + MUI styles
│── package.json                # Dependencies
│── vite.config.js              # Vite configuration
│── README.md                   # Project documentation

```

---

## 🚀 Getting Started

Follow these steps to run the LMS locally:

### 1️⃣ Clone the repository
```bash
git clone https://github.com/aadhildev2025/Learning-Managing-System---Web.git
cd Learning-Managing-System---Web
```
### 2️⃣ Install dependencies
```bash
npm install
```
### 3️⃣ Run development server
```bash
npm run dev
```
➡ The site will be available at: https://learning-managing-system-web.vercel.app/login
### 4️⃣ Build for production
```bash
npm run build
```

## 💡 Future Improvements

- 🔐 Real authentication system (JWT + Backend)
- ☁️ Cloud database integration (MongoDB / Firebase)
- 📝 File uploads for assignments
- 💬 Discussion forum for courses
- 📊 Instructor analytics dashboard

### 👨‍💻 Author

- A.R. Aadhil
- 📍 Puttalam, Sri Lanka
- 📧 aadhildev2025@gmail.com
