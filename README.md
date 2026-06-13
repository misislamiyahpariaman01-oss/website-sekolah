# Aplikasi Sekolah - Dashboard

Website aplikasi sekolah ini adalah antarmuka admin modern untuk mengelola:

- Dashboard statistik dan grafik
- Modul PPDB (pendaftaran siswa baru)
- Data siswa, guru, kelas, dan mata pelajaran
- Input nilai, rekap nilai, dan rapor
- Absensi harian
- Keuangan SPP
- Laporan PDF/Excel (simulasi)
- Pengaturan profil, logo, user, dan backup data

## Cara Menggunakan

1. Buka file `index.html` di browser.
2. Gunakan sidebar untuk mengakses setiap modul.
3. Pilih hak akses di bagian atas untuk memfilter menu.
4. Data disimpan sementara dalam sesi browser.

## Catatan

- Aplikasi ini dibuat sebagai static web app dengan HTML, CSS, dan JavaScript.
- Grafik menggunakan `Chart.js`.
- Ekspor CSV dan PDF bersifat sederhana dan hanya untuk contoh.

## Perubahan Terbaru

- 2026-06-13: Menambahkan animasi UI, perbaikan event handler untuk stabilitas di lingkungan pengujian, dan skrip pengujian interaksi otomatis (`tools/test-interactions.js`). Lihat `docs/CHANGES.md` untuk detail.

## Menjalankan dan Menguji

- Frontend (statis):

```bash
python3 -m http.server 5500
# buka http://localhost:5500
```

- Backend (opsional):

```bash
cd backend
npm install
npm start
```

- Pengujian interaksi otomatis:

```bash
npm install jsdom@22
node tools/test-interactions.js
```

Catatan: Frontend akan mencoba memanggil API pada `window.location.origin` (atau `http://localhost:4000` jika origin tidak tersedia). Jika server backend tidak tersedia, frontend akan bekerja dalam mode lokal (data disimpan di memori browser/session) sehingga fitur tetap dapat diuji secara UI.
