const db = require('../../database/db');

function getAllPatients() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM patients', [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function insertPatient(patient) {
  const { name, cpf, birthdate, email, phone, gender, address } = patient;
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO patients (name, cpf, birthdate, email, phone, gender, address) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, cpf, birthdate, email, phone, gender, address],
      function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID });
      }
    );
  });
}

function findPatientById(id) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM patients WHERE id = ?', [id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

function updatePatientById(id, patient) {
  const { name, cpf, birthdate, email, phone, gender, address } = patient;
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE patients SET name = ?, cpf = ?, birthdate = ?, email = ?, phone = ?, gender = ?, address = ? WHERE id = ?`,
      [name, cpf, birthdate, email, phone, gender, address, id],
      function (err) {
        if (err) reject(err);
        else resolve({ updated: this.changes });
      }
    );
  });
}

module.exports = {
  getAllPatients,
  insertPatient,
  findPatientById,
  updatePatientById,
};
