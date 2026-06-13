# ERD Database Aplikasi Sekolah

## Tabel dan Relasi

- `users`
  - id
  - name
  - email
  - password
  - role

- `kelas`
  - id
  - kode_kelas
  - nama_kelas

- `siswa`
  - id
  - nis
  - nisn
  - nama
  - kelas_id

- `guru`
  - id
  - nip
  - nama

- `mata_pelajaran`
  - id
  - kode_mapel
  - nama_mapel

- `pendaftaran`
  - id
  - no_pendaftaran
  - siswa_id

- `nilai`
  - id
  - siswa_id
  - mapel_id
  - tugas
  - uts
  - uas
  - nilai_akhir

- `absensi`
  - id
  - siswa_id
  - tanggal
  - status

- `pembayaran_spp`
  - id
  - siswa_id
  - bulan
  - nominal
  - status

## Relasi

- `siswa.kelas_id` -> `kelas.id`
- `pendaftaran.siswa_id` -> `siswa.id`
- `nilai.siswa_id` -> `siswa.id`
- `nilai.mapel_id` -> `mata_pelajaran.id`
- `absensi.siswa_id` -> `siswa.id`
- `pembayaran_spp.siswa_id` -> `siswa.id`

## Diagram Konseptual

```
users
  |
  +-- role

kelas <--- siswa ---> pendaftaran
              |          
              +--> nilai --> mata_pelajaran
              |
              +--> absensi
              |
              +--> pembayaran_spp
```
