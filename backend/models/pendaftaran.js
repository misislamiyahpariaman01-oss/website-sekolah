import { DataTypes } from 'sequelize';
import { sequelize } from './index.js';
import Siswa from './siswa.js';

const Pendaftaran = sequelize.define('Pendaftaran', {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  no_pendaftaran: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  siswa_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
}, { tableName: 'pendaftaran', timestamps: true });

Pendaftaran.belongsTo(Siswa, { foreignKey: 'siswa_id', as: 'siswa' });
Siswa.hasMany(Pendaftaran, { foreignKey: 'siswa_id', as: 'pendaftaran' });

export default Pendaftaran;
