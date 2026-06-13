import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,
  }
);

export { default as User } from './user.js';
export { default as Siswa } from './siswa.js';
export { default as Guru } from './guru.js';
export { default as Kelas } from './kelas.js';
export { default as MataPelajaran } from './mataPelajaran.js';
export { default as Pendaftaran } from './pendaftaran.js';
export { default as Nilai } from './nilai.js';
export { default as Absensi } from './absensi.js';
export { default as Pembayaran } from './pembayaran.js';
