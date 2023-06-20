const passwordInput = document.querySelector('#password-login');
const emailInput = document.querySelector('#email-login');

const loginHandler = async (event) => {
  event.preventDefault();

  const password = document.querySelector('#password-login').value.trim();
  const email = document.querySelector('#email-login').value.trim();
  const dropdown = document.querySelector('#login-dropdown');
  const errorMsg = document.querySelector('#search-error');

  if (email && password) {
    try {
      const response = await axios.post('/api/user/login', {
        email,
        password,
      });

      const results = response.data;
      console.log(results);

      if (response.status === 200) {
        document.location.replace('/');
      } else {
        dropdown.classList.remove('show');
        errorMsg.textContent = 'Incorrect email or password. Please try again';
      }
    } catch (err) {
      dropdown.classList.remove('show');
      errorMsg.textContent = 'Incorrect email or password. Please try again';
      console.error('Login failed:', err);
    }
  } else {
    emailInput.classList.add('is-invalid');
    passwordInput.classList.add('is-invalid');
  }
};

emailInput.addEventListener('input', () => {
  emailInput.classList.remove('is-invalid');
  passwordInput.classList.remove('is-invalid');
});

passwordInput.addEventListener('input', () => {
  emailInput.classList.remove('is-invalid');
  passwordInput.classList.remove('is-invalid');
});

document.querySelector('#login-form').addEventListener('submit', loginHandler);
