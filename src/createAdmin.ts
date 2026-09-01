import { sequelize } from './config/database';
import { User } from './models/User';
import bcrypt from 'bcrypt';

async function run() {
    try {
        await sequelize.authenticate();
        const hashedPassword = await bcrypt.hash('Password123!', 10);

        const [user, created] = await User.findOrCreate({
            where: { email: 'jorel@test.com' },
            defaults: {
                name: 'Jorel Admin',
                email: 'jorel@test.com',
                password: hashedPassword,
                role: 'Administrador'
            }
        });

        if (created) {
            console.log('USUARIO "jorel@test.com" GUARDADO EXITOSAMENTE EN POSTGRESQL.');
        } else {
            console.log('ℹEL USUARIO YA EXISTÍA, ACTUALIZANDO CONTRASEÑA...');
            user.password = hashedPassword;
            await user.save();
            console.log('CONTRASEÑA ACTUALIZADA A "Password123!".');
        }
    } catch (err) {
        console.error('Error al conectar o guardar:', err);
    } finally {
        process.exit();
    }
}

run();