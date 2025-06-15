const express = require('express');
const cors = require('cors');
const app = express();

const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

app.use(cors());
app.use(express.json());
app.use('/', authRoutes);
app.use('/patients', patientRoutes);
app.use('/appointments', appointmentRoutes);

module.exports = app;

