document.addEventListener('DOMContentLoaded', function() {
    const watchlistContainer = document.getElementById('watchlist-container');
    const imgEndpoint = 'https://image.tmdb.org/t/p/w500'; // Adjust this if needed
    
    // Retrieve watchlist from localStorage
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    
    // Render watchlist items
    watchlist.forEach(item => {
        const cardHTML = `
            <div class="card" data-id="${item.id}">
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
        watchlistContainer.insertAdjacentHTML('beforeend', cardHTML);
    });
});