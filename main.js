const apiKey = 'b3a643714b4535e159b5129c5a6e8180';
const imgEndpoint = 'https://image.tmdb.org/t/p/w500';

function fetchKoreanContent(category, sortBy, containerClass) {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_original_language=ko&sort_by=${sortBy}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayContent(data.results, containerClass);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayContent(items, containerClass) {
    const container = document.querySelector(`.${containerClass}`);
    container.innerHTML = '';

    items.forEach(item => {
        const cardHTML = `
            <div class="card">
                <img src="${item.poster_path ? imgEndpoint + item.poster_path : 'https://via.placeholder.com/500x750'}" alt="${item.title}">
                <div class="card-content">
                    <h3>${item.title}</h3>
                    <p>${new Date(item.release_date).getFullYear()} • ${item.genre_ids.join(', ')}</p>
                </div>
            </div>
        `;
        container.innerHTML += cardHTML;
    });
}


fetchKoreanContent('Popular', 'popularity.desc', 'drama-cards-popular');
fetchKoreanContent('Newest', 'release_date.desc', 'drama-cards-newest');
