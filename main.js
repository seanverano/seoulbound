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

function displayContent(items, containerClass) {
    const container = document.querySelector(`.${containerClass}`);
    container.innerHTML = ''; 

    const rowContainer = document.createElement('div');
    rowContainer.className = 'card-row-container';

    for (let i = 0; i < items.length; i += 3) {
        const row = document.createElement('div');
        row.className = 'card-row';

        items.slice(i, i + 3).forEach(item => {
            const cardHTML = `
                <div class="card">
                    <img src="${item.poster_path ? imgEndpoint + item.poster_path : 'https://via.placeholder.com/500x750'}" alt="${item.name}">
                    <div class="card-info">
                        <div class="card-info-top">
                            <h3>${item.name}</h3>
                        </div>
                        <div class="card-info-bottom">
                            <p>${new Date(item.first_air_date).getFullYear()}</p>
                        </div>
                    </div>
                </div>
            `;
            row.innerHTML += cardHTML;
        });

        rowContainer.appendChild(row);
    }

    container.appendChild(rowContainer);
}

fetchKoreanTVSeries('Trending', 'popularity.desc', 'drama-cards-trending');

fetchKoreanTVSeries('Newest', 'first_air_date.desc', 'drama-cards-newest');
