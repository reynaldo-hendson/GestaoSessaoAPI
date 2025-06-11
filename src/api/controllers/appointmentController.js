const appointmentService = require('../services/appointmentService');

module.exports = {
  listAppointmentsByDate: async (req, res) => {
    try {
      const { date } = req.query;
      const data = await appointmentService.getByDate(date);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  createAppointment: async (req, res) => {
    try {
      const result = await appointmentService.create(req.body);
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updateAppointment: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await appointmentService.update(id, req.body);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  deleteAppointment: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await appointmentService.remove(id);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  listAppointmentsByPatient: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await appointmentService.getByPatient(id);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
