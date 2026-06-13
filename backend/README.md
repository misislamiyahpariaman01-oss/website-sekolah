# Backend API - Aplikasi Sekolah

## Setup

1. Masuk ke folder backend:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy file lingkungan:
   ```bash
   cp .env.example .env
   ```
4. Sesuaikan koneksi MySQL di `.env`.
5. Jalankan server:
   ```bash
   npm run dev
   ```

## Endpoints Utama

- `POST /api/auth/login` - Login multi user
- `GET /api/users` - Daftar user
- `POST /api/users` - Tambah user
- `GET /api/siswa` - Daftar siswa
- `POST /api/siswa` - Tambah siswa
- `PUT /api/siswa/:id` - Update siswa
- `DELETE /api/siswa/:id` - Hapus siswa
- `GET /api/guru` - Daftar guru
- `POST /api/guru` - Tambah guru
- `GET /api/kelas` - Daftar kelas
- `POST /api/kelas` - Tambah kelas
- `GET /api/mapel` - Daftar mata pelajaran
- `POST /api/mapel` - Tambah mata pelajaran
- `GET /api/pendaftaran` - Daftar pendaftaran
- `POST /api/pendaftaran` - Tambah pendaftaran
- `GET /api/nilai` - Daftar nilai
- `POST /api/nilai` - Tambah nilai
- `GET /api/absensi` - Daftar absensi
- `POST /api/absensi` - Tambah absensi
- `GET /api/pembayaran` - Daftar pembayaran
- `POST /api/pembayaran` - Tambah pembayaran

## Database

Rekomendasi untuk membuat database dan jalankan SQL di `backend/migrations/001_create_schema.sql`.

## Catatan

- Semua API menggunakan `express` dan `sequelize`.
- Autentikasi menggunakan JWT pada `POST /api/auth/login`.
- Data CRUD dapat dikembangkan lebih lanjut untuk validasi, role-based access, dan tabel referensi.
