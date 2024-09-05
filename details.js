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
                <h2 class="show-title">${data.name}</h2>
                <p class="details-container"><strong>Description:</strong> ${data.overview}</p>
                <p class="details-container"><strong>Genres:</strong> ${data.genres.map(genre => genre.name).join(', ')}</p>
                <p class="details-container"><strong>Airing Date:</strong> ${data.first_air_date}</p>
                <p class="details-container"><strong>Seasons:</strong> ${data.number_of_seasons}</p>
                <p class="details-container"><strong>Episodes:</strong> ${data.number_of_episodes}</p>
                <p class="details-container"><strong>Actors:</strong></p>
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

function setupWatchlistButton() {
    const addToWatchlistBtn = document.getElementById('add-to-watchlist');
    
    if (!addToWatchlistBtn) {
        console.error("Add to Watchlist button not found. This might not be the details page.");
        return;
    }

    console.log("Add to Watchlist button found:", addToWatchlistBtn);

    addToWatchlistBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        try {
            console.log("Retrieving item data...");
            
            // Log each step of data retrieval
            const itemId = addToWatchlistBtn.dataset.showId;
            console.log("Item ID:", itemId);
            
            const titleElement = document.querySelector('.drama-title');
            console.log("Title element:", titleElement);
            const itemName = titleElement?.textContent;
            console.log("Item Name:", itemName);
            
            const posterElement = document.querySelector('.drama-poster');
            console.log("Poster element:", posterElement);
            const itemPoster = posterElement?.src;
            console.log("Item Poster:", itemPoster);
            
            const dateElement = document.querySelector('.drama-release-date');
            console.log("Date element:", dateElement);
            const itemDate = dateElement?.textContent;
            console.log("Item Date:", itemDate);

            if (!itemId) console.error("Missing item ID");
            if (!itemName) console.error("Missing item name");
            if (!itemPoster) console.error("Missing item poster");
            if (!itemDate) console.error("Missing item date");

            if (!itemId || !itemName || !itemPoster || !itemDate) {
                throw new Error("Missing required item data");
            }

            const item = {
                id: itemId,
                name: itemName,
                poster_path: itemPoster.split('/').pop(),
                first_air_date: itemDate
            };

            console.log("Constructed item object:", item);

            // Store the item in localStorage
            let watchlist = [];
            try {
                watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
            } catch (error) {
                console.error("Error parsing existing watchlist:", error);
            }

            watchlist.push(item);

            localStorage.setItem('watchlist', JSON.stringify(watchlist));
            console.log("Updated watchlist:", watchlist);
            alert('Added to watchlist!');
        } catch (error) {
            console.error("Error adding item to watchlist:", error);
            alert('An error occurred while adding to watchlist. Please check the console for more information.');
        }
    });
}

// Function to log all elements on the page (for debugging)
function logPageElements() {
    console.log("All elements on the page:");
    document.querySelectorAll('*').forEach((element, index) => {
        console.log(`${index}: <${element.tagName.toLowerCase()}> ${element.id ? `id="${element.id}"` : ''} ${element.className ? `class="${element.className}"` : ''}`);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    setupWatchlistButton();
    logPageElements();
});
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.main-content').classList.add('fade-in');
});