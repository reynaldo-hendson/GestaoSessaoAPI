// tests/services/patientService.test.js
const patientService = require('../../src/api/services/patientService');
const patientRepository = require('../../src/api/repositories/patientRepository');
const db = require('../../src/database/db');

jest.mock('../../src/api/repositories/patientRepository');

describe('Patient Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('listPatients', () => {
    it('deve retornar todos os pacientes', async () => {
      const fakePatients = [{ id: 1, name: 'João' }, { id: 2, name: 'Maria' }];
      patientRepository.getAllPatients.mockResolvedValue(fakePatients);

      const result = await patientService.listPatients();

      expect(result).toEqual(fakePatients);
      expect(patientRepository.getAllPatients).toHaveBeenCalledTimes(1);
    });
  });

  describe('createPatient', () => {
    it('deve criar um paciente com dados válidos', async () => {
      const newPatient = { name: 'Ana', age: 30 };
      const createdPatient = { id: 1, ...newPatient };

      patientRepository.insertPatient.mockResolvedValue(createdPatient);

      const result = await patientService.createPatient(newPatient);

      expect(result).toEqual(createdPatient);
      expect(patientRepository.insertPatient).toHaveBeenCalledWith(newPatient);
    });
  });

  describe('getPatientById', () => {
    it('deve retornar o paciente se ele existir', async () => {
      const patient = { id: 1, name: 'Carlos' };
      patientRepository.findPatientById.mockResolvedValue(patient);

      const result = await patientService.getPatientById(1);

      expect(result).toEqual(patient);
      expect(patientRepository.findPatientById).toHaveBeenCalledWith(1);
    });

    it('deve lançar erro se o paciente não for encontrado', async () => {
      patientRepository.findPatientById.mockResolvedValue(null);

      await expect(patientService.getPatientById(999)).rejects.toThrow('Paciente não encontrado');
    });
  });

  describe('updatePatient', () => {
    it('deve atualizar os dados do paciente', async () => {
      const updatedData = { name: 'Carlos Silva' };
      const id = 1;
      const updatedPatient = { id, ...updatedData };

      patientRepository.updatePatientById.mockResolvedValue(updatedPatient);

      const result = await patientService.updatePatient(id, updatedData);

      expect(result).toEqual(updatedPatient);
      expect(patientRepository.updatePatientById).toHaveBeenCalledWith(id, updatedData);
    });
  });
  
    afterAll(async () => {
    db.close();
    });

});
