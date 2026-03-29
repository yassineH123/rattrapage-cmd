function renderNavbar(activePage = '') {
  const user = Auth.getUser();

  const links = `
    <a href="services.html" class="${activePage==='services'?'active':''}">Explorer</a>
    ${user ? `<a href="dashboard.html" class="${activePage==='dashboard'?'active':''}">Dashboard</a>` : ''}
    ${user ? `<a href="messages.html" class="${activePage==='messages'?'active':''}">Messages</a>` : ''}
    ${user?.role === 'freelancer' ? `<a href="create-service.html" class="${activePage==='create'?'active':''}">Publier</a>` : ''}
    ${user?.role === 'admin' ? `<a href="admin.html" class="${activePage==='admin'?'active':''}" style="color:var(--primary)">⚙️ Admin</a>` : ''}
  `;

  const authArea = user ? `
    <div style="position:relative;display:flex;align-items:center;gap:8px">
      <div class="nav-avatar" id="avatarBtn">${user.nom[0].toUpperCase()}</div>
      <span class="nav-user-name">${user.nom}</span>
      <div class="nav-dropdown" id="navDropdown">
        <a href="profile.html">👤 Mon profil</a>
        <a href="dashboard.html">📊 Dashboard</a>
        ${user.role === 'admin' ? `<a href="admin.html">⚙️ Administration</a>` : ''}
        <div class="separator"></div>
        <button class="text-danger" onclick="Auth.logout()">🚪 Déconnexion</button>
      </div>
    </div>
  ` : `
    <a href="login.html" class="btn btn-outline btn-sm">Connexion</a>
    <a href="register.html" class="btn btn-primary btn-sm">S'inscrire</a>
  `;

  document.getElementById('navbar').innerHTML = `
    <div class="nav-inner">
      <a href="index.html" class="nav-logo">Freelance<span>Hub</span></a>
      <nav class="nav-links">${links}</nav>
      <div class="nav-auth">${authArea}</div>
    </div>
  `;

  const avatarBtn = document.getElementById('avatarBtn');
  const dropdown  = document.getElementById('navDropdown');
  if (avatarBtn && dropdown) {
    avatarBtn.addEventListener('click', e => { e.stopPropagation(); dropdown.classList.toggle('open'); });
    document.addEventListener('click', () => dropdown.classList.remove('open'));
  }
}

function renderFooter() {
  document.getElementById('footer').innerHTML = `
    <div class="footer-inner">
      <div>
        <div class="footer-logo">Freelance<span>Hub</span></div>
        <p class="footer-desc">La plateforme marocaine qui connecte les talents freelance avec les entreprises qui grandissent.</p>
      </div>
      <div>
        <div class="footer-title">Navigation</div>
        <div class="footer-links">
          <a href="services.html">Explorer les services</a>
          <a href="register.html">Devenir freelancer</a>
          <a href="login.html">Se connecter</a>
        </div>
      </div>
      <div>
        <div class="footer-title">Catégories</div>
        <div class="footer-links">
          <a href="services.html?cat=Design">Design</a>
          <a href="services.html?cat=Développement">Développement</a>
          <a href="services.html?cat=Marketing">Marketing</a>
          <a href="services.html?cat=Rédaction">Rédaction</a>
          <a href="services.html?cat=Vidéo">Vidéo</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">© ${new Date().getFullYear()} FreelanceHub — Fait avec ❤️ au Maroc</div>
  `;
}
