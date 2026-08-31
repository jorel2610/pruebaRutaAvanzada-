import app from './app';
import { sequelize } from './config/database';

const PORT = process.env.PORT || 3000;

async function main() {
    try {
        await sequelize.sync({ force: false });
        console.log('✔ Conexión exitosa a PostgreSQL mediante Sequelize');
        app.listen(PORT, () => {
            console.log(` Servidor backend activo en http://localhost:${PORT}`);
            console.log(` Documentación Swagger disponible en http://localhost:${PORT}/api-docs`);
        });
    } catch (error) {
        console.error(' Error al conectar a la base de datos:', error);
    }
}

main();