// THEME TOGGLE (with localStorage)
(function(){
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');

  const saved = localStorage.getItem('theme'); // 'dark' or 'light'
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  function applyTheme(mode){
    if(mode === 'dark'){
      root.classList.add('dark');
      icon.textContent = '☀️';
    } else {
      root.classList.remove('dark');
      icon.textContent = '🌙';
    }
  }

  if(saved) applyTheme(saved);
  else applyTheme(prefersDark ? 'dark' : 'light');

  btn.addEventListener('click', () => {
    const nowDark = root.classList.toggle('dark');
    applyTheme(nowDark ? 'dark' : 'light');
    localStorage.setItem('theme', nowDark ? 'dark' : 'light');
  });
})();

// FORM VALIDATION
document.getElementById('mainForm').addEventListener('submit', function(e){
  e.preventDefault();
  // clear previous messages
  document.querySelectorAll('.error').forEach(el => el.textContent = '');
  document.getElementById('successMsg').textContent = '';

  let valid = true;

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const password = document.getElementById('password').value;
  const cpassword = document.getElementById('cpassword').value;
  const address = document.getElementById('address').value.trim();
  const terms = document.getElementById('terms').checked;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[0-9]{10}$/;

  if(name.length < 3){
    document.getElementById('nameError').textContent = 'Enter your full name (min 3 chars)';
    valid = false;
  }
  if(!emailPattern.test(email)){
    document.getElementById('emailError').textContent = 'Enter a valid email';
    valid = false;
  }
  if(!phonePattern.test(phone)){
    document.getElementById('phoneError').textContent = 'Phone must be 10 digits';
    valid = false;
  }
  if(password.length < 6){
    document.getElementById('passwordError').textContent = 'Password must be 6+ characters';
    valid = false;
  }
  if(password !== cpassword){
    document.getElementById('cpasswordError').textContent = 'Passwords do not match';
    valid = false;
  }
  if(address.length > 0 && address.length < 6){
    document.getElementById('addressError').textContent = 'Address too short (min 6 chars)';
    valid = false;
  }
  if(!terms){
    document.getElementById('termsError').textContent = 'You must accept terms';
    valid = false;
  }

  if(!valid) return;

  // success - show message
  document.getElementById('successMsg').textContent = 'Form submitted successfully!';
  // optionally: reset form
  // this.reset();  // uncomment if you want to clear inputs
});
