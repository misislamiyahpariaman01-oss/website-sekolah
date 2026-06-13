import { DataTypes } from 'sequelize';
import { sequelize } from './index.js';
import Siswa from './siswa.js';

const Pembayaran = sequelize.define('Pembayaran', {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  siswa_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  bulan: { type: DataTypes.STRING(50), allowNull: false },
  nominal: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  status: { type: DataTypes.ENUM('Lunas', 'Belum Lunas'), allowNull: false, defaultValue: 'Belum Lunas' },
}, { tableName: 'pembayaran_spp', timestamps: true });

Pembayaran.belongsTo(Siswa, { foreignKey: 'siswa_id', as: 'siswa' });
Siswa.hasMany(Pembayaran, { foreignKey: 'siswa_id', as: 'pembayaran' });

export default Pembayaran;
