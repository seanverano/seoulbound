document.addEventListener('DOMContentLoaded', function() {
    const watchlistContainer = document.getElementById('watchlist-container');
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

    if (watchlist.length === 0) {
        watchlistContainer.innerHTML = '<p>Your watchlist is empty.</p>';
        return;
    }

    watchlist.forEach(item => {
        const cardHTML = `
            <div class="card" data-id="${item.id}">
                <img src="${item.poster_path ? item.poster_path : 'https://via.placeholder.com/500x750'}" alt="${item.name}">
            </div>
        `;
        watchlistContainer.innerHTML += cardHTML;
    });
});


document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.main-content').classList.add('fade-in');
});

