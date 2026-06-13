import { DataTypes } from 'sequelize';
import { sequelize } from './index.js';
import Siswa from './siswa.js';

const Absensi = sequelize.define('Absensi', {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  siswa_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  tanggal: { type: DataTypes.DATEONLY, allowNull: false },
  status: { type: DataTypes.ENUM('Hadir', 'Sakit', 'Izin', 'Alpha'), allowNull: false },
}, { tableName: 'absensi', timestamps: true });

Absensi.belongsTo(Siswa, { foreignKey: 'siswa_id', as: 'siswa' });
Siswa.hasMany(Absensi, { foreignKey: 'siswa_id', as: 'absensi' });

export default Absensi;
