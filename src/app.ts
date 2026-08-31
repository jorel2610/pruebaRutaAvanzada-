import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import authRoutes from './routes/authRoutes';
import clinicRoutes from './routes/clinicRoutes';
import warehouseRoutes from './routes/warehouseRoutes';
import medicineRoutes from './routes/medicineRoutes';
import supplyRequestRoutes from './routes/supplyRequestRoutes';
import seederRoutes from './routes/seederRoutes';

const app = express();

app.use(cors());
app.use(express.json());

// Interfaz Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Definición de Rutas API
app.use('/api/auth', authRoutes);
app.use('/api/clinics', clinicRoutes);
app.use('/api/warehouses', warehouseRoutes);
app.use('/api/medicines', medicineRoutes);
app.use('/api/requests', supplyRequestRoutes);
app.use('/api/seeders', seederRoutes);

export default app;