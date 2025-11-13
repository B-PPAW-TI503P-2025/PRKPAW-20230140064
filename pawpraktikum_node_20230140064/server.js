// ===== Import Module =====
const express = require('express');
const cors = require('cors');
const morgan = require("morgan");
const app = express();
const PORT = 3001;

// ===== Middleware global =====
app.use(cors()); // izinkan akses dari React (frontend)
app.use(express.json()); // parsing body JSON
app.use(express.urlencoded({ extended: true })); // parsing form data
app.use(morgan("dev"));

// Middleware custom untuk logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// ===== Impor router =====
const presensiRoutes = require("./routes/presensi");
const reportRoutes = require("./routes/reports");
const bookRoutes = require('./routes/books');
const authRoutes = require('./routes/auth');

// ===== Gunakan router =====
app.use("/api/presensi", presensiRoutes);
app.use("/api/reports", reportRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/auth', authRoutes);

// ===== Routing dasar =====
app.get('/', (req, res) => {
  res.send('Home Page for API');
});

// ===== Middleware Error Handling =====
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

// ===== Jalankan Server =====
app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});
