import { DataTypes } from 'sequelize';
import { sequelize } from './index.js';
import Kelas from './kelas.js';

const Siswa = sequelize.define('Siswa', {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  nis: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  nisn: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  nama: { type: DataTypes.STRING(200), allowNull: false },
  kelas_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
}, { tableName: 'siswa', timestamps: true });

Siswa.belongsTo(Kelas, { foreignKey: 'kelas_id', as: 'kelas' });
Kelas.hasMany(Siswa, { foreignKey: 'kelas_id', as: 'siswas' });

export default Siswa;
