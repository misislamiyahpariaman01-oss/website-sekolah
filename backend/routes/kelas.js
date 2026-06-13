import express from 'express';
import { Kelas } from '../models/index.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const kelas = await Kelas.findAll();
  res.json(kelas);
});

router.post('/', async (req, res) => {
  const { kode_kelas, nama_kelas } = req.body;
  const data = await Kelas.create({ kode_kelas, nama_kelas });
  res.status(201).json(data);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { kode_kelas, nama_kelas } = req.body;
  const kelas = await Kelas.findByPk(id);
  if (!kelas) return res.status(404).json({ message: 'Kelas tidak ditemukan' });
  await kelas.update({ kode_kelas, nama_kelas });
  res.json(kelas);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Kelas.destroy({ where: { id } });
  res.json({ message: 'Kelas dihapus' });
});

export default router;
