# 💡 Prep Buddy - DSA Sheet & Skill Store

Welcome to **Prep Buddy** — your all-in-one platform to organize DSA prep and track progress with modern UI and instant resource access!

---

## 🚀 Live Demo

**Production:**  
[https://prep-buddy-eight.vercel.app](https://prep-buddy-nine.vercel.app/)

---

## 🏷️ Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [Tech Stack](#tech-stack)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Maintainers](#maintainers)
- [Contact](#contact)

---

## ✨ Features

- 📊 **DSA Sheet Progress:** Create steps, substeps, and mark questions as solved
- 👤 **Profile Management:** Edit profile, upload avatar (Cloudinary integration)
- 🔗 **Resource Links:** Attach important resources (LeetCode, YouTube, GFG)
- 🧑‍💻 **Secure Auth:** Signup, login, password reset, OTP email
- 🎨 **Responsive UI:** Mobile friendly, dark mode enabled
- 📈 **Sheet Analytics:** Track solved/unsolved and difficulty stats
- 🛡️ **Persistent Storage:** MongoDB Atlas, backend validation

---

---

## 🛠️ Tech Stack

| Frontend           | Backend               | Cloud Storage    | Hosting              |
|--------------------|-----------------------|------------------|----------------------|
| React, Redux, Tailwind | Node.js, Express, bcrypt | Cloudinary       | Vercel (Frontend), Render (Backend) |
| Axios              | MongoDB Atlas         |                  |                      |

---

## 🏁 Getting Started

### 1. **Clone the repository**

### 2. **Install dependencies**


### 3. **Environment Variables**

**Frontend (`dsa-frontend/.env`):**

**Backend (`dsa-backend/.env`):**


---

## 🔌 API Endpoints

### **Auth**
| Endpoint                    | Method  | Description                      |
|-----------------------------|---------|----------------------------------|
| `/auth/signup`              | POST    | Create new user                  |
| `/auth/login`               | POST    | Login existing user              |
| `/auth/send-otp`            | POST    | Send OTP for password reset      |
| `/auth/reset-password`      | POST    | Reset password with OTP          |

### **User**
| Endpoint                    | Method  | Description              |
|-----------------------------|---------|--------------------------|
| `/profile/update-profile`   | PUT     | Update user profile      |
| `/profile/delete-account`   | DELETE  | Delete user account      |

### **Sheets**
| Endpoint                           | Method             | Description                     |
|-------------------------------------|--------------------|---------------------------------|
| `/sheets`                          | GET, POST          | Get/Create sheets               |
| `/sheets/:id`                      | GET, PUT, DELETE   | Get/Update/Delete sheet by ID   |

---

## 📗 Usage

1. **Sign up and log in**
2. **Create DSA sheets and add steps/questions**
3. **Track your progress and attach resource links**
4. **Update your profile or avatar, or reset password anytime**
5. **Delete your account if needed**

---

## 🤝 Contributing

We welcome enhancements and bug fixes!

- Fork this repo, create a new branch
- Commit your changes and submit a Pull Request
- Open issues/feature requests as needed

---


---

## 🧑‍💻 Maintainers

- Ankush Verma – [GitHub](https://github.com/vermaankush589)

---

## 📬 Contact

Raise issues or reach out by email!

---



