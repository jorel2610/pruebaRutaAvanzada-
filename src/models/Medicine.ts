import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class Medicine extends Model {
    public id!: number;
    public name!: string;
    public description!: string;
    public stock!: number;
}

Medicine.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING },
        stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    },
    { sequelize, tableName: 'medicines', paranoid: true }
);