import express from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/index.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const users = await User.findAll({ attributes: ['id', 'name', 'email', 'role', 'createdAt'] });
  res.json(users);
});

router.post('/', async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed, role });
  res.status(201).json({ id: user.id, name: user.name, email: user.email, role: user.role });
});

export default router;
