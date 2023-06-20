const loginHandler = async (event) => {
  event.preventDefault();

  const password = document.querySelector('#password-login').value.trim();
  const email = document.querySelector('#email-login').value.trim();

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
        alert(response.statusText);
      }
    } catch (err) {
      console.error('Login failed:', err);
      alert('Failed to log in. Please try again.');
    }
  }
};

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
  }
};

// Hide the navbar.
document.querySelector('#navbar').classList.add('d-none');

document.querySelector('.login-form').addEventListener('submit', loginHandler);
document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
