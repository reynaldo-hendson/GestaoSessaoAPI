const patientRepository = require('../../api/repositories/patientRepository');

async function listPatients() {
  return await patientRepository.getAllPatients();
}

async function createPatient(patientData) {
  return await patientRepository.insertPatient(patientData);
}

async function getPatientById(id) {
  const patient = await patientRepository.findPatientById(id);
  if (!patient) throw new Error('Paciente não encontrado');
  return patient;
}

async function updatePatient(id, patientData) {
  return await patientRepository.updatePatientById(id, patientData);
}

module.exports = {
  listPatients,
  createPatient,
  getPatientById,
  updatePatient,
};
