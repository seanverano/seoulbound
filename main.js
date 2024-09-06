const apiKey = 'b3a643714b4535e159b5129c5a6e8180';
const imgEndpoint = 'https://image.tmdb.org/t/p/w500';

function fetchKoreanTVSeries(category, sortBy, containerClass, filterOngoing = false) {
    const url = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_original_language=ko&sort_by=${sortBy}&include_adult=false&with_genres=18`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const results = filterOngoing ? data.results.filter(item => item.status === 'Returning Series') : data.results;
            displayContent(results.slice(0, 6), containerClass);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function fetchSearchResults(query) {
    const url = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${encodeURIComponent(query)}&language=en-US`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const koreanDramas = data.results.filter(item => item.origin_country.includes('KR'));
            displayContent(koreanDramas.slice(0, 6), 'drama-cards-results');
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayContent(items, containerClass) {
    const container = document.querySelector(`.${containerClass}`);

    if (!container) {
        console.error(`Container with class ${containerClass} not found.`);
        return;
    }

    container.innerHTML = ''; 

    const rowContainer = document.createElement('div');
    rowContainer.className = 'card-row-container';

    for (let i = 0; i < items.length; i += 3) {
        const row = document.createElement('div');
        row.className = 'card-row';

        items.slice(i, i + 3).forEach(item => {
            const cardHTML = `
                <div class="card" data-id="${item.id}">
                    <img src="${item.poster_path ? imgEndpoint + item.poster_path : 'https://via.placeholder.com/500x750'}" alt="${item.name}">
                    <div class="card-info">
                        <div class="card-info-top">
                            <h3>${item.name}</h3>
                        </div>
                        <div class="card-info-bottom">
                            <p>${new Date(item.first_air_date).getFullYear()}</p>
                            <button class="card-button">Add to Watchlist</button>
                        </div>
                    </div>
                </div>
            `;
            row.innerHTML += cardHTML;
        });

        rowContainer.appendChild(row);
    }

    container.appendChild(rowContainer);

    document.querySelectorAll('.card img').forEach(img => {
        img.addEventListener('click', function(event) {
            const target = event.target;
            const card = target.closest('.card');
            
            if (card && (target.matches('img') || target.closest('.card-info-top'))) {
                const showId = card.getAttribute('data-id');
                if (showId) {
                    window.location.href = `details.html?id=${showId}`;
                }
            }
        });
    });   
}

fetchKoreanTVSeries('Trending', 'popularity.desc', 'drama-cards-trending');
fetchKoreanTVSeries('Newest', 'first_air_date.desc', 'drama-cards-newest');

document.querySelector('.search-bar input').addEventListener('input', function() {
    const query = this.value;
    
    const sections = [
        { element: document.querySelector('.drama-cards-results-section'), title: document.querySelector('.section-title-three'), visibleOnSearch: true },
        { element: document.querySelector('.drama-cards-trending'), title: document.querySelector('.section-title'), visibleOnSearch: false },
        { element: document.querySelector('.drama-cards-newest'), title: document.querySelector('.section-title-two'), visibleOnSearch: false }
    ];

    const toggleSectionVisibility = (showResults) => {
        sections.forEach(section => {
            section.element.style.display = (showResults === section.visibleOnSearch) ? 'block' : 'none';
            if (section.title) {
                section.title.style.display = (showResults === section.visibleOnSearch) ? 'block' : 'none';
            }
        });
    };

    if (query.length > 2) {
        toggleSectionVisibility(true);
        fetchSearchResults(query);
    } else {
        toggleSectionVisibility(false);
    }
});




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

