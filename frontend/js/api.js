const isLocalDev = location.hostname === 'localhost' || location.hostname === '127.0.0.1' || location.hostname.includes('192.168');
const API = isLocalDev ? 'http://localhost:5000/api' : '/api';
const BASE_URL = isLocalDev ? 'http://localhost:5000' : '';

// ── HTTP helpers ──────────────────────────────
async function request(method, endpoint, body = null, isForm = false) {
  const token = localStorage.getItem('token');
  const headers = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  if (body && !isForm) headers['Content-Type'] = 'application/json';

  const opts = { method, headers };
  if (body) opts.body = isForm ? body : JSON.stringify(body);

  const url = API + endpoint;
  console.log(`📤 ${method} ${url}`, body || '');

  try {
    const res = await fetch(url, opts);

    if (res.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login.html';
      return;
    }

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.error(`❌ ${method} ${url}:`, res.status, data);
      throw data;
    }
    console.log(`✅ ${method} ${url}:`, data);
    return data;
  } catch (err) {
    console.error(`🔥 Fetch error on ${url}:`, err);
    throw err;
  }
}

const api = {
  get:    (ep)        => request('GET', ep),
  post:   (ep, body)  => request('POST', ep, body),
  put:    (ep, body)  => request('PUT', ep, body),
  delete: (ep)        => request('DELETE', ep),
  upload: (ep, fd)    => request('POST', ep, fd, true),
};

// ── Auth helpers ──────────────────────────────
const Auth = {
  getUser()  { try { return JSON.parse(localStorage.getItem('user')); } catch { return null; } },
  getToken() { return localStorage.getItem('token'); },
  isLoggedIn() { return !!this.getToken(); },
  setSession(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  },
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = './index.html';
  },
  requireAuth() {
    if (!this.isLoggedIn()) { window.location.href = './login.html'; return false; }
    return true;
  },
  requireRole(role) {
    const u = this.getUser();
    if (!u || u.role !== role) { window.location.href = './index.html'; return false; }
    return true;
  }
};

// ── UI helpers ────────────────────────────────
function showAlert(container, msg, type = 'danger') {
  const icons = { danger: '⚠️', success: '✅', warning: '⚡' };
  container.innerHTML = `<div class="alert alert-${type}">${icons[type]} ${msg}</div>`;
}

function setLoading(btn, loading, text = '') {
  btn.disabled = loading;
  btn.innerHTML = loading
    ? `<span class="spinner"></span>`
    : text || btn.dataset.text || btn.innerText;
  if (text && !btn.dataset.text) btn.dataset.text = btn.innerText;
}

function starsHTML(note) {
  const n = Math.round(parseFloat(note) || 0);
  return `<span class="stars">${'★'.repeat(n)}${'☆'.repeat(5-n)}</span>`;
}

function avatarHTML(nom, size = 36) {
  const letter = (nom || '?')[0].toUpperCase();
  return `<div style="width:${size}px;height:${size}px;border-radius:50%;background:var(--primary);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:${size*0.38}px;flex-shrink:0">${letter}</div>`;
}

function formatDate(d) {
  return new Date(d).toLocaleDateString('fr-FR', { day:'2-digit', month:'short', year:'numeric' });
}

function formatTime(d) {
  return new Date(d).toLocaleTimeString('fr-FR', { hour:'2-digit', minute:'2-digit' });
}

const STATUS = {
  en_attente: { label:'En attente', cls:'badge-warning' },
  en_cours:   { label:'En cours',   cls:'badge-info' },
  termine:    { label:'Terminé',    cls:'badge-success' },
  annule:     { label:'Annulé',     cls:'badge-danger' },
};
