import { DataTypes } from 'sequelize';
import { sequelize } from './index.js';
import Siswa from './siswa.js';
import MataPelajaran from './mataPelajaran.js';

const Nilai = sequelize.define('Nilai', {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  siswa_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  mapel_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  tugas: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  uts: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  uas: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  nilai_akhir: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
}, { tableName: 'nilai', timestamps: true });

Nilai.belongsTo(Siswa, { foreignKey: 'siswa_id', as: 'siswa' });
Nilai.belongsTo(MataPelajaran, { foreignKey: 'mapel_id', as: 'mapel' });
Siswa.hasMany(Nilai, { foreignKey: 'siswa_id', as: 'nilai' });
MataPelajaran.hasMany(Nilai, { foreignKey: 'mapel_id', as: 'nilai' });

export default Nilai;
