const db = require('../../database/db');

module.exports = {
  findByDate: (date) => {
    return new Promise((resolve, reject) => {
      db.all(`
        SELECT a.id, a.date, a.time, p.name as patientName
        FROM appointments a
        JOIN patients p ON p.id = a.patient_id
        WHERE a.date = ?`,
        [date],
        (err, rows) => err ? reject(err) : resolve(rows)
      );
    });
  },  
  findByDateAndTime: (date, time) => {
    return new Promise((resolve, reject) => {
      db.all(
        `
        SELECT a.id, a.date, a.time, p.name as patientName
        FROM appointments a
        JOIN patients p ON p.id = a.patient_id
        WHERE a.date = ? AND a.time = ?
        `,
        [date, time],
        (err, rows) => err ? reject(err) : resolve(rows)
      );
    });
  },
  
  findById: (id) => {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT * FROM appointments WHERE id = ?`,
        [id],
        (err, row) => err ? reject(err) : resolve(row)
      );
    });
  },

  create: ({ patient_id, date, time, status_appointment, appointment_type, value_appointment }) => {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO appointments (patient_id, date, time, status_appointment, appointment_type, value_appointment)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [patient_id, date, time, status_appointment, appointment_type, value_appointment],
        function (err) {
          if (err) return reject(err);
          resolve({ id: this.lastID });
        }
      );
    });
  },

  update: (id, { date, time, status_appointment, appointment_type, value_appointment }) => {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE appointments SET date = ?, time = ?, status_appointment = ?, appointment_type = ?, value_appointment = ? WHERE id = ?`,
        [date, time, status_appointment, appointment_type, value_appointment, id],
        function (err) {
          if (err) return reject(err);
          resolve({ updated: this.changes });
        }
      );
    });
  },

  remove: (id) => {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM appointments WHERE id = ?`, [id], function (err) {
        if (err) return reject(err);
        resolve({ deleted: this.changes });
      });
    });
  },

  findByPatientId: (id) => {
    return new Promise((resolve, reject) => {
      db.all(`
        SELECT a.id, a.date, a.time, a.status_appointment, a.appointment_type, a.value_appointment, p.name as patientName
        FROM appointments a
        JOIN patients p ON p.id = a.patient_id
        WHERE a.patient_id = ?`,
        [id],
        (err, rows) => err ? reject(err) : resolve(rows)
      );
    });
  }
};
