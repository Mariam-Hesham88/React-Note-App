# React Notes App

## Overview

This project is a simple and functional note-taking web application built with **React**.
It allows users to register, log in, and manage their notes (add, edit, delete).
The app provides a responsive interface and interacts with a real backend API.

## Features

* User registration and login authentication
* Display all user notes
* Add new notes
* Edit existing notes
* Delete notes
* Real API integration

## Technologies Used

* **React** (with React Router DOM)
* **Formik** and **Yup** for form handling and validation
* **Axios** for API requests
* **Tailwind CSS** and **Flowbite** for styling
* **SweetAlert2** for alert messages

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/react-notes-app.git
   ```
2. Navigate to the project folder:

   ```bash
   cd react-notes-app
   ```
3. Install dependencies:

   ```bash
   npm install
   ```
4. Start the development server:

   ```bash
   npm run dev
   ```

## Usage

* Users must **register a new account** to start using the app.
* Once logged in, they can add, edit, and delete their personal notes.

## Future Improvements

* Add search and filter functionality
* Implement dark mode

## Project Structure

```
src/
│
├── components/
│   ├── Home/
│   ├── Login/
│   ├── Register/
│   ├── Note/
│   ├── Layout/
│   └── ProtectedRoute/
│
├── Context/
│   └── UserContext.jsx
│
├── App.jsx
└── main.jsx
```

---

“Developed by Mariam Hesham”
