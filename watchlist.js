//MODULES

import { apiKey } from './config.js';
import { imgEndpoint } from './config.js'
import { generateCardHTMLForRemove } from './card.js';

document.addEventListener('DOMContentLoaded', function() {
    const watchlistContainer = document.getElementById('watchlist-container');
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

    if (watchlist.length === 0) {
        watchlistContainer.innerHTML = '<p>Your watchlist is empty.</p>';
        return;
    }

    watchlistContainer.innerHTML = '';

    watchlist.forEach(item => {
        const cardHTML = generateCardHTMLForRemove(item, imgEndpoint);
        watchlistContainer.innerHTML += cardHTML;
    });

    watchlistContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('card-button-two')) {
            const card = event.target.closest('.card');
            if (card) {
                const itemId = card.getAttribute('data-id');
                removeFromWatchlist(itemId);
                card.remove(); 
            }
        }
    });
});

function removeFromWatchlist(itemId) {
    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    watchlist = watchlist.filter(item => item.id !== itemId);
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
}


document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.main-content').classList.add('fade-in');
});

