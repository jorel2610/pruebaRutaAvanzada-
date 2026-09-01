import { sequelize } from './config/database';
import { User } from './models/User';
import bcrypt from 'bcrypt';

async function run() {
    try {
        // 1. Conectar a PostgreSQL
        await sequelize.authenticate();
        console.log('Conexión con PostgreSQL establecida.');

        const hashedPassword = await bcrypt.hash('Password123!', 10);

        // 2. Limpiar e Insertar
        await User.destroy({ where: { email: 'jorel@test.com' } });
        await User.create({
            name: 'Jorel Admin',
            email: 'jorel@test.com',
            password: hashedPassword,
            role: 'Administrador'
        });

        console.log('=== USUARIO CREADO CON EXITO ===');
    } catch (error) {
        console.error('ERROR AL CREAR USUARIO:', error);
    } finally {
        process.exit(0);
    }
}

run();