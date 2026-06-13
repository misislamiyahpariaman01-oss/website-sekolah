const state = {
  role: 'admin',
  applicants: [],
  students: [],
  teachers: [],
  classes: [],
  subjects: [],
  scores: [],
  attendance: [],
  payments: [],
};

const helpers = {
  formatCurrency(value) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
  },
  category(score) {
    if (score < 60) return 'Kurang';
    if (score < 75) return 'Cukup';
    if (score < 85) return 'Baik';
    return 'Sangat Baik';
  },
  randomId(prefix) {
    return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
  },
};

const API_BASE = window.location.origin === 'null' ? 'http://localhost:4000' : window.location.origin;

const pageMap = {
  dashboard: 'Dashboard',
  penerimaan: 'Pendaftaran Siswa',
  'data-siswa': 'Data Siswa',
  'data-guru': 'Data Guru',
  'data-kelas': 'Data Kelas',
  'data-mapel': 'Data Mata Pelajaran',
  'input-nilai': 'Input Nilai',
  'data-nilai': 'Data Nilai',
  rapor: 'Cetak Rapor',
  absensi: 'Absensi',
  keuangan: 'Keuangan Sekolah',
  'laporan-penerimaan': 'Laporan Penerimaan',
  'laporan-nilai': 'Laporan Nilai',
  'laporan-siswa': 'Laporan Siswa',
  'laporan-guru': 'Laporan Guru',
  profil: 'Profil Sekolah',
  logo: 'Logo Sekolah',
  'user-management': 'User Management',
  backup: 'Backup Database',
  pendaftar: 'Data Pendaftar',
  verifikasi: 'Verifikasi Berkas',
  'status-penerimaan': 'Status Penerimaan',
  'rekap-nilai': 'Rekap Nilai',
};

const elements = {
  sidebar: document.getElementById('sidebar'),
  menuItems: document.querySelectorAll('.menu-item'),
  pageTitle: document.getElementById('pageTitle'),
  pages: document.querySelectorAll('.page'),
  userRole: document.getElementById('userRole'),
  menuToggle: document.getElementById('menuToggle'),
  refreshDashboard: document.getElementById('refreshDashboard'),
  actionCards: document.querySelectorAll('.action-card'),
  ppdbForm: document.getElementById('ppdbForm'),
  ppdbNo: document.getElementById('ppdbNo'),
  searchApplicant: document.getElementById('searchApplicant'),
  applicantTable: document.getElementById('applicantTable'),
  studentTable: document.getElementById('studentTable'),
  searchStudent: document.getElementById('searchStudent'),
  addStudentBtn: document.getElementById('addStudentBtn'),
  teacherTable: document.getElementById('teacherTable'),
  searchTeacher: document.getElementById('searchTeacher'),
  addTeacherBtn: document.getElementById('addTeacherBtn'),
  classTable: document.getElementById('classTable'),
  searchClass: document.getElementById('searchClass'),
  addClassBtn: document.getElementById('addClassBtn'),
  subjectTable: document.getElementById('subjectTable'),
  searchSubject: document.getElementById('searchSubject'),
  addSubjectBtn: document.getElementById('addSubjectBtn'),
  scoreForm: document.getElementById('scoreForm'),
  scoreStudent: document.getElementById('scoreStudent'),
  scoreSubject: document.getElementById('scoreSubject'),
  scoreClass: document.getElementById('scoreClass'),
  scoreTask: document.getElementById('scoreTask'),
  scoreUts: document.getElementById('scoreUts'),
  scoreUas: document.getElementById('scoreUas'),
  finalScore: document.getElementById('finalScore'),
  scoreCategory: document.getElementById('scoreCategory'),
  scoresTable: document.getElementById('scoresTable'),
  reportScores: document.getElementById('reportScores'),
  reportAverage: document.getElementById('reportAverage'),
  reportRank: document.getElementById('reportRank'),
  printReport: document.getElementById('printReport'),
  attendanceDate: document.getElementById('attendanceDate'),
  attendanceTable: document.getElementById('attendanceTable'),
  addPaymentBtn: document.getElementById('addPaymentBtn'),
  paymentTable: document.getElementById('paymentTable'),
  searchPayment: document.getElementById('searchPayment'),
  exportStudentCsv: document.getElementById('exportStudentCsv'),
  exportStudentPdf: document.getElementById('exportStudentPdf'),
  backupData: document.getElementById('backupData'),
  loginOverlay: document.getElementById('loginOverlay'),
  loginForm: document.getElementById('loginForm'),
  loginEmail: document.getElementById('loginEmail'),
  loginPassword: document.getElementById('loginPassword'),
  darkModeToggle: document.getElementById('darkModeToggle'),
  logoutButton: document.getElementById('logoutButton'),
};

const stats = {
  students: document.getElementById('statStudents'),
  teachers: document.getElementById('statTeachers'),
  classes: document.getElementById('statClasses'),
  subjects: document.getElementById('statSubjects'),
  applicants: document.getElementById('statApplicants'),
  average: document.getElementById('statAverage'),
  graduate: document.getElementById('statGraduate'),
  active: document.getElementById('statActive'),
};

const charts = {};

function initializeData() {
  state.students = [
    { id: 's1', nis: '1001', nisn: '9001001', name: 'Siti Nur A', kelas: 'X IPA', jurusan: 'IPA', address: 'Bekasi', phone: '081234567890', status: 'Aktif' },
    { id: 's2', nis: '1002', nisn: '9001002', name: 'Ahmad Ridho', kelas: 'XI IPS', jurusan: 'IPS', address: 'Depok', phone: '081298765432', status: 'Aktif' },
    { id: 's3', nis: '1003', nisn: '9001003', name: 'Rina Putri', kelas: 'XII Bahasa', jurusan: 'Bahasa', address: 'Jakarta', phone: '081377788899', status: 'Lulus' },
  ];
  state.teachers = [
    { id: 't1', nip: '1987654321', name: 'Bapak Joko', subject: 'Matematika', email: 'joko@sekolah.sch.id', phone: '081234500001', status: 'Aktif' },
    { id: 't2', nip: '1987654322', name: 'Ibu Maya', subject: 'Bahasa Indonesia', email: 'maya@sekolah.sch.id', phone: '081234500002', status: 'Aktif' },
  ];
  state.classes = [
    { id: 'c1', code: 'XIPA', name: 'X IPA', wali: 'Bapak Joko', capacity: 32 },
    { id: 'c2', code: 'XIIIPS', name: 'XII IPS', wali: 'Ibu Maya', capacity: 28 },
  ];
  state.subjects = [
    { id: 'm1', code: 'MAT', name: 'Matematika', kkm: 75 },
    { id: 'm2', code: 'BIND', name: 'Bahasa Indonesia', kkm: 70 },
    { id: 'm3', code: 'IPA', name: 'Ilmu Pengetahuan Alam', kkm: 72 },
  ];
  state.applicants = [
    { id: 'a1', regNo: 'PPDB-2026-001', name: 'Siti Nur A', targetClass: 'X IPA', status: 'Terdaftar' },
    { id: 'a2', regNo: 'PPDB-2026-002', name: 'Ahmad Ridho', targetClass: 'XI IPS', status: 'Verifikasi' },
  ];
  state.scores = [
    { id: 'score1', studentId: 's1', subjectId: 'm1', kelas: 'X IPA', semester: '1', year: '2026/2027', task: 80, uts: 75, uas: 82, final: 79, category: 'Baik' },
    { id: 'score2', studentId: 's2', subjectId: 'm2', kelas: 'XI IPS', semester: '1', year: '2026/2027', task: 68, uts: 70, uas: 73, final: 70, category: 'Cukup' },
  ];
  state.attendance = state.students.map((student) => ({ date: new Date().toISOString().slice(0, 10), studentId: student.id, status: 'Hadir' }));
  state.payments = [
    { id: 'p1', number: 'PAY-001', studentName: 'Siti Nur A', month: 'Januari', amount: 250000, status: 'Lunas' },
    { id: 'p2', number: 'PAY-002', studentName: 'Ahmad Ridho', month: 'Februari', amount: 250000, status: 'Belum Lunas' },
  ];
}


async function apiRequest(path, method = 'GET', body) {
  const token = sessionStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(`${API_BASE}/api${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Gagal koneksi' }));
    if (response.status === 401 || response.status === 403) {
      clearAuth();
      requireLogin();
    }
    throw new Error(error.message || 'Request gagal');
  }
  return response.json();
}

function setLoggedInUser(user) {
  document.querySelector('.profile').textContent = user.name;
  elements.userRole.textContent = user.role;
}

function clearAuth() {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
  document.querySelector('.profile').textContent = 'Guest';
  elements.userRole.textContent = 'Pengunjung';
  state.role = 'operator';
  applyRole();
}

function getSavedUser() {
  return JSON.parse(sessionStorage.getItem('user') || 'null');
}

function initializeAuth() {
  const token = sessionStorage.getItem('token');
  const user = getSavedUser();
  if (token && user) {
    setLoggedInUser(user);
    state.role = user.role;
    applyRole();
    return true;
  }
  clearAuth();
  requireLogin();
  return false;
}

function requireLogin() {
  elements.loginOverlay.classList.remove('hidden');
}

function hideLogin() {
  elements.loginOverlay.classList.add('hidden');
}

function applyDarkMode(enabled) {
  if (enabled) document.documentElement.classList.add('dark-mode');
  else document.documentElement.classList.remove('dark-mode');
  localStorage.setItem('darkModeEnabled', enabled ? '1' : '0');
  elements.darkModeToggle.textContent = enabled ? 'Light Mode' : 'Dark Mode';
}

function initializeTheme() {
  const enabled = localStorage.getItem('darkModeEnabled') === '1';
  applyDarkMode(enabled);
}

async function reloadDataFromApi() {
  try {
    const [students, teachers, classes, subjects, applicants, scores, attendances, payments] = await Promise.all([
      apiRequest('/siswa'),
      apiRequest('/guru'),
      apiRequest('/kelas'),
      apiRequest('/mapel'),
      apiRequest('/pendaftaran'),
      apiRequest('/nilai'),
      apiRequest('/absensi'),
      apiRequest('/pembayaran'),
    ]);
    state.students = students.map((item) => ({ id: item.id, nis: item.nis, nisn: item.nisn, name: item.nama, kelas: item.kelas?.nama_kelas || 'N/A', jurusan: item.jurusan || '-', address: item.alamat || '-', phone: item.nomor_hp || '-', status: item.status || 'Aktif' }));
    state.teachers = teachers.map((item) => ({ id: item.id, nip: item.nip, name: item.nama, subject: item.mata_pelajaran || '-', email: item.email || '-', phone: item.phone || '-', status: item.status || 'Aktif' }));
    state.classes = classes.map((item) => ({ id: item.id, code: item.kode_kelas, name: item.nama_kelas, wali: item.wali_kelas || '-', capacity: item.kapasitas || 0 }));
    state.subjects = subjects.map((item) => ({ id: item.id, code: item.kode_mapel, name: item.nama_mapel, kkm: item.kkm || 0 }));
    state.applicants = applicants.map((item) => ({ id: item.id, regNo: item.no_pendaftaran, name: item.siswa?.nama || '-', targetClass: item.siswa?.kelas?.nama_kelas || '-', status: 'Terdaftar' }));
    state.scores = scores.map((item) => ({ id: item.id, studentId: item.siswa_id, subjectId: item.mapel_id, kelas: item.siswa?.kelas?.nama_kelas || '-', semester: item.semester || '-', year: item.year || '-', task: item.tugas, uts: item.uts, uas: item.uas, final: item.nilai_akhir, category: helpers.category(item.nilai_akhir) }));
    state.attendance = attendances.map((item) => ({ date: item.tanggal, studentId: item.siswa_id, status: item.status }));
    state.payments = payments.map((item) => ({ id: item.id, number: `PAY-${item.id.toString().padStart(3, '0')}`, studentName: item.siswa?.nama || '-', month: item.bulan, amount: item.nominal, status: item.status }));
    renderApplicants();
    renderStudents();
    renderTeachers();
    renderClasses();
    renderSubjects();
    renderScores();
    renderReport();
    renderAttendance();
    renderPayments();
    refreshSelectOptions();
    updateDashboard();
  } catch (err) {
    console.error(err);
    alert('Tidak dapat memuat data API. Pastikan backend berjalan dan login berhasil.');
  }
}

function setActivePage(pageKey) {
  elements.pages.forEach((page) => page.classList.add('hidden'));
  const pageElement = document.getElementById(pageKey);
  if (pageElement) pageElement.classList.remove('hidden');
  elements.menuItems.forEach((item) => item.classList.toggle('active', item.dataset.page === pageKey));
  elements.pageTitle.textContent = pageMap[pageKey] || 'Dashboard';
  if (pageKey === 'dashboard') {
    document.getElementById('dashboard').classList.add('active');
  }
  if (window.innerWidth <= 1120) {
    elements.sidebar.classList.remove('open');
  }
}

function updateDashboard() {
  stats.students.textContent = state.students.length;
  stats.teachers.textContent = state.teachers.length;
  stats.classes.textContent = state.classes.length;
  stats.subjects.textContent = state.subjects.length;
  stats.applicants.textContent = state.applicants.length;
  const average = state.scores.length ? (state.scores.reduce((sum, item) => sum + item.final, 0) / state.scores.length).toFixed(1) : 0;
  stats.average.textContent = average;
  stats.graduate.textContent = state.students.filter((item) => item.status.toLowerCase().includes('lulus')).length;
  stats.active.textContent = state.students.filter((item) => item.status.toLowerCase() === 'aktif').length;
  renderCharts();
}

function renderCharts() {
  const studentGrowth = [60, 72, 84, 95, 108, 118, state.students.length];
  const scoreData = [70, 74, 79, 81, 83, 85, parseFloat(stats.average.textContent) || 82];
  const applicantData = state.applicants.map((item, index) => 5 + index * 3);

  if (charts.students) charts.students.destroy();
  if (charts.scores) charts.scores.destroy();
  if (charts.applications) charts.applications.destroy();

  const ctxStudents = document.getElementById('chartStudents').getContext('2d');
  charts.students = new Chart(ctxStudents, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul'],
      datasets: [{ label: 'Siswa Aktif', data: studentGrowth, borderColor: '#2563eb', backgroundColor: 'rgba(37, 99, 235, 0.18)', fill: true, tension: 0.35 }],
    },
    options: { responsive: true, plugins: { legend: { display: false } } },
  });

  const ctxScores = document.getElementById('chartScores').getContext('2d');
  charts.scores = new Chart(ctxScores, {
    type: 'bar',
    data: {
      labels: ['Matematika', 'B. Indonesia', 'IPA', 'Bahasa', 'IPS'],
      datasets: [{ label: 'Rata-rata Nilai', data: scoreData, backgroundColor: '#22c55e' }],
    },
    options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, max: 100 } } },
  });

  const ctxApplications = document.getElementById('chartApplications').getContext('2d');
  charts.applications = new Chart(ctxApplications, {
    type: 'line',
    data: {
      labels: ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'],
      datasets: [{ label: 'Pendaftaran', data: applicantData, borderColor: '#f97316', backgroundColor: 'rgba(249, 115, 22, 0.18)', fill: true, tension: 0.35 }],
    },
    options: { responsive: true, plugins: { legend: { display: false } } },
  });
}

function renderApplicants(filter = '') {
  const rows = state.applicants
    .filter((item) => `${item.regNo} ${item.name} ${item.targetClass}`.toLowerCase().includes(filter.toLowerCase()))
    .map((item, index) => `<tr><td>${index + 1}</td><td>${item.regNo}</td><td>${item.name}</td><td>${item.targetClass}</td><td>${item.status}</td><td><button class="button button-muted" data-action="delete-applicant" data-id="${item.id}">Hapus</button></td></tr>`)
    .join('');
  elements.applicantTable.innerHTML = rows || '<tr><td colspan="6">Data pendaftar tidak ditemukan.</td></tr>';
}

function renderStudents(filter = '') {
  const rows = state.students
    .filter((item) => `${item.nis} ${item.nisn} ${item.name} ${item.kelas}`.toLowerCase().includes(filter.toLowerCase()))
    .map((item, index) => `<tr><td>${index + 1}</td><td>${item.nis}</td><td>${item.nisn}</td><td>${item.name}</td><td>${item.kelas}</td><td>${item.jurusan}</td><td>${item.phone}</td><td>${item.status}</td><td><button class="button button-muted" data-action="delete-student" data-id="${item.id}">Hapus</button></td></tr>`)
    .join('');
  elements.studentTable.innerHTML = rows || '<tr><td colspan="9">Data siswa tidak ditemukan.</td></tr>';
}

function renderTeachers(filter = '') {
  const rows = state.teachers
    .filter((item) => `${item.nip} ${item.name} ${item.subject}`.toLowerCase().includes(filter.toLowerCase()))
    .map((item, index) => `<tr><td>${index + 1}</td><td>${item.nip}</td><td>${item.name}</td><td>${item.subject}</td><td>${item.email}</td><td>${item.phone}</td><td>${item.status}</td><td><button class="button button-muted" data-action="delete-teacher" data-id="${item.id}">Hapus</button></td></tr>`)
    .join('');
  elements.teacherTable.innerHTML = rows || '<tr><td colspan="8">Data guru tidak ditemukan.</td></tr>';
}

function renderClasses(filter = '') {
  const rows = state.classes
    .filter((item) => `${item.code} ${item.name} ${item.wali}`.toLowerCase().includes(filter.toLowerCase()))
    .map((item, index) => `<tr><td>${index + 1}</td><td>${item.code}</td><td>${item.name}</td><td>${item.wali}</td><td>${item.capacity}</td><td><button class="button button-muted" data-action="delete-class" data-id="${item.id}">Hapus</button></td></tr>`)
    .join('');
  elements.classTable.innerHTML = rows || '<tr><td colspan="6">Data kelas tidak ditemukan.</td></tr>';
}

function renderSubjects(filter = '') {
  const rows = state.subjects
    .filter((item) => `${item.code} ${item.name}`.toLowerCase().includes(filter.toLowerCase()))
    .map((item, index) => `<tr><td>${index + 1}</td><td>${item.code}</td><td>${item.name}</td><td>${item.kkm}</td><td><button class="button button-muted" data-action="delete-subject" data-id="${item.id}">Hapus</button></td></tr>`)
    .join('');
  elements.subjectTable.innerHTML = rows || '<tr><td colspan="5">Data mata pelajaran tidak ditemukan.</td></tr>';
}

function renderScores(filter = '') {
  const rows = state.scores
    .filter((item) => {
      const student = state.students.find((student) => student.id === item.studentId);
      const subject = state.subjects.find((subject) => subject.id === item.subjectId);
      return `${student?.name || ''} ${subject?.name || ''} ${item.kelas}`.toLowerCase().includes(filter.toLowerCase());
    })
    .map((item, index) => {
      const student = state.students.find((student) => student.id === item.studentId) || {};
      const subject = state.subjects.find((subject) => subject.id === item.subjectId) || {};
      return `<tr><td>${index + 1}</td><td>${student.name || 'Unknown'}</td><td>${subject.name || item.subjectId}</td><td>${item.kelas}</td><td>${item.semester}</td><td>${item.year}</td><td>${item.task}</td><td>${item.uts}</td><td>${item.uas}</td><td>${item.final}</td><td>${item.category}</td></tr>`;
    })
    .join('');
  elements.scoresTable.innerHTML = rows || '<tr><td colspan="11">Data nilai tidak ditemukan.</td></tr>';
}

function renderAttendance(dateValue) {
  const selectedDate = dateValue || new Date().toISOString().slice(0, 10);
  elements.attendanceDate.value = selectedDate;
  const rows = state.students.map((student, index) => {
    const record = state.attendance.find((item) => item.studentId === student.id && item.date === selectedDate) || { status: 'Hadir' };
    return `<tr><td>${index + 1}</td><td>${student.name}</td><td>${student.kelas}</td><td><select data-id="${student.id}" class="attendance-status"><option value="Hadir" ${record.status === 'Hadir' ? 'selected' : ''}>Hadir</option><option value="Sakit" ${record.status === 'Sakit' ? 'selected' : ''}>Sakit</option><option value="Izin" ${record.status === 'Izin' ? 'selected' : ''}>Izin</option><option value="Alpha" ${record.status === 'Alpha' ? 'selected' : ''}>Alpha</option></select></td></tr>`;
  }).join('');
  elements.attendanceTable.innerHTML = rows || '<tr><td colspan="4">Tidak ada data siswa.</td></tr>';
}

function renderPayments(filter = '') {
  const rows = state.payments
    .filter((item) => `${item.number} ${item.studentName} ${item.month} ${item.status}`.toLowerCase().includes(filter.toLowerCase()))
    .map((item, index) => `<tr><td>${index + 1}</td><td>${item.number}</td><td>${item.studentName}</td><td>${item.month}</td><td>${helpers.formatCurrency(item.amount)}</td><td>${item.status}</td><td><button class="button button-muted" data-action="receipt" data-id="${item.id}">Kwitansi</button></td></tr>`)
    .join('');
  elements.paymentTable.innerHTML = rows || '<tr><td colspan="7">Data pembayaran tidak ditemukan.</td></tr>';
}

function renderReport() {
  const average = state.scores.length ? (state.scores.reduce((sum, item) => sum + item.final, 0) / state.scores.length).toFixed(1) : 0;
  const rank = state.students.length ? 1 : '-';
  document.getElementById('reportAverage').textContent = average;
  document.getElementById('reportRank').textContent = rank;
  const rows = state.scores.map((item) => {
    const subject = state.subjects.find((subject) => subject.id === item.subjectId) || {};
    return `<tr><td>${subject.name || item.subjectId}</td><td>${item.task}</td><td>${item.uts}</td><td>${item.uas}</td><td>${item.final}</td><td>${item.category}</td></tr>`;
  }).join('');
  document.getElementById('reportScores').innerHTML = rows || '<tr><td colspan="6">Belum ada data nilai.</td></tr>';
}

function refreshSelectOptions() {
  const studentOptions = state.students.map((student) => `<option value="${student.id}">${student.name} - ${student.kelas}</option>`).join('');
  elements.scoreStudent.innerHTML = `<option value="">Pilih siswa</option>${studentOptions}`;
  const subjectOptions = state.subjects.map((subject) => `<option value="${subject.id}">${subject.name}</option>`).join('');
  elements.scoreSubject.innerHTML = `<option value="">Pilih mata pelajaran</option>${subjectOptions}`;
  const classOptions = state.classes.map((item) => `<option value="${item.name}">${item.name}</option>`).join('');
  elements.scoreClass.innerHTML = `<option value="">Pilih kelas</option>${classOptions}`;
  const reportClass = document.getElementById('reportClass');
  if (reportClass) {
    reportClass.innerHTML = `<option value="">Semua</option>${state.classes.map((item) => `<option value="${item.name}">${item.name}</option>`).join('')}`;
  }
}

function bindEvents() {
  elements.menuItems.forEach((item) => {
    item.addEventListener('click', (event) => {
      event.preventDefault();
      setActivePage(item.dataset.page);
    });
  });

  elements.menuToggle.addEventListener('click', () => elements.sidebar.classList.toggle('open'));

  elements.loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
      const email = elements.loginEmail.value.trim();
      const password = elements.loginPassword.value.trim();
      const data = await apiRequest('/auth/login', 'POST', { email, password });
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('user', JSON.stringify(data.user));
      setLoggedInUser(data.user);
      state.role = data.user.role;
      applyRole();
      hideLogin();
      await reloadDataFromApi();
      setActivePage('dashboard');
    } catch (err) {
      alert(err.message);
    }
  });

  elements.logoutButton.addEventListener('click', () => {
    clearAuth();
    requireLogin();
  });

  elements.userRole.addEventListener('change', (event) => {
    state.role = event.target.value;
    applyRole();
  });

  elements.refreshDashboard.addEventListener('click', updateDashboard);

  elements.actionCards.forEach((card) => card.addEventListener('click', () => setActivePage(card.dataset.page)));

  elements.ppdbForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const newApplicant = {
      id: helpers.randomId('a'),
      regNo: elements.ppdbNo.value || `PPDB-${new Date().getFullYear()}-${String(state.applicants.length + 1).padStart(3, '0')}`,
      name: document.getElementById('ppdbName').value,
      targetClass: document.getElementById('ppdbTargetClass').value,
      status: 'Terdaftar',
    };
    try {
      const targetClass = state.classes.find((item) => item.name.toLowerCase().startsWith(newApplicant.targetClass.toLowerCase())) || state.classes[0];
      const siswaData = {
        nis: document.getElementById('ppdbNisn').value || helpers.randomId('nis'),
        nisn: document.getElementById('ppdbNisn').value,
        nama: newApplicant.name,
        kelas_id: targetClass?.id,
      };
      const createdStudent = await apiRequest('/siswa', 'POST', siswaData);
      await apiRequest('/pendaftaran', 'POST', { no_pendaftaran: newApplicant.regNo, siswa_id: createdStudent.id });
      await reloadDataFromApi();
      elements.ppdbForm.reset();
      generateRegistrationNumber();
      alert('Pendaftar berhasil ditambahkan.');
    } catch (err) {
      alert(err.message);
    }
  });

  document.getElementById('resetPpdb').addEventListener('click', () => {
    elements.ppdbForm.reset();
    generateRegistrationNumber();
  });

  document.getElementById('printRegistration').addEventListener('click', () => {
    window.print();
  });

  elements.searchApplicant.addEventListener('input', (event) => renderApplicants(event.target.value));
  elements.searchStudent.addEventListener('input', (event) => renderStudents(event.target.value));
  elements.searchTeacher.addEventListener('input', (event) => renderTeachers(event.target.value));
  elements.searchClass.addEventListener('input', (event) => renderClasses(event.target.value));
  elements.searchSubject.addEventListener('input', (event) => renderSubjects(event.target.value));
  elements.searchScore.addEventListener('input', (event) => renderScores(event.target.value));
  elements.searchPayment.addEventListener('input', (event) => renderPayments(event.target.value));

  elements.addStudentBtn.addEventListener('click', () => openModal('student'));
  elements.addTeacherBtn.addEventListener('click', () => openModal('teacher'));
  elements.addClassBtn.addEventListener('click', () => openModal('class'));
  elements.addSubjectBtn.addEventListener('click', () => openModal('subject'));

  elements.scoreTask.addEventListener('input', updateFinalScore);
  elements.scoreUts.addEventListener('input', updateFinalScore);
  elements.scoreUas.addEventListener('input', updateFinalScore);

  elements.scoreForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const final = updateFinalScore();
    const entry = {
      id: helpers.randomId('score'),
      studentId: elements.scoreStudent.value,
      subjectId: elements.scoreSubject.value,
      kelas: elements.scoreClass.value,
      semester: document.getElementById('scoreSemester').value,
      year: elements.scoreYear.value,
      task: Number(elements.scoreTask.value),
      uts: Number(elements.scoreUts.value),
      uas: Number(elements.scoreUas.value),
      final,
      category: helpers.category(final),
    };
    state.scores.push(entry);
    renderScores();
    renderReport();
    alert('Nilai berhasil disimpan.');
    elements.scoreForm.reset();
    elements.finalScore.textContent = '0';
    elements.scoreCategory.textContent = '-';
  });

  elements.printReport.addEventListener('click', () => window.print());

  elements.attendanceDate.addEventListener('change', (event) => renderAttendance(event.target.value));

  document.body.addEventListener('change', (event) => {
    if (event.target.matches('.attendance-status')) {
      const studentId = event.target.dataset.id;
      const date = elements.attendanceDate.value;
      const existing = state.attendance.find((item) => item.studentId === studentId && item.date === date);
      if (existing) {
        existing.status = event.target.value;
      } else {
        state.attendance.push({ date, studentId, status: event.target.value });
      }
    }
  });

  document.body.addEventListener('click', (event) => {
    if (event.target.matches('button[data-action="delete-applicant"]')) {
      const id = event.target.dataset.id;
      state.applicants = state.applicants.filter((item) => item.id !== id);
      renderApplicants(elements.searchApplicant.value);
      updateDashboard();
    }
    if (event.target.matches('button[data-action="delete-student"]')) {
      const id = event.target.dataset.id;
      state.students = state.students.filter((item) => item.id !== id);
      renderStudents(elements.searchStudent.value);
      refreshSelectOptions();
      updateDashboard();
    }
    if (event.target.matches('button[data-action="delete-teacher"]')) {
      const id = event.target.dataset.id;
      state.teachers = state.teachers.filter((item) => item.id !== id);
      renderTeachers(elements.searchTeacher.value);
      updateDashboard();
    }
    if (event.target.matches('button[data-action="delete-class"]')) {
      const id = event.target.dataset.id;
      state.classes = state.classes.filter((item) => item.id !== id);
      renderClasses(elements.searchClass.value);
      refreshSelectOptions();
      updateDashboard();
    }
    if (event.target.matches('button[data-action="delete-subject"]')) {
      const id = event.target.dataset.id;
      state.subjects = state.subjects.filter((item) => item.id !== id);
      renderSubjects(elements.searchSubject.value);
      refreshSelectOptions();
      updateDashboard();
    }
    if (event.target.matches('button[data-action="receipt"]')) {
      const id = event.target.dataset.id;
      const payment = state.payments.find((item) => item.id === id);
      if (payment) {
        alert(`Cetak kwitansi untuk ${payment.studentName} (${payment.number})`);
      }
    }
  });

  if (elements.exportStudentCsv) {
    elements.exportStudentCsv.addEventListener('click', exportStudentCsv);
  }
  if (elements.exportStudentPdf) {
    elements.exportStudentPdf.addEventListener('click', exportStudentPdf);
  }
  if (elements.backupData) {
    elements.backupData.addEventListener('click', () => alert('Backup berhasil dilakukan. Simulasi tanpa database nyata.'));
  }
}

function updateFinalScore() {
  const task = Number(elements.scoreTask.value) || 0;
  const uts = Number(elements.scoreUts.value) || 0;
  const uas = Number(elements.scoreUas.value) || 0;
  const final = Math.round(task * 0.3 + uts * 0.3 + uas * 0.4);
  elements.finalScore.textContent = final;
  elements.scoreCategory.textContent = helpers.category(final);
  return final;
}

function openModal(type) {
  const modal = document.getElementById('modalForm');
  const modalTitle = document.getElementById('modalTitle');
  const modalForm = document.getElementById('modalEntityForm');
  modalForm.innerHTML = '';
  if (type === 'student') {
    modalTitle.textContent = 'Tambah Siswa';
    modalForm.innerHTML = `
      <div class="modal-body">
        <label>NIS<input type="text" name="nis" required /></label>
        <label>NISN<input type="text" name="nisn" required /></label>
        <label>Nama<input type="text" name="name" required /></label>
        <label>Kelas<select name="kelas">${state.classes.map((item) => `<option value="${item.name}">${item.name}</option>`).join('')}</select></label>
        <label>Jurusan<input type="text" name="jurusan" required /></label>
        <label>Alamat<textarea name="address" rows="3" required></textarea></label>
        <label>Nomor HP<input type="text" name="phone" required /></label>
        <label>Status<select name="status"><option>Aktif</option><option>Lulus</option><option>Tidak Aktif</option></select></label>
      </div>
      <div class="form-actions" style="padding: 0 24px 24px;">
        <button type="submit" class="button button-primary">Simpan</button>
        <button type="button" class="button button-secondary" id="cancelModal">Batal</button>
      </div>
    `;
  }
  if (type === 'teacher') {
    modalTitle.textContent = 'Tambah Guru';
    modalForm.innerHTML = `
      <div class="modal-body">
        <label>NIP<input type="text" name="nip" required /></label>
        <label>Nama Guru<input type="text" name="name" required /></label>
        <label>Mata Pelajaran<select name="subject">${state.subjects.map((item) => `<option value="${item.name}">${item.name}</option>`).join('')}</select></label>
        <label>Email<input type="email" name="email" required /></label>
        <label>Nomor HP<input type="text" name="phone" required /></label>
        <label>Status<select name="status"><option>Aktif</option><option>Tidak Aktif</option></select></label>
      </div>
      <div class="form-actions" style="padding: 0 24px 24px;">
        <button type="submit" class="button button-primary">Simpan</button>
        <button type="button" class="button button-secondary" id="cancelModal">Batal</button>
      </div>
    `;
  }
  if (type === 'class') {
    modalTitle.textContent = 'Tambah Kelas';
    modalForm.innerHTML = `
      <div class="modal-body">
        <label>Kode Kelas<input type="text" name="code" required /></label>
        <label>Nama Kelas<input type="text" name="name" required /></label>
        <label>Wali Kelas<input type="text" name="wali" required /></label>
        <label>Kapasitas<input type="number" name="capacity" min="0" required /></label>
      </div>
      <div class="form-actions" style="padding: 0 24px 24px;">
        <button type="submit" class="button button-primary">Simpan</button>
        <button type="button" class="button button-secondary" id="cancelModal">Batal</button>
      </div>
    `;
  }
  if (type === 'subject') {
    modalTitle.textContent = 'Tambah Mata Pelajaran';
    modalForm.innerHTML = `
      <div class="modal-body">
        <label>Kode Mapel<input type="text" name="code" required /></label>
        <label>Nama Mata Pelajaran<input type="text" name="name" required /></label>
        <label>KKM<input type="number" name="kkm" min="0" max="100" required /></label>
      </div>
      <div class="form-actions" style="padding: 0 24px 24px;">
        <button type="submit" class="button button-primary">Simpan</button>
        <button type="button" class="button button-secondary" id="cancelModal">Batal</button>
      </div>
    `;
  }

  document.body.classList.add('modal-open');
  modal.classList.remove('hidden');

  const cancelButton = document.getElementById('cancelModal');
  cancelButton?.addEventListener('click', closeModal);
  modalForm.onsubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(modalForm);
    if (type === 'student') {
      state.students.push({
        id: helpers.randomId('s'),
        nis: formData.get('nis'),
        nisn: formData.get('nisn'),
        name: formData.get('name'),
        kelas: formData.get('kelas'),
        jurusan: formData.get('jurusan'),
        address: formData.get('address'),
        phone: formData.get('phone'),
        status: formData.get('status'),
      });
    }
    if (type === 'teacher') {
      state.teachers.push({
        id: helpers.randomId('t'),
        nip: formData.get('nip'),
        name: formData.get('name'),
        subject: formData.get('subject'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        status: formData.get('status'),
      });
    }
    if (type === 'class') {
      state.classes.push({
        id: helpers.randomId('c'),
        code: formData.get('code'),
        name: formData.get('name'),
        wali: formData.get('wali'),
        capacity: Number(formData.get('capacity')),
      });
    }
    if (type === 'subject') {
      state.subjects.push({
        id: helpers.randomId('m'),
        code: formData.get('code'),
        name: formData.get('name'),
        kkm: Number(formData.get('kkm')),
      });
    }

    refreshSelectOptions();
    renderStudents();
    renderTeachers();
    renderClasses();
    renderSubjects();
    updateDashboard();
    closeModal();
  };
}

function closeModal() {
  const modal = document.getElementById('modalForm');
  modal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  const modalForm = document.getElementById('modalEntityForm');
  modalForm.innerHTML = '';
}

function applyRole() {
  const allowed = {
    admin: ['dashboard', 'penerimaan', 'pendaftar', 'verifikasi', 'status-penerimaan', 'input-nilai', 'data-nilai', 'rapor', 'rekap-nilai', 'laporan-penerimaan', 'laporan-nilai', 'laporan-siswa', 'laporan-guru', 'data-siswa', 'data-guru', 'data-kelas', 'data-mapel', 'data-tahun', 'profil', 'logo', 'user-management', 'backup', 'absensi', 'keuangan'],
    operator: ['dashboard', 'penerimaan', 'pendaftar', 'verifikasi', 'status-penerimaan', 'data-siswa', 'laporan-penerimaan', 'laporan-nilai', 'laporan-siswa'],
    guru: ['dashboard', 'input-nilai', 'data-nilai', 'rapor', 'absensi'],
    kepala: ['dashboard', 'laporan-penerimaan', 'laporan-nilai', 'laporan-siswa', 'laporan-guru'],
  };
  elements.menuItems.forEach((item) => {
    const visible = allowed[state.role]?.includes(item.dataset.page);
    item.style.display = visible ? 'block' : 'none';
  });
  if (!allowed[state.role]?.includes(document.querySelector('.menu-item.active')?.dataset.page)) {
    setActivePage('dashboard');
  }
}

function exportStudentCsv() {
  const header = ['NIS', 'NISN', 'Nama', 'Kelas', 'Jurusan', 'Alamat', 'Nomor HP', 'Status'];
  const rows = state.students.map((item) => [item.nis, item.nisn, item.name, item.kelas, item.jurusan, item.address, item.phone, item.status]);
  const csv = [header, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'data_siswa.csv';
  link.click();
  URL.revokeObjectURL(url);
}

function exportStudentPdf() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text('Laporan Data Siswa', 14, 20);
  doc.setFontSize(10);
  const headers = ['NIS', 'NISN', 'Nama', 'Kelas', 'Status'];
  const startY = 30;
  let y = startY;
  doc.text(headers.join(' | '), 14, y);
  y += 8;
  state.students.forEach((item) => {
    const line = [item.nis, item.nisn, item.name, item.kelas, item.status].join(' | ');
    doc.text(line, 14, y);
    y += 8;
    if (y > 280) {
      doc.addPage();
      y = 20;
    }
  });
  doc.save('laporan_data_siswa.pdf');
}

function setInitialState() {
  initializeData();
  generateRegistrationNumber();
  renderApplicants();
  renderStudents();
  renderTeachers();
  renderClasses();
  renderSubjects();
  renderScores();
  renderReport();
  renderAttendance();
  renderPayments();
  refreshSelectOptions();
  updateDashboard();
  applyRole();
}

function generateRegistrationNumber() {
  const nextId = state.applicants.length + 1;
  elements.ppdbNo.value = `PPDB-${new Date().getFullYear()}-${String(nextId).padStart(3, '0')}`;
}

window.addEventListener('DOMContentLoaded', () => {
  bindEvents();
  initializeTheme();
  const loggedIn = initializeAuth();
  if (loggedIn) {
    reloadDataFromApi();
  } else {
    setInitialState();
  }
  setActivePage('dashboard');
});

const modalClose = document.getElementById('closeModal');
modalClose?.addEventListener('click', closeModal);
