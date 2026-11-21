const root = document.documentElement;
const loginScene = document.querySelector('#login-scene');
const readerHome = document.querySelector('#reader-home');
const dashboard = document.querySelector('#dashboard');
const form = document.querySelector('#login-form');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const message = document.querySelector('#message');
const showPassword = document.querySelector('#show');
const dialog = document.querySelector('#dialog');
const siteNav = document.querySelector('#site-nav');
const headerNote = document.querySelector('#header-note');
const loggedOutNav = siteNav.innerHTML;

const featuredBooks = [
  { id: 'whispering-rooms', cover: 'b1', title: 'Whispering Rooms', author: 'Genki Kawamura', category: 'Fiction', categories: ['fiction', 'mystery'], description: 'A quiet, tender story about the rooms we keep inside ourselves.' },
  { id: 'pearl', cover: 'b2', title: 'Pearl', author: 'John Steinbeck', category: 'Classics', categories: ['fiction', 'classics', 'personal'], description: 'A luminous classic about family, fortune, and the price of a dream.' },
  { id: 'perfect-day', cover: 'b3', title: 'Perfect Day to Be Alone', author: 'Nanae Aoyama', category: 'Romance', categories: ['fiction', 'romance'], description: 'A quietly observant coming-of-age story about finding room to be yourself.' },
  { id: 'before-coffee', cover: 'b4', title: 'Before Coffee Gets Cold', author: 'Toshikazu Kawaguchi', category: 'Fantasy', categories: ['fiction', 'fantasy'], description: 'In a small Tokyo café, a cup of coffee offers a brief journey through time.' },
  { id: 'pleasures-tokyo', cover: 'b5', title: 'Pleasures of Tokyo', author: 'Dorian Sukegawa', category: 'Fiction', categories: ['fiction'], description: 'A warm city portrait that finds meaning in food, memory, and everyday rituals.' },
  { id: 'stupid-man', cover: 'b7', title: 'Life of a Stupid Man', author: 'Ryunosuke Akutagawa', category: 'Classics', categories: ['fiction', 'classics'], description: 'A sharp, intimate collection of reflections from a singular literary voice.' },
  { id: 'little-prince', cover: 'b8', title: 'The Little Prince', author: 'Antoine de Saint-Exupéry', category: 'Fantasy', categories: ['fiction', 'fantasy', 'classics'], description: 'A poetic fable about friendship, wonder, and the things that matter most.' },
  { id: 'cats-disappeared', cover: 'b9', title: 'If Cats Disappeared from the World', author: 'Genki Kawamura', category: 'Mystery', categories: ['fiction', 'mystery', 'personal'], description: 'A magical, thoughtful story about what makes an ordinary life precious.' },
  { id: 'white-nights', cover: 'b10', title: 'The White Nights', author: 'Fyodor Dostoyevsky', category: 'Classics', categories: ['fiction', 'romance', 'classics'], description: 'A dreamer meets a stranger during four luminous nights in St. Petersburg.' },
  { id: 'schoolgirl', cover: 'b11', title: 'Schoolgirl', author: 'Osamu Dazai', category: 'Classics', categories: ['fiction', 'classics'], description: 'An observant day in the life of a young narrator, told with wit and candor.' }
];

function clearBookTheme() {
  root.removeAttribute('data-book-theme');
}

document.querySelectorAll('#books .book').forEach((book) => {
  const applyTheme = () => { root.dataset.bookTheme = book.dataset.theme; };
  const restoreTheme = () => {
    if (document.activeElement !== book && !book.matches(':hover')) clearBookTheme();
  };
  book.addEventListener('pointerenter', applyTheme);
  book.addEventListener('focus', applyTheme);
  book.addEventListener('pointerleave', restoreTheme);
  book.addEventListener('blur', restoreTheme);
});

function openDialog(title, copy) {
  document.querySelector('#dialog-title').textContent = title;
  document.querySelector('#dialog-copy').textContent = copy;
  dialog.showModal();
}

document.querySelector('#dialog-ok').addEventListener('click', () => dialog.close());
document.querySelector('.close').addEventListener('click', () => dialog.close());
document.querySelector('#forgot').addEventListener('click', () => {
  openDialog('A new chapter', 'Account creation is coming soon. For now, use the Reader or Admin demo account displayed on the sign-in page.');
});
document.querySelector('#create').addEventListener('click', () => {
  openDialog('Password help', 'Password reset is not connected in this course demo. Use one of the preview accounts shown below the sign-in form.');
});
document.querySelectorAll('[data-legal]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    openDialog(link.dataset.legal, 'This reading room is a local course prototype. This sample page does not collect or transmit account information.');
  });
});

function renderFeaturedBooks() {
  const grid = document.querySelector('#featured-grid');
  const sourceBooks = new Map([...document.querySelectorAll('#books .book')].map((book) => [book.classList[1], book]));

  featuredBooks.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'featured-card';
    card.dataset.book = item.id;
    card.dataset.title = item.title.toLowerCase();
    card.dataset.author = item.author.toLowerCase();
    card.dataset.categories = item.categories.join(' ');

    const cover = document.createElement('div');
    cover.className = `featured-cover ${item.cover}`;
    cover.setAttribute('aria-hidden', 'true');
    [...sourceBooks.get(item.cover).children].forEach((part) => cover.appendChild(part.cloneNode(true)));

    const info = document.createElement('div');
    info.className = 'featured-info';
    const tag = document.createElement('p');
    tag.className = 'featured-tag';
    tag.textContent = item.category;
    const title = document.createElement('h3');
    title.textContent = item.title;
    const author = document.createElement('p');
    author.className = 'featured-author';
    author.textContent = item.author;
    const description = document.createElement('p');
    description.className = 'featured-description';
    description.textContent = item.description;
    const actions = document.createElement('div');
    actions.className = 'featured-actions';
    const details = document.createElement('button');
    details.type = 'button';
    details.textContent = 'View details';
    details.dataset.details = item.id;
    const save = document.createElement('button');
    save.type = 'button';
    save.className = 'save-button';
    save.textContent = 'Save to shelf';
    save.dataset.save = item.id;
    actions.append(details, save);
    info.append(tag, title, author, description, actions);
    card.append(cover, info);
    grid.append(card);
  });
}

function updateFeaturedBooks() {
  const term = document.querySelector('#reader-search').value.trim().toLowerCase();
  const selected = document.querySelector('.category-chip.active')?.dataset.categoryFilter || 'all';
  let shown = 0;

  document.querySelectorAll('.featured-card').forEach((card) => {
    const textMatch = card.dataset.title.includes(term) || card.dataset.author.includes(term);
    const categoryMatch = selected === 'all' || card.dataset.categories.split(' ').includes(selected);
    card.hidden = !(textMatch && categoryMatch);
    if (!card.hidden) shown += 1;
  });
  document.querySelector('#reader-no-results').hidden = shown > 0;
}

renderFeaturedBooks();
document.querySelector('#reader-search').addEventListener('input', updateFeaturedBooks);
document.querySelectorAll('[data-category-filter]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-category-filter]').forEach((item) => item.classList.toggle('active', item === button));
    updateFeaturedBooks();
  });
});

document.querySelector('#featured-grid').addEventListener('click', (event) => {
  const detailsButton = event.target.closest('[data-details]');
  if (detailsButton) {
    const item = featuredBooks.find((book) => book.id === detailsButton.dataset.details);
    openDialog(item.title, `${item.description} Category: ${item.category}.`);
    return;
  }

  const saveButton = event.target.closest('[data-save]');
  if (saveButton) {
    if (saveButton.classList.contains('saved')) return;
    const item = featuredBooks.find((book) => book.id === saveButton.dataset.save);
    saveButton.classList.add('saved');
    saveButton.setAttribute('aria-pressed', 'true');
    saveButton.textContent = 'Added to shelf';
    const savedBook = document.createElement('article');
    savedBook.className = 'saved-book';
    const cover = document.createElement('span');
    cover.className = 'saved-cover cover-teal';
    cover.textContent = item.title;
    const copy = document.createElement('div');
    const author = document.createElement('small');
    author.textContent = item.author.toUpperCase();
    const title = document.createElement('h3');
    title.textContent = item.title;
    const status = document.createElement('span');
    status.className = 'status status-want';
    status.textContent = 'Want to Read';
    copy.append(author, title, status);
    savedBook.append(cover, copy);
    document.querySelector('#saved-grid').append(savedBook);
    const savedCount = document.querySelector('#saved-count');
    savedCount.textContent = String(Number(savedCount.textContent) + 1);
  }
});

function setNavigation(mode) {
  if (mode === 'reader') {
    siteNav.innerHTML = '<a href="#reader-top">Home</a><a href="#reader-explore">Explore Books</a><a href="#reader-library">My Library</a><a href="#reader-progress">My Reading Progress</a><a href="#reader-profile">Profile</a><button class="nav-logout" type="button" data-header-logout>Logout</button>';
    headerNote.href = '#reader-explore';
  } else if (mode === 'admin') {
    siteNav.innerHTML = '<a href="#dashboard">Admin Home</a><a href="#library">Book Catalog</a><a href="#dashboard">Reports</a><button class="nav-logout" type="button" data-header-logout>Logout</button>';
    headerNote.href = '#dashboard';
  } else {
    siteNav.innerHTML = loggedOutNav;
    headerNote.href = '#books';
  }
}

function displayNameFor(email) {
  const localPart = email.split('@')[0].split(/[._-]/).filter(Boolean)[0] || 'Reader';
  return localPart.charAt(0).toUpperCase() + localPart.slice(1);
}

function showReaderHome(email) {
  loginScene.hidden = true;
  dashboard.hidden = true;
  readerHome.hidden = false;
  document.querySelector('#reader-name').textContent = displayNameFor(email);
  document.querySelector('#reader-email').textContent = email;
  document.querySelector('#reader-avatar').textContent = displayNameFor(email).charAt(0).toUpperCase();
  setNavigation('reader');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showAdminDashboard(email) {
  loginScene.hidden = true;
  readerHome.hidden = true;
  dashboard.hidden = false;
  document.querySelector('#member-name').textContent = 'Admin';
  document.querySelector('#account-email').textContent = email;
  document.querySelector('#account-badge').textContent = 'ADMIN TEST ACCOUNT';
  document.querySelector('#account-role').textContent = 'Administrator';
  document.querySelector('#avatar').textContent = 'A';
  setNavigation('admin');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function returnToLogin() {
  dashboard.hidden = true;
  readerHome.hidden = true;
  loginScene.hidden = false;
  setNavigation('login');
  emailInput.focus();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

siteNav.addEventListener('click', (event) => {
  if (event.target.closest('[data-header-logout]')) returnToLogin();
});
document.querySelector('#logout').addEventListener('click', returnToLogin);
document.querySelector('#reader-logout')?.addEventListener('click', returnToLogin);

showPassword.addEventListener('click', () => {
  const visible = passwordInput.type === 'password';
  passwordInput.type = visible ? 'text' : 'password';
  showPassword.textContent = visible ? 'Hide' : 'Show';
  showPassword.setAttribute('aria-pressed', String(visible));
});

// Intentional course defect: typing after revealing the password hides it again.
passwordInput.addEventListener('input', () => {
  if (passwordInput.type === 'text') {
    passwordInput.type = 'password';
    showPassword.textContent = 'Show';
    showPassword.setAttribute('aria-pressed', 'false');
  }
});

emailInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') event.preventDefault();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const isReader = email === 'reader@readwithme.com' && password === 'chapterone';
  const isAdmin = email === 'admin@readwithme.test' && password === 'libraryadmin';

  if (!email || !password) {
    // Intentional course defect: this error blames the email even when the password is missing.
    message.textContent = !password ? 'That email address does not look right.' : 'Please enter your email address and password.';
    message.className = 'message';
    return;
  }

  if (isReader || isAdmin) {
    message.textContent = 'Welcome back. Your shelf is ready.';
    message.className = 'message success';
    // Intentional course defect: the Remember me checkbox is ignored.
    try { localStorage.setItem('read-with-me-last-email', email); } catch { /* Storage may be unavailable. */ }
    if (isAdmin) showAdminDashboard(email);
    else showReaderHome(email);
    return;
  }

  if (password === '1') {
    // Intentional course defect: a one-character password is accepted for any non-empty email.
    message.textContent = 'Preview access opened.';
    message.className = 'message success';
    showReaderHome(email);
    return;
  }

  if (password === 'chapterone') {
    // Intentional course defect: the Reader password grants access for any non-empty email.
    message.textContent = 'Preview access opened.';
    message.className = 'message success';
    showReaderHome(email);
    return;
  }

  if (password === 'openbook') {
    // Intentional course defect: this broad preview shortcut accepts any non-empty email.
    message.textContent = 'Preview access opened.';
    message.className = 'message success';
    showReaderHome(email);
    return;
  }

  message.textContent = 'Those details do not match a preview account.';
  message.className = 'message';
});

document.querySelector('#continue').addEventListener('click', () => {
  openDialog('The White Nights', 'You are on page 1. Your next chapter is waiting.');
});

const search = document.querySelector('#search');
search.addEventListener('input', () => {
  const term = search.value.trim().toLowerCase();
  const books = [...document.querySelectorAll('#library-list article')];
  let visibleCount = 0;
  books.forEach((book) => {
    const matches = book.dataset.search.includes(term);
    book.hidden = !matches;
    if (matches) visibleCount += 1;
  });
  document.querySelector('#no-results').hidden = visibleCount > 0;
});

try {
  const savedEmail = localStorage.getItem('read-with-me-last-email');
  if (savedEmail) emailInput.value = savedEmail;
} catch { /* Storage may be unavailable. */ }

document.querySelector('#year').textContent = new Date().getFullYear();
