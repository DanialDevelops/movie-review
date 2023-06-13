const movieName = 'Avengers';
const imdbID = 'tt21361444';

const url = `https://moviesdatabase.p.rapidapi.com/titles/search/title/${movieName}?exact=false&titleType=movie`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c961f67e5dmshb85187a59e3a016p120c5fjsn654578d7d426',
		'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
	}
};

const response = fetch(url, options, movieName)
    .then(response => response.json())
    .then(data => console.log({data}))
    .catch(err => console.error(err));

const url2 = `https://moviesdatabase.p.rapidapi.com/titles/${imdbID}`;
const options2 = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'c961f67e5dmshb85187a59e3a016p120c5fjsn654578d7d426',
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }
};

const response2 = fetch(url2, options2, imdbID)
    .then(response2 => response2.json())
    .then(data2 => console.log({data2}))
    .catch(err => console.error(err));