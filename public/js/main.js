const logout = document.querySelector('#logout');
const login = document.querySelector('#login');
const signup = document.querySelector('#signup');
const accountDetails = document.querySelector('.account-details');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');

auth.onAuthStateChanged((user) => {
  if (user) {
    console.log('user logged in: ', user);
    show(accountDetails);
    hide(login);
    hide(signup);
    show(logout);
  } else {
    console.log('user logged out');
    hide(accountDetails);
    show(login);
    show(signup);
    hide(logout);
  }
});

const show = (element) => {
  element.style.display = 'inline';
};

const hide = (element) => {
  element.style.display = 'none';
};

// logout
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth
    .signOut()
    .then(() => {
      console.log('user signed out');
    })
    .then(() => {
      hide(accountDetails);
    })
    .then(() => {
      show(login);
    })
    .then(() => {
      show(signup);
    })
    .then(() => {
      hide(logout);
    });
});

// login
login.addEventListener('click', (e) => {
  e.preventDefault();
  auth
    .signInWithEmailAndPassword('', '')
    .then((cred) => {
      console.log(cred.user);
    })
    .then(() => {
      show(accountDetails);
    })
    .then(() => {
      hide(login);
    })
    .then(() => {
      hide(signup);
    })
    .then(() => {
      show(logout);
    });
});

// signup
signup.addEventListener('click', (e) => {
  e.preventDefault();
  auth
    .createUserWithEmailAndPassword('', '')
    .then((cred) => {
      console.log(cred.user);
    })
    .then(() => {
      show(accountDetails);
    })
    .then(() => {
      hide(login);
    })
    .then(() => {
      hide(signup);
    })
    .then(() => {
      show(logout);
    });
});
