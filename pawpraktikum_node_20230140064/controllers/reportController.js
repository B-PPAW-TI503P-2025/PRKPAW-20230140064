const { Presensi } = require("../models");

exports.getDailyReport = async (req, res) => {
  try {
    console.log("Controller: Mengambil data laporan harian dari database...");

    // Ambil semua data presensi dari database
    const presensiRecords = await Presensi.findAll();

    // Ubah ke format JSON agar bisa dikirim ke client
    const plainRecords = presensiRecords.map((r) => r.toJSON());

    res.json({
      reportDate: new Date().toLocaleDateString(),
      data: plainRecords,
    });
  } catch (error) {
    console.error("Error mengambil data laporan harian:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};
