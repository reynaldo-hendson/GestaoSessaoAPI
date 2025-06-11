// tests/services/appointmentService.test.js
const appointmentService = require('../../src/api/services/appointmentService');
const appointmentRepository = require('../../src/api/repositories/appointmentRepository');
const db = require('../../src/database/db');

jest.mock('../../src/api/repositories/appointmentRepository');
appointmentRepository.findById = jest.fn();

describe('Appointment Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getByDate', () => {
    it('deve retornar os agendamentos da data fornecida', async () => {
      const fakeAppointments = [{ id: 1, date: '2025-06-10' }];
      appointmentRepository.findByDate.mockResolvedValue(fakeAppointments);

      const result = await appointmentService.getByDate('2025-06-10');

      expect(result).toEqual(fakeAppointments);
      expect(appointmentRepository.findByDate).toHaveBeenCalledWith('2025-06-10');
    });

    it('deve lançar erro se a data não for fornecida', async () => {
      await expect(appointmentService.getByDate()).rejects.toThrow('Data é obrigatória para buscar agendamentos');
    });
  });

  describe('create', () => {
    it('deve criar um agendamento válido', async () => {
      const data = { date: '2025-06-10T10:00:00', patientId: 1 };
      appointmentRepository.findByDate.mockResolvedValue([]);
      appointmentRepository.create.mockResolvedValue({ id: 1, ...data });

      const result = await appointmentService.create(data);

      expect(result).toEqual({ id: 1, ...data });
      expect(appointmentRepository.findByDate).toHaveBeenCalledWith(data.date);
      expect(appointmentRepository.create).toHaveBeenCalledWith(data);
    });

    it('deve lançar erro se dados estiverem incompletos', async () => {
      await expect(appointmentService.create({ date: '2025-06-10' }))
        .rejects.toThrow('Dados do agendamento inválidos');
    });

    it('deve lançar erro se já existir agendamento na mesma data', async () => {
      const data = { date: '2025-06-10T10:00:00', patientId: 1 };
      appointmentRepository.findByDate.mockResolvedValue([{ id: 99 }]);

      await expect(appointmentService.create(data))
        .rejects.toThrow('Já existe agendamento para essa data e horário');
    });
  });

  describe('update', () => {
    it('deve atualizar agendamento com dados válidos', async () => {
      const id = 1;
      const data = { date: '2025-06-11T11:00:00' };
      appointmentRepository.findById.mockResolvedValue({ id });
      appointmentRepository.update.mockResolvedValue({ id, ...data });

      const result = await appointmentService.update(id, data);

      expect(result).toEqual({ id, ...data });
      expect(appointmentRepository.findById).toHaveBeenCalledWith(id);
      expect(appointmentRepository.update).toHaveBeenCalledWith(id, data);
    });

    it('deve lançar erro se ID ou dados forem inválidos', async () => {
      await expect(appointmentService.update(null, {}))
        .rejects.toThrow('ID e dados são obrigatórios para atualizar o agendamento');
    });

    it('deve lançar erro se o agendamento não for encontrado', async () => {
      appointmentRepository.findById.mockResolvedValue(null);
      await expect(appointmentService.update(99, { date: 'x' }))
        .rejects.toThrow('Agendamento não encontrado');
    });
  });

  describe('remove', () => {
    it('deve remover o agendamento se ele existir', async () => {
      const id = 1;
      appointmentRepository.findById.mockResolvedValue({ id });
      appointmentRepository.remove.mockResolvedValue(true);

      const result = await appointmentService.remove(id);

      expect(result).toBe(true);
      expect(appointmentRepository.findById).toHaveBeenCalledWith(id);
      expect(appointmentRepository.remove).toHaveBeenCalledWith(id);
    });

    it('deve lançar erro se ID não for fornecido', async () => {
      await expect(appointmentService.remove()).rejects.toThrow('ID é obrigatório para remover o agendamento');
    });

    it('deve lançar erro se o agendamento não existir', async () => {
      appointmentRepository.findById.mockResolvedValue(null);
      await expect(appointmentService.remove(42)).rejects.toThrow('Agendamento não encontrado');
    });
  });

  describe('getByPatient', () => {
    it('deve retornar agendamentos por paciente', async () => {
      const patientId = 5;
      const mockResult = [{ id: 1, patientId }];
      appointmentRepository.findByPatientId.mockResolvedValue(mockResult);

      const result = await appointmentService.getByPatient(patientId);

      expect(result).toEqual(mockResult);
      expect(appointmentRepository.findByPatientId).toHaveBeenCalledWith(patientId);
    });

    it('deve lançar erro se ID do paciente não for informado', async () => {
      await expect(appointmentService.getByPatient()).rejects.toThrow('ID do paciente é obrigatório');
    });
  });
  
    afterAll(async () => {
    db.close();
    });

});
