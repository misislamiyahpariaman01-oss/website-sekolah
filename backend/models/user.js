import { DataTypes } from 'sequelize';
import { sequelize } from './index.js';

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(150), allowNull: false },
  email: { type: DataTypes.STRING(150), allowNull: false, unique: true },
  password: { type: DataTypes.STRING(255), allowNull: false },
  role: { type: DataTypes.ENUM('admin', 'operator', 'guru', 'kepala'), allowNull: false, defaultValue: 'operator' },
}, { tableName: 'users', timestamps: true });

export default User;
