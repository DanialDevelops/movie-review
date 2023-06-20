const logout = async () => {
  try {
    const response = await axios.post('/api/user/logout', null, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.status === 200) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  } catch (error) {
    console.error(error);
    alert('An error occurred during logout.');
  }
};

document.querySelector('#logout').addEventListener('click', logout);
