import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export enum RequestStatus {
    PENDING = 'Pendiente',
    APPROVED = 'Aprobado',
    REJECTED = 'Rechazado',
    COMPLETED = 'Completado',
}

export class SupplyRequest extends Model {
    public id!: number;
    public clinicId!: number;
    public medicineId!: number;
    public warehouseId!: number;
    public quantity!: number;
    public status!: RequestStatus;
}

SupplyRequest.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        clinicId: { type: DataTypes.INTEGER, allowNull: false },
        medicineId: { type: DataTypes.INTEGER, allowNull: false },
        warehouseId: { type: DataTypes.INTEGER, allowNull: false },
        quantity: { type: DataTypes.INTEGER, allowNull: false },
        status: {
            type: DataTypes.ENUM(...Object.values(RequestStatus)),
            defaultValue: RequestStatus.PENDING,
        },
    },
    { sequelize, tableName: 'supply_requests', paranoid: true }
);