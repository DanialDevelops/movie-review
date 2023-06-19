const loginHandler = async (event) => {
    event.preventDefault();
  
    const password = document.querySelector("#password-login").value.trim();
    const email = document.querySelector("#email-login").value.trim();
  
    if (email && password) {
      try {
        const response = await fetch('/api/user/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        const results = await response.json();
        console.log(results);
  
        if (response.ok) {
          document.location.replace('/profile');
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
        const response = await fetch('/api/user', {
          method: 'POST',
          body: JSON.stringify({ username, email, password }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        const results = await response.json();
        console.log(results);
  
        if (response.ok) {
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
  
  document.querySelector('.login-form').addEventListener('submit', loginHandler);
  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
