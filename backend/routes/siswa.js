import express from 'express';
import { Siswa, Kelas } from '../models/index.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const siswa = await Siswa.findAll({ include: [{ model: Kelas, as: 'kelas', attributes: ['id', 'kode_kelas', 'nama_kelas'] }] });
  res.json(siswa);
});

router.post('/', async (req, res) => {
  const { nis, nisn, nama, kelas_id } = req.body;
  const siswa = await Siswa.create({ nis, nisn, nama, kelas_id });
  res.status(201).json(siswa);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nis, nisn, nama, kelas_id } = req.body;
  const siswa = await Siswa.findByPk(id);
  if (!siswa) return res.status(404).json({ message: 'Siswa tidak ditemukan' });
  await siswa.update({ nis, nisn, nama, kelas_id });
  res.json(siswa);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Siswa.destroy({ where: { id } });
  res.json({ message: 'Siswa dihapus' });
});

export default router;
