# 🏥 MediFlow – Doctor & Patient Appointment Management System

![React](https://img.shields.io/badge/Frontend-ReactJS-61DAFB?style=flat&logo=react&logoColor=black)
![Tailwind](https://img.shields.io/badge/Styling-TailwindCSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![React Big Calendar](https://img.shields.io/badge/Calendar-React_Big_Calendar-FF6F00?style=flat&logo=google-calendar&logoColor=white)
![React Toastify](https://img.shields.io/badge/Notifications-React_Toastify-FF9800?style=flat&logo=react&logoColor=white)
![Mock API](https://img.shields.io/badge/API-Mock_API-blue?style=flat)
![Render](https://img.shields.io/badge/Backend_Hosting-Render-46E3B7?style=flat&logo=render&logoColor=white)
![Vercel](https://img.shields.io/badge/Frontend_Hosting-Vercel-000000?style=flat&logo=vercel&logoColor=white)

---

MediFlow is a **full-stack web application** designed to streamline doctor-patient interactions.  
It allows **patients** to search, book, and review doctors, and **doctors** to manage their profiles, appointments, prescriptions, and patient history.  
The platform also provides **medical history download**, **prescription access**, and **date range filtering** for better record management.

🌐 **Live Website:** [MediFlow](https://medi-flow-main-page-m57m.vercel.app)  
🖥 **Backend:** Hosted on **Render** using **Mork API** with CORS enabled

---

## 🛠 Tech Stack

**Frontend:**
- React.js
- Tailwind CSS
- React Router
- React Toastify
- Context API
- **React Big Calendar** / **React Calendar** for appointment management UI

**Backend:**
- Mork API (Mock API with CORS)
- Render (Deployment)

**Others:**
- JWT Authentication (if applicable)
- LocalStorage for session management

**Hosting:** Frontend & Admin – Vercel, Backend – Render

---

## ✨ Features

### 🛡️ Admin Panel
- **Dashboard & Analytics** – overview of total users, appointments, revenue stats (if applicable)
- **User Management** – view/manage doctors & patients
- **Doctor Approvals** – approve/reject new doctor profiles
- **Reviews Moderation** – monitor and remove inappropriate reviews
- **System Controls** – set global booking rules (slot duration, limits)

### 👨‍⚕️ For Doctors
- Profile management (edit personal info, specialization, fees, availability, etc.)
- Upload and update profile picture
- Manage appointment slots and patient bookings
- Calendar (Month/Week/Day) with tooltips
- View appointment history
- View patient reviews & ratings
- View complete medical history with date range filter and download option
- Upload and manage prescriptions for patients

### 🧑‍💻 For Patients
- Browse and select doctors by specialization, name, or details
- View doctor profiles with details and availability
- Book appointments for available slots
- Booking confirmation & details
- Receive booking confirmation/rescheduled and details
- Leave reviews and ratings for doctors after appointments
- View and download prescriptions provided by doctors

### 📅 Calendar View
- Monthly, Weekly, and Daily view for appointments
- Tooltips for quick patient details
- Agenda view for detailed appointment info and cancel feature

### 🔒 Security & Backend
- REST API with **CORS** enabled
- Integrated with **Mork API** for backend mock data
- Backend deployed on **Render**
- Role-based access (Admin / Doctor / Patient)
- JWT-based authentication

### 📱 Fully responsive for **small**, **medium**, and **large** screens

---

## 📂 Folder Structure
medi-flow/
│
├── frontend/ # React frontend

   ├── src/
   
      ├── components/
   
      ├── pages/
   
      ├── context/
      
      └── App.js
      
   └── package.json

│

├── admin/

   ├── src/
   
      ├── components/
   
      ├── pages/
   
      ├── context/
      
      └── App.js
      
   └── package.json


├── backend/ 

  └── server.js

└── README.md


---
## 📡 API Endpoints (Backend)

| Method | Endpoint              | Description                                 |
| ------ | --------------------- | ------------------------------------------- |
| GET    | `/doctors`            | Get all doctors                             |
| GET    | `/doctors/:id`        | Get doctor by ID                            |
| POST   | `/doctors`            | Add new doctor                              |
| PUT    | `/doctors/:id`        | Update doctor profile                       |
| DELETE | `/doctors/:id`        | Delete a doctor                             |
| GET    | `/patients`           | Get all patients                            |
| GET    | `/patients/:id`       | Get patient by ID                           |
| POST   | `/patients`           | Add new patient                             |
| PUT    | `/patients/:id`       | Update patient profile                      |
| GET    | `/appointments`       | Get all appointments                        |
| GET    | `/appointments/:id`   | Get appointment by ID                       |
| POST   | `/appointments`       | Create new appointment                      |
| PUT    | `/appointments/:id`   | Update appointment details                  |
| DELETE | `/appointments/:id`   | Cancel appointment                          |
| GET    | `/prescriptions`      | Get all prescriptions                       |
| GET    | `/prescriptions/:id`  | Get prescription by ID                      |
| POST   | `/prescriptions`      | Create prescription                         |
| GET    | `/reviews`            | Get all reviews                             |
| GET    | `/reviews/:id`        | Get review by ID                            |
| POST   | `/reviews`            | Add a new review                            |


---

💌 Author

A.Sathya

GitHub: https://github.com/kuttysathya

Portfolio: https://sathy-portfolio7.netlify.app

---

Built with ❤️ for better healthcare workflows.

