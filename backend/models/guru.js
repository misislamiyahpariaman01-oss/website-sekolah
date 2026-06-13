import { DataTypes } from 'sequelize';
import { sequelize } from './index.js';

const Guru = sequelize.define('Guru', {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  nip: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  nama: { type: DataTypes.STRING(200), allowNull: false },
}, { tableName: 'guru', timestamps: true });

export default Guru;
