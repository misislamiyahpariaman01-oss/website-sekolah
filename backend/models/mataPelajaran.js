import { DataTypes } from 'sequelize';
import { sequelize } from './index.js';

const MataPelajaran = sequelize.define('MataPelajaran', {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  kode_mapel: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  nama_mapel: { type: DataTypes.STRING(200), allowNull: false },
}, { tableName: 'mata_pelajaran', timestamps: true });

export default MataPelajaran;
