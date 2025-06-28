# 🦷 ENTNT Dental Center Management Dashboard

A full-featured dental center dashboard built using **ReactJS** — designed for Admins and Patients with role-based access, appointment tracking, and file management.

> ✅ Frontend-only project using `localStorage` — no backend or database required.

---

## 📸 Screenshots

| Login (Admin)              | Dashboard KPIs               |
|----------------------------|------------------------------|
| ![login](screenshots/login.png) | ![dashboard](screenshots/dashboard.png) |

> 💡 You can add your own images to a `/screenshots` folder and reference them here.

---

## 🚀 Live Demo

Deployed at:  
🌐 [https://your-username.github.io/entnt-dental-dashboard](https://your-username.github.io/entnt-dental-dashboard)

---

## 👥 Login Credentials

| Role    | Email               | Password     | Redirect     |
|---------|---------------------|--------------|--------------|
| Admin   | `admin@entnt.in`    | `admin123`   | `/dashboard` |
| Patient | `john@entnt.in`     | `patient123` | `/portal`    |

---

## 🔑 Key Features

### 🛡️ Admin (`/dashboard`)

- 👥 Add/Edit/Delete patients
- 🗓 Schedule appointments linked to patients
- 📂 Upload and view files (x-rays, invoices) — base64 stored
- 📅 Monthly calendar view of appointments
- 📊 Dashboard KPIs:
  - Total appointments
  - Upcoming appointments
  - Revenue
  - Completed vs Pending
- 📦 Backup & Restore all data via JSON (Export/Import)
- 🔐 Role-based route protection

### 👤 Patient (`/portal`)

- View their profile (DOB, contact, health info)
- View appointment history
- Download/view attached files

---

## 🛠️ Tech Stack

| Technology        | Usage                        |
|-------------------|------------------------------|
| ReactJS           | Frontend framework            |
| React Router DOM  | Routing + protected pages     |
| LocalStorage      | Persistent client-side data   |
| FileReader API    | Base64 file uploads           |
| Inline CSS        | Custom styling (easy override)|
| GitHub Pages      | Deployed as static website    |

---

## 📂 Folder Structure

entnt-dental-dashboard/
├── public/
├── src/
│ ├── components/ # PrivateRoute, etc.
│ ├── pages/
│ │ ├── Appointments.js
│ │ ├── Calendar.js
│ │ ├── Dashboard.js
│ │ ├── Login.js
│ │ ├── PatientPortal.js
│ │ └── Patients.js
│ ├── App.js # Route configuration
│ └── index.js # Entry point
├── package.json
└── README.md



---

## 📦 Backup & Restore (Admin Feature)

### 📤 Export
- Click “Export Data” to download all users, patients, and appointments in `.json`.

### 📥 Import
- Click “Import Data” and upload a previously exported `.json` to restore everything.

---

## 🧪 How to Run Locally

1. Clone this repo:
   ```bash
   git clone https://github.com/YOUR_USERNAME/entnt-dental-dashboard.git
   cd entnt-dental-dashboard


