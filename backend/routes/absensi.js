import express from 'express';
import { Absensi } from '../models/index.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const data = await Absensi.findAll();
  res.json(data);
});

router.post('/', async (req, res) => {
  const { siswa_id, tanggal, status } = req.body;
  const data = await Absensi.create({ siswa_id, tanggal, status });
  res.status(201).json(data);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { siswa_id, tanggal, status } = req.body;
  const absensi = await Absensi.findByPk(id);
  if (!absensi) return res.status(404).json({ message: 'Absensi tidak ditemukan' });
  await absensi.update({ siswa_id, tanggal, status });
  res.json(absensi);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Absensi.destroy({ where: { id } });
  res.json({ message: 'Absensi dihapus' });
});

export default router;
