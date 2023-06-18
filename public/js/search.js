const  movieSearchHandler = async (event) => {
    event.preventDefault();

    const movieName = document.querySelector("#name-movie").value.trim();
    console.log(movieName)
    //add code for api here
  };

document.querySelector('.movie-form').addEventListener('submit', movieSearchHandler);