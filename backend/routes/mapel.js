import express from 'express';
import { MataPelajaran } from '../models/index.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const mapel = await MataPelajaran.findAll();
  res.json(mapel);
});

router.post('/', async (req, res) => {
  const { kode_mapel, nama_mapel } = req.body;
  const data = await MataPelajaran.create({ kode_mapel, nama_mapel });
  res.status(201).json(data);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { kode_mapel, nama_mapel } = req.body;
  const mapel = await MataPelajaran.findByPk(id);
  if (!mapel) return res.status(404).json({ message: 'Mata pelajaran tidak ditemukan' });
  await mapel.update({ kode_mapel, nama_mapel });
  res.json(mapel);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await MataPelajaran.destroy({ where: { id } });
  res.json({ message: 'Mata pelajaran dihapus' });
});

export default router;
