import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class Clinic extends Model {
    public id!: number;
    public name!: string;
    public nit!: string;
    public address!: string;
    public managerName!: string;
}

Clinic.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        nit: { type: DataTypes.STRING, allowNull: false, unique: true },
        address: { type: DataTypes.STRING, allowNull: false },
        managerName: { type: DataTypes.STRING, allowNull: false },
    },
    { sequelize, tableName: 'clinics', paranoid: true }
);