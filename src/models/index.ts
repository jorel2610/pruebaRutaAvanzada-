import { Clinic } from './Clinic';
import { Warehouse } from './Warehouse';
import { Medicine } from './Medicine';
import { SupplyRequest } from './SupplyRequest';
import { User } from './User';

Clinic.hasMany(SupplyRequest, { foreignKey: 'clinicId' });
SupplyRequest.belongsTo(Clinic, { foreignKey: 'clinicId' });

Warehouse.hasMany(SupplyRequest, { foreignKey: 'warehouseId' });
SupplyRequest.belongsTo(Warehouse, { foreignKey: 'warehouseId' });

Medicine.hasMany(SupplyRequest, { foreignKey: 'medicineId' });
SupplyRequest.belongsTo(Medicine, { foreignKey: 'medicineId' });

export { User, Clinic, Warehouse, Medicine, SupplyRequest };