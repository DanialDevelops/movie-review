const logout = async () => {
  try {
    const response = await axios.post('/api/user/logout');

    if (response.status === 204) {
      document.location.replace('/');
    }
  } catch (error) {
    console.error(error);
  }
};

document.querySelector('#logout').addEventListener('click', logout);
