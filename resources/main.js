const form = document.getElementById('movie-form');
const titleInput = document.getElementById('movie-title');
const typeSelect = document.getElementById('movie-type');
const movieList = document.getElementById('movie-list');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const title = titleInput.value;
    const type = typeSelect.value;

    let apiUrl = 'https://www.omdbapi.com/?s=' + encodeURIComponent(title);
    if (type) {
        apiUrl += '&type=' + encodeURIComponent(type);
    }
    apiUrl += '&apikey=3bf129a2';

    fetch(apiUrl)
    .then(function(response) {
        if (response.ok) {
        return response.json();
        }
        throw new Error('Network response was not ok.');
    })
    .then(function(data) {
        if (data.Response === 'True') {
            const movies = data.Search;
            let html = '';
            for (let i = 0; i < movies.length; i++) {
                html += '<p>' + movies[i].Title + '</p>';
            }
            movieList.innerHTML = html;
        } else {
            movieList.innerHTML = '<p>Movie not found!</p>';
        }
        })
    .catch(function(error) {
        movieList.innerHTML = '<p>Error searching for movie.</p>';
    });
});

