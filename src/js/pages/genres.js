// Importing API Key and Image Endpoint from the config module
import { apiKey } from '../modules/config.js';
import { imgEndpoint } from '../modules/config.js';
import { generateCardHTMLForAdd } from '../modules/card.js';

function fetchKDramaByGenre(genreId) {
    const genreUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=${genreId}&with_original_language=ko&language=en-US`;

    fetch(genreUrl)
        .then(response => response.json())
        .then(data => {
            const kdramaCardsHTML = data.results.map(show => generateCardHTMLForAdd(show, imgEndpoint)).join('');
            document.querySelector('.kdrama-cards-container').innerHTML = kdramaCardsHTML;
        })
        .catch(error => console.error('Error fetching K-Dramas:', error));
}

document.getElementById('genreSelect').addEventListener('change', function() {
    const selectedGenre = this.value;
    if (selectedGenre) {
        fetchKDramaByGenre(selectedGenre);
    }
});

//This handles the adding of k-dramas to watchlist

document.addEventListener('DOMContentLoaded', function() {
    document.body.addEventListener('click', function(event) {
        if (event.target.classList.contains('card-button')) {
            
            const card = event.target.closest('.card');
            if (card) {
                const item = {
                    id: card.getAttribute('data-id').toString(),
                    name: card.querySelector('h3').textContent,
                    poster_path: card.querySelector('img').src,
                    first_air_date: card.querySelector('.card-info-bottom p').textContent
                };

                let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
                if (!watchlist.some(watchedItem => watchedItem.id === item.id)) {
                    watchlist.push(item);
                    localStorage.setItem('watchlist', JSON.stringify(watchlist));
                    alert('Added to watchlist!');
                } else {
                    alert('Item already in watchlist.');
                }
            }
        }
    });
});



document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.main-content').classList.add('fade-in');
});