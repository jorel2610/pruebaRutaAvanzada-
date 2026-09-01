# RiwiMediCare Plus - Backend API

RESTful API built with Node.js, TypeScript, Express, Sequelize ORM, and PostgreSQL to manage medical supply requests for clinics and healthcare centers.

---

## Submission Details
* **Coder Name:** Jorel
* **Clan:** Centurion
* **GitHub Repository:** [https://github.com/jorel2610/pruebaRutaAvanzada-](https://github.com/jorel2610/pruebaRutaAvanzada-)

---

## Tech Stack
* **Language & Runtime:** Node.js (v18+), TypeScript
* **Framework:** Express.js
* **Database & ORM:** PostgreSQL, Sequelize ORM
* **Authentication:** JSON Web Token (JWT), Bcrypt
* **File Uploads:** Multer (JSON Bulk Seeder)
* **Containerization:** Docker, Docker Compose
* **Documentation:** Swagger UI (OpenAPI 3.0)
* **Testing:** Jest, Supertest

---

## Environment Variables (`.env`)

Create a `.env` file in the root directory:

```env
PORT=3000
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=riwimedicare_db
JWT_SECRET=super_secret_key
```

---

## Installation & Execution

### Option 1: Docker Compose (Recommended)

1. Clone the repository:
```bash
git clone https://github.com/jorel2610/pruebaRutaAvanzada-.git
cd pruebaRutaAvanzada-
```

2. Run containers:
```bash
docker-compose up --build -d
```

### Option 2: Local Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

---

## Seeders Execution

### Method 1: Automated Scripts
```bash
# Create Admin User
docker exec riwimedicare_api npx ts-node src/createAdmin.ts

# Populate Clinics, Warehouses, and Medicines
docker exec riwimedicare_api npx ts-node src/seed.ts
```

### Method 2: Bulk JSON Upload
Upload a JSON file via `POST` request to `/api/seeders/upload` using Swagger UI or Postman.

---

## API Documentation
Swagger UI documentation is available at:
`http://localhost:3000/api-docs`

---

## Automated Testing
Run tests with coverage report:
```bash
npm test -- --coverage
```

---

## atabase Backup
A full PostgreSQL database dump is saved in the root folder as `backup.sql`.

---

## Git Branching Strategy
* **main:** Final production delivery.
* **develop:** Main development branch.