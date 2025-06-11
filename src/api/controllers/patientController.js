const patientService = require('../../api/services/patientService');

async function listPatients(req, res) {
  try {
    const patients = await patientService.listPatients();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function createPatient(req, res) {
  try {
    const newPatient = await patientService.createPatient(req.body);
    res.status(201).json(newPatient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getPatientById(req, res) {
  try {
    const patient = await patientService.getPatientById(req.params.id);
    res.json(patient);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function updatePatient(req, res) {
  try {
    const result = await patientService.updatePatient(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  listPatients,
  createPatient,
  getPatientById,
  updatePatient,
};
