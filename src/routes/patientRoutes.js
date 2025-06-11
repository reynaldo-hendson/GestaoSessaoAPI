const express = require('express');
const controller = require('../api/controllers/patientController');

const router = express.Router();
router.get('/', controller.listPatients);
router.post('/', controller.createPatient);
router.get('/:id', controller.getPatientById);
router.put('/:id', controller.updatePatient);

module.exports = router;
