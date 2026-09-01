cat << 'EOF' > README.md
# RiwiMediCare Plus - Backend API

RESTful API built for managing the lifecycle of medical supply requests for clinics and healthcare centers.

## Coder Information
* **Name:** Jorel
* **Clan:** Riwi
* **GitHub Repository:** https://github.com/jorel2610/pruebaRutaAvanzada-

---

## Tech Stack
* **Runtime & Language:** Node.js (v18+) & TypeScript
* **Web Framework:** Express.js
* **ORM & Database:** Sequelize ORM & PostgreSQL
* **Authentication & Security:** JSON Web Token (JWT) & Bcrypt
* **File Uploads / Seeders:** Multer (JSON bulk upload)
* **API Documentation:** Swagger UI & OpenAPI 3.0
* **Automated Testing:** Jest & Supertest
* **Containerization & Orchestration:** Docker & Docker Compose

---

## Environment Variables (.env.example)

Create a `.env` file in the root directory based on the following configuration:

```env
PORT=3001
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=riwimedicare_db
JWT_SECRET=riwi_medicare_secret_key_2026