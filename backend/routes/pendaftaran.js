import express from 'express';
import { Pendaftaran, Siswa } from '../models/index.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const pendaftaran = await Pendaftaran.findAll({ include: [{ model: Siswa, as: 'siswa', attributes: ['id', 'nis', 'nisn', 'nama'] }] });
  res.json(pendaftaran);
});

router.post('/', async (req, res) => {
  const { no_pendaftaran, siswa_id } = req.body;
  const data = await Pendaftaran.create({ no_pendaftaran, siswa_id });
  res.status(201).json(data);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Pendaftaran.destroy({ where: { id } });
  res.json({ message: 'Pendaftaran dihapus' });
});

export default router;
