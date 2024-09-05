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
    const apiKey = 'b3a643714b4535e159b5129c5a6e8180';
    const imgEndpoint = 'https://image.tmdb.org/t/p/w500';
    const detailsUrl = `https://api.themoviedb.org/3/tv/${showId}?api_key=${apiKey}&language=en-US&append_to_response=credits`;

    fetch(detailsUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        })
        .then(data => {
            const detailsHTML = `
                <h2>${data.name}</h2>
                <p><strong>Description:</strong> ${data.overview}</p>
                <p><strong>Genres:</strong> ${data.genres.map(genre => genre.name).join(', ')}</p>
                <p><strong>Airing Date:</strong> ${data.first_air_date}</p>
                <p><strong>Seasons:</strong> ${data.number_of_seasons}</p>
                <p><strong>Episodes:</strong> ${data.number_of_episodes}</p>
                <p><strong>Actors:</strong></p>
        <div class="actor-list">
            ${data.credits.cast.slice(0, 4).map(actor => `
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
