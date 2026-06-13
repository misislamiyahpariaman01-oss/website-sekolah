import express from 'express';
import { Pembayaran } from '../models/index.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const data = await Pembayaran.findAll();
  res.json(data);
});

router.post('/', async (req, res) => {
  const { siswa_id, bulan, nominal, status } = req.body;
  const data = await Pembayaran.create({ siswa_id, bulan, nominal, status });
  res.status(201).json(data);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { siswa_id, bulan, nominal, status } = req.body;
  const pembayaran = await Pembayaran.findByPk(id);
  if (!pembayaran) return res.status(404).json({ message: 'Pembayaran tidak ditemukan' });
  await pembayaran.update({ siswa_id, bulan, nominal, status });
  res.json(pembayaran);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Pembayaran.destroy({ where: { id } });
  res.json({ message: 'Pembayaran dihapus' });
});

export default router;
