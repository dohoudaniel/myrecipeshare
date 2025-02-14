// // Theme Toggle
// const themeToggle = document.querySelector('.theme-toggle');
// const savedTheme = localStorage.getItem('theme');
// const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
// if (savedTheme) {
//   document.documentElement.setAttribute('data-theme', savedTheme);
// } else if (prefersDark) {
//   document.documentElement.setAttribute('data-theme', 'dark');
// }
// themeToggle.addEventListener('click', () => {
//   const currentTheme = document.documentElement.getAttribute('data-theme');
//   const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
//   document.documentElement.setAttribute('data-theme', newTheme);
//   localStorage.setItem('theme', newTheme);
// });

// // Password Toggle (for login page)
// const passwordInput = document.getElementById('password');
// if (passwordInput) {
//   const passwordToggle = document.querySelector('.password-toggle');
//   if (passwordToggle) {
//     const passwordIcon = passwordToggle.querySelector('i');
//     passwordToggle.addEventListener('click', () => {
//       const type = passwordInput.type === 'password' ? 'text' : 'password';
//       passwordInput.type = type;
//       passwordIcon.className = type === 'password' ? 'lucide-eye' : 'lucide-eye-off';
//     });
//   }
// }

// // JavaScript check
// if (!document.cookie.includes('js_enabled=true')) {
//   document.cookie = "js_enabled=true; path=/";
//   location.reload();
// }

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
} else if (prefersDark) {
  document.documentElement.setAttribute('data-theme', 'dark');
}
themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

// PASSWORD TOGGLE FUNCTIONALITY (APPLIES TO BOTH LOGIN AND SIGNUP PAGES)
const passwordInputs = document.querySelectorAll('input[type="password"]');
passwordInputs.forEach(passwordInput => {
  // Look for a sibling button with class "password-toggle"
  const parent = passwordInput.parentElement;
  const toggleButton = parent.querySelector('.password-toggle');
  if (toggleButton) {
    const toggleIcon = toggleButton.querySelector('.toggle-icon');
    toggleButton.addEventListener('click', () => {
      const type = passwordInput.type === 'password' ? 'text' : 'password';
      passwordInput.type = type;
      toggleIcon.textContent = type === 'password' ? '👀' : '🙈';
    });
  }
});

// JavaScript check
if (!document.cookie.includes('js_enabled=true')) {
  document.cookie = "js_enabled=true; path=/";
  location.reload();
}
