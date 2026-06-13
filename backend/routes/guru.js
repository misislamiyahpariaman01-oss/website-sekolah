import express from 'express';
import { Guru } from '../models/index.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const guru = await Guru.findAll();
  res.json(guru);
});

router.post('/', async (req, res) => {
  const { nip, nama } = req.body;
  const data = await Guru.create({ nip, nama });
  res.status(201).json(data);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nip, nama } = req.body;
  const guru = await Guru.findByPk(id);
  if (!guru) return res.status(404).json({ message: 'Guru tidak ditemukan' });
  await guru.update({ nip, nama });
  res.json(guru);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Guru.destroy({ where: { id } });
  res.json({ message: 'Guru dihapus' });
});

export default router;
