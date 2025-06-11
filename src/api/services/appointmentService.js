const appointmentRepository = require('../repositories/appointmentRepository');

async function getByDate(date) {
  if (!date) {
    throw new Error('Data é obrigatória para buscar agendamentos');
  }
  return appointmentRepository.findByDate(date);
}

async function create(appointmentData) {
  if (!appointmentData || !appointmentData.date || !appointmentData.patientId) {
    throw new Error('Dados do agendamento inválidos');
  }

  // Exemplo de regra: não permitir criar se já houver agendamento no mesmo horário
  const existing = await appointmentRepository.findByDate(appointmentData.date);
  if (existing && existing.length > 0) {
    throw new Error('Já existe agendamento para essa data e horário');
  }

  return appointmentRepository.create(appointmentData);
}

async function update(id, data) {
  if (!id || !data) {
    throw new Error('ID e dados são obrigatórios para atualizar o agendamento');
  }

  const existing = await appointmentRepository.findById(id);
  if (!existing) {
    throw new Error('Agendamento não encontrado');
  }

  return appointmentRepository.update(id, data);
}

async function remove(id) {
  if (!id) {
    throw new Error('ID é obrigatório para remover o agendamento');
  }

  const existing = await appointmentRepository.findById(id);
  if (!existing) {
    throw new Error('Agendamento não encontrado');
  }

  return appointmentRepository.remove(id);
}

async function getByPatient(patientId) {
  if (!patientId) {
    throw new Error('ID do paciente é obrigatório');
  }

  return appointmentRepository.findByPatientId(patientId);
}

module.exports = {
  getByDate,
  create,
  update,
  remove,
  getByPatient,
};
