const express = require('express');
const controller = require('../api/controllers/appointmentController');

const router = express.Router();

router.get('/', controller.listAppointmentsByDate);
router.post('/', controller.createAppointment);
router.put('/:id', controller.updateAppointment);
router.delete('/:id', controller.deleteAppointment);
router.get('/by-patient/:id', controller.listAppointmentsByPatient);

module.exports = router;
