--
-- Backup de Base de Datos - RiwiMediCare Plus
-- PostgreSQL Database Dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;

-- Enum de Roles de Usuario
CREATE TYPE "enum_users_role" AS ENUM ('Administrador', 'Gestor de Solicitudes');

-- Enum de Estados de Solicitud
CREATE TYPE "enum_supply_requests_status" AS ENUM ('Pendiente', 'Aprobado', 'Rechazado', 'Completado');

-- Tabla de Usuarios
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role "enum_users_role" NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "deletedAt" TIMESTAMP WITH TIME ZONE
);

-- Tabla de Clínicas
CREATE TABLE clinics (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    nit VARCHAR(255) NOT NULL UNIQUE,
    address VARCHAR(255) NOT NULL,
    "managerName" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "deletedAt" TIMESTAMP WITH TIME ZONE
);

-- Tabla de Almacenes
CREATE TABLE warehouses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "deletedAt" TIMESTAMP WITH TIME ZONE
);

-- Tabla de Medicamentos
CREATE TABLE medicines (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    stock INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "deletedAt" TIMESTAMP WITH TIME ZONE
);

-- Tabla de Solicitudes de Abastecimiento
CREATE TABLE supply_requests (
    id SERIAL PRIMARY KEY,
    "clinicId" INTEGER NOT NULL REFERENCES clinics(id) ON DELETE CASCADE ON UPDATE CASCADE,
    "medicineId" INTEGER NOT NULL REFERENCES medicines(id) ON DELETE CASCADE ON UPDATE CASCADE,
    "warehouseId" INTEGER NOT NULL REFERENCES warehouses(id) ON DELETE CASCADE ON UPDATE CASCADE,
    quantity INTEGER NOT NULL,
    status "enum_supply_requests_status" DEFAULT 'Pendiente',
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "deletedAt" TIMESTAMP WITH TIME ZONE
);

-- Inserción de Datos Iniciales (Seeders Base)
INSERT INTO users (name, email, password, role) VALUES
('Admin Principal', 'admin@riwi.com', '$2b$10$e7KqE1/oThwJylQxV.lM2eI2G.e80x6XGg6vB0t/q1P31sQdZ6S9i', 'Administrador'),
('Gestor Solicitudes', 'gestor@riwi.com', '$2b$10$e7KqE1/oThwJylQxV.lM2eI2G.e80x6XGg6vB0t/q1P31sQdZ6S9i', 'Gestor de Solicitudes');

INSERT INTO clinics (name, nit, address, "managerName") VALUES
('Clínica Las Américas', '900123456-1', 'Calle 50 #30-20', 'Dra. María Pérez'),
('Centro Médico del Norte', '900987654-2', 'Carrera 15 #100-05', 'Dr. Carlos Gómez');

INSERT INTO warehouses (name, location) VALUES
('Almacén Central', 'Zona Franca Bodega 4'),
('Almacén Norte', 'Autopista Norte Km 12');

INSERT INTO medicines (name, description, stock) VALUES
('Amoxicilina 500mg', 'Antibiótico de amplio espectro', 500),
('Paracetamol 500mg', 'Analgésico y antipirético', 1000);