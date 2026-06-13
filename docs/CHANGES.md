# Catatan Perubahan (CHANGES)

Tanggal: 2026-06-13

Perubahan kecil dan perbaikan yang dibuat selama sesi pengujian interaksi:

- UI & Animasi:
  - Menambahkan kelas animasi `animate-in` dan keyframes di `assets/css/style.css` untuk efek masuk halaman dan transisi pada kartu, tombol, modal, dan sidebar.

- Perbaikan JavaScript (frontend):
  - `assets/js/app.js`
    - Menambahkan `async` pada handler submit form PPDB agar `await` valid.
    - Tambahkan pemeriksaan keberadaan elemen sebelum memasang `addEventListener` untuk menghindari error saat environment tidak memiliki elemen (mis. jsdom).
    - Tambahkan efek animasi pada pergantian halaman (`setActivePage`) dengan menambahkan/menanggalkan kelas `animate-in`.

- Skrip pengujian otomatis:
  - Menambahkan `tools/test-interactions.js` — skrip berbasis `jsdom` untuk menguji interaksi dasar (navigasi, buka modal, tambah siswa).
  - Skrip ini menyuntikkan stub untuk `Chart` dan `jspdf` agar pengujian DOM dapat berjalan tanpa dependensi canvas.

- Catatan tentang backend:
  - Backend ada di folder `backend/`. Untuk menjalankan, jalankan `npm install` lalu `npm start` di folder `backend`.
  - Saat mencoba menjalankan backend ditemukan error inisialisasi Sequelize pada `backend/models` — ini memerlukan pemeriksaan lebih lanjut (inisialisasi `sequelize` harus diekspor sebelum digunakan oleh model).

Instruksi singkat menjalankan dan menguji secara lokal

1. Jalankan server statis untuk frontend (dari root workspace):

```bash
python3 -m http.server 5500
# buka http://localhost:5500 di browser
```

2. Jalankan backend (opsional, jika ingin integrasi API):

```bash
cd backend
npm install
npm start
```

3. Jalankan pengujian otomatis (node harus berada di root workspace):

```bash
npm install jsdom@22
node tools/test-interactions.js
```

Jika mau saya lanjutkan memperbaiki masalah Sequelize di backend dan menghubungkan semua endpoint, beri tahu dan saya akan lanjutkan.
