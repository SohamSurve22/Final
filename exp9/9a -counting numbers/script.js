const form = document.getElementById('loginForm');
const userNameInput = document.getElementById('userName');
const userCount = document.getElementById('userCount');
const userList = document.getElementById('userList');
const clearAllButton = document.getElementById('clearAll');

const STORAGE_KEY = 'exp9_session_users';

function readUsers() {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

function renderUsers() {
  const users = readUsers();
  userCount.textContent = String(users.length);
  userList.innerHTML = '';

  if (users.length === 0) {
    const emptyState = document.createElement('li');
    emptyState.className = 'empty';
    emptyState.textContent = 'No users logged in for this session.';
    userList.appendChild(emptyState);
    return;
  }

  users.forEach((user) => {
    const item = document.createElement('li');
    item.innerHTML = `
      <div>
        <span>${user}</span>
        <small>Logged in</small>
      </div>
      <button type="button" class="remove">Log out</button>
    `;

    item.querySelector('.remove').addEventListener('click', () => {
      const nextUsers = readUsers().filter((name) => name !== user);
      saveUsers(nextUsers);
      renderUsers();
    });

    userList.appendChild(item);
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = userNameInput.value.trim();

  if (!value) {
    userNameInput.focus();
    return;
  }

  const users = readUsers();
  if (!users.includes(value)) {
    users.push(value);
    saveUsers(users);
  }

  userNameInput.value = '';
  renderUsers();
  userNameInput.focus();
});

clearAllButton.addEventListener('click', () => {
  sessionStorage.removeItem(STORAGE_KEY);
  renderUsers();
});

renderUsers();
