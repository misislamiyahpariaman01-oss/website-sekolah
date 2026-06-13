import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { sequelize } from './models/index.js';
import { User } from './models/index.js';
import authMiddleware from './middleware/auth.js';
import authRoutes from './routes/auth.js';
import siswaRoutes from './routes/siswa.js';
import guruRoutes from './routes/guru.js';
import kelasRoutes from './routes/kelas.js';
import mapelRoutes from './routes/mapel.js';
import pendaftaranRoutes from './routes/pendaftaran.js';
import nilaiRoutes from './routes/nilai.js';
import absensiRoutes from './routes/absensi.js';
import pembayaranRoutes from './routes/pembayaran.js';
import usersRoutes from './routes/users.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', authMiddleware);
app.use('/api/users', usersRoutes);
app.use('/api/siswa', siswaRoutes);
app.use('/api/guru', guruRoutes);
app.use('/api/kelas', kelasRoutes);
app.use('/api/mapel', mapelRoutes);
app.use('/api/pendaftaran', pendaftaranRoutes);
app.use('/api/nilai', nilaiRoutes);
app.use('/api/absensi', absensiRoutes);
app.use('/api/pembayaran', pembayaranRoutes);

app.get('/', (req, res) => res.json({ message: 'Sekolah API berjalan' }));

const port = process.env.PORT || 4000;

sequelize.authenticate()
  .then(() => {
    console.log('Koneksi database berhasil');
    return sequelize.sync();
  })
  .then(async () => {
    const adminEmail = 'admin@sekolah.test';
    const admin = await User.findOne({ where: { email: adminEmail } });
    if (!admin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await User.create({
        name: 'Administrator',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
      });
      console.log(`Default admin dibuat: ${adminEmail} / admin123`);
    }
    app.listen(port, () => console.log(`Server berjalan di port ${port}`));
  })
  .catch((err) => {
    console.error('Gagal terhubung database:', err);
  });
