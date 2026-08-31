import { describe, it, expect } from '@jest/globals';
import { User } from '../models/User';
import { Clinic } from '../models/Clinic';
import { Warehouse } from '../models/Warehouse';
import { Medicine } from '../models/Medicine';
import { SupplyRequest } from '../models/SupplyRequest';
import '../models'; // Importa el index.ts de los modelos

describe('Carga y definición de Modelos', () => {
    it('Debe importar e inicializar los modelos correctamente', () => {
        expect(User).toBeDefined();
        expect(Clinic).toBeDefined();
        expect(Warehouse).toBeDefined();
        expect(Medicine).toBeDefined();
        expect(SupplyRequest).toBeDefined();
    });
});