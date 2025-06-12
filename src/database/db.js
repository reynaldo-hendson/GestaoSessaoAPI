const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS patients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    cpf TEXT,
    birthdate TEXT,
    email TEXT,
    phone TEXT,
    gender TEXT,    
    address TEXT,    
  )`);
  
  db.run(`CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER,
    date TEXT,
    time TEXT,
    status_appointment TEXT,
    appointment_type TEXT,
    value_appointment TEXT,
    FOREIGN KEY (patient_id) REFERENCES patients(id)
  )`);
});

module.exports = db;

