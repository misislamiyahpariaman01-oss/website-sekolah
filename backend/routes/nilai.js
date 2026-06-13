import express from 'express';
import { Nilai, Siswa, MataPelajaran } from '../models/index.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const nilai = await Nilai.findAll({ include: [
    { model: Siswa, as: 'siswa', attributes: ['id', 'nama'] },
    { model: MataPelajaran, as: 'mapel', attributes: ['id', 'nama_mapel'] },
  ] });
  res.json(nilai);
});

router.post('/', async (req, res) => {
  const { siswa_id, mapel_id, tugas, uts, uas } = req.body;
  const nilai_akhir = Math.round((tugas * 0.3) + (uts * 0.3) + (uas * 0.4));
  const data = await Nilai.create({ siswa_id, mapel_id, tugas, uts, uas, nilai_akhir });
  res.status(201).json(data);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { siswa_id, mapel_id, tugas, uts, uas } = req.body;
  const nilai = await Nilai.findByPk(id);
  if (!nilai) return res.status(404).json({ message: 'Nilai tidak ditemukan' });
  const nilai_akhir = Math.round((tugas * 0.3) + (uts * 0.3) + (uas * 0.4));
  await nilai.update({ siswa_id, mapel_id, tugas, uts, uas, nilai_akhir });
  res.json(nilai);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Nilai.destroy({ where: { id } });
  res.json({ message: 'Nilai dihapus' });
});

export default router;
