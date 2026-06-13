import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

async function wait(ms) { return new Promise(res => setTimeout(res, ms)); }

async function run() {
  console.log('Memuat index.html lokal dan menyuntikkan stub untuk pengujian...');
  const indexPath = path.resolve(process.cwd(), 'index.html');
  let html = fs.readFileSync(indexPath, 'utf8');
  // Hapus pemanggilan CDN Chart.js dan jspdf dan tambahkan stub sebelum app.js
  html = html.replace(/<script src="https:\/\/cdn.jsdelivr.net\/npm\/chart.js[\s\S]*?<\/script>/, '');
  html = html.replace(/<script src="https:\/\/cdnjs.cloudflare.com\/ajax\/libs\/jspdf[\s\S]*?<\/script>/, '');
  const stub = `<script>window.Chart=function(){return{destroy:function(){}}}; window.jspdf={jsPDF:function(){return{text:function(){},save:function(){}}}};</script>`;
  html = html.replace('</head>', `${stub}</head>`);
  const dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable', url: 'http://localhost:5500/' });
  const { window } = dom;
  await wait(1200);

  const doc = window.document;
  console.log('Document title:', doc.title);

  // Ambil jumlah baris awal di Data Siswa
  const studentTable = doc.getElementById('studentTable');
  const initialRows = studentTable ? studentTable.querySelectorAll('tr').length : 0;
  console.log('Initial student rows:', initialRows);

  // Buka halaman Data Siswa
  const menuDataSiswa = doc.querySelector('.menu-item[data-page="data-siswa"]');
  if (!menuDataSiswa) {
    console.error('Menu Data Siswa tidak ditemukan');
    process.exit(2);
  }
  menuDataSiswa.click();
  await wait(300);
  const dataSiswaSection = doc.getElementById('data-siswa');
  console.log('Data Siswa visible:', !dataSiswaSection.classList.contains('hidden'));

  // Klik tombol tambah siswa
  const addBtn = doc.getElementById('addStudentBtn');
  if (!addBtn) {
    console.error('Tombol tambah siswa tidak ditemukan');
    process.exit(3);
  }
  addBtn.click();
  await wait(300);

  const modal = doc.getElementById('modalForm');
  const modalForm = doc.getElementById('modalEntityForm');
  if (modal.classList.contains('hidden')) {
    console.error('Modal tidak tampil');
    process.exit(4);
  }

  // Isi form modal (field names sesuai kode)
  const setValue = (name, value) => {
    const el = modalForm.querySelector(`[name="${name}"]`);
    if (!el) return console.warn('Field tidak ditemukan', name);
    el.value = value;
    el.dispatchEvent(new window.Event('input', { bubbles: true }));
  };

  setValue('nis', '9999');
  setValue('nisn', '9999000');
  setValue('name', 'Test Siswa JS');
  // pilih kelas jika ada
  const kelasSelect = modalForm.querySelector('[name="kelas"]');
  if (kelasSelect && kelasSelect.options.length > 0) kelasSelect.selectedIndex = 0;
  setValue('jurusan', 'IPA');
  setValue('address', 'Alamat Test');
  setValue('phone', '081200000000');
  // status
  const statusSelect = modalForm.querySelector('[name="status"]');
  if (statusSelect) statusSelect.selectedIndex = 0;

  // submit form
  const submitBtn = modalForm.querySelector('button[type="submit"]');
  if (!submitBtn) {
    console.error('Tombol submit modal tidak ditemukan');
    process.exit(5);
  }
  submitBtn.click();
  await wait(500);

  const finalRows = studentTable.querySelectorAll('tr').length;
  console.log('Final student rows:', finalRows);
  const added = finalRows > initialRows;
  console.log('Student added:', added);

  // Cek nama baru muncul
  const tableHtml = studentTable.innerHTML;
  const found = tableHtml.includes('Test Siswa JS');
  console.log('New student present in table:', found);

  if (added && found) {
    console.log('Pengujian interaksi dasar berhasil.');
    process.exit(0);
  }
  console.error('Pengujian gagal: data tidak bertambah atau tidak ditemukan');
  process.exit(10);
}

run().catch(err => { console.error('Error test:', err); process.exit(1); });
