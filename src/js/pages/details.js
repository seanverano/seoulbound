//Importing API Key and Image Endpoint from the config module

import { apiKey } from '../modules/config.js';
import { imgEndpoint } from '../modules/config.js';

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const showId = urlParams.get('id');
    if (showId) {
        fetchShowDetails(showId);
    } else {
        console.error('Show ID is missing or invalid.');
    }
});


function fetchShowDetails(showId) {
    const detailsUrl = `https://api.themoviedb.org/3/tv/${showId}?api_key=${apiKey}&language=en-US&append_to_response=credits,videos`;

    fetch(detailsUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        })
        .then(data => {
    
            const trailer = data.videos.results.find(video => video.type === 'Trailer');
            const trailerEmbedUrl = trailer ? `https://www.youtube.com/embed/${trailer.key}` : '';

            const detailsHTML = `
                <h2 class="show-title">${data.name}</h2>
                 ${trailerEmbedUrl ? `
                <div class="trailer-container">
                    <iframe width="560" height="315" src="${trailerEmbedUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>` : ''}
                <p class="details-container"><strong>Description:</strong> ${data.overview}</p>
                <p class="details-container"><strong>Genres:</strong> ${data.genres.map(genre => genre.name).join(', ')}</p>
                <p class="details-container"><strong>Airing Date:</strong> ${data.first_air_date}</p>
                <p class="details-container"><strong>Seasons:</strong> ${data.number_of_seasons}</p>
                <p class="details-container"><strong>Episodes:</strong> ${data.number_of_episodes}</p>
                <p class="details-container"><strong>Actors:</strong></p>
                <div class="actor-list">
                    ${data.credits.cast.slice(0, 5).map(actor => `
                        <div class="actor-card">
                            <img src="${actor.profile_path ? imgEndpoint + actor.profile_path : 'https://via.placeholder.com/150'}" alt="${actor.name}">
                            <p>${actor.name}</p>
                        </div>
                    `).join('')}
                </div>
            `;

            document.querySelector('.tv-show-details').innerHTML = detailsHTML;
        })
        .catch(error => console.error('Error fetching show details:', error));
}

//for fading transition

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.main-content').classList.add('fade-in');
});
