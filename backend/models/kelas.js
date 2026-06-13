import { DataTypes } from 'sequelize';
import { sequelize } from './index.js';

const Kelas = sequelize.define('Kelas', {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  kode_kelas: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  nama_kelas: { type: DataTypes.STRING(150), allowNull: false },
}, { tableName: 'kelas', timestamps: true });

export default Kelas;
