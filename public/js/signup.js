const usernameField = document.querySelector('#name-signup');
const emailField = document.querySelector('#email-signup');
const passwordField = document.querySelector('#password-signup');

const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && email && password) {
    try {
      const response = await axios.post('/api/user', {
        username,
        email,
        password,
      });

      const results = response.data;
      console.log(results);

      if (response.status === 200) {
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }
    } catch (err) {
      console.error('Sign up failed:', err);
      alert('Failed to sign up. Please try again.');
    }
  } else {
    usernameField.classList.add('is-invalid');
    emailField.classList.add('is-invalid');
    passwordField.classList.add('is-invalid');
  }
};

usernameField.addEventListener('input', () => {
  usernameField.classList.remove('is-invalid');
  emailField.classList.remove('is-invalid');
  passwordField.classList.remove('is-invalid');
});

emailField.addEventListener('input', () => {
  usernameField.classList.remove('is-invalid');
  emailField.classList.remove('is-invalid');
  passwordField.classList.remove('is-invalid');
});

passwordField.addEventListener('input', () => {
  usernameField.classList.remove('is-invalid');
  emailField.classList.remove('is-invalid');
  passwordField.classList.remove('is-invalid');
});

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
