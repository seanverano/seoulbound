document.addEventListener('DOMContentLoaded', function() {
    const watchlistContainer = document.getElementById('watchlist-container');
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

    if (watchlist.length === 0) {
        watchlistContainer.innerHTML = '<p>Your watchlist is empty.</p>';
        return;
    }

    watchlistContainer.innerHTML = '';

    watchlist.forEach(item => {
        const cardHTML = `
            <div class="card" data-id="${item.id}">
                <img src="${item.poster_path ? item.poster_path : 'https://via.placeholder.com/500x750'}" alt="${item.name}">
                <div class="card-info">
                    <div class="card-info-top">
                        <h3>${item.name}</h3>
                    </div>
                    <div class="card-info-bottom">
                        <p>${new Date(item.first_air_date).getFullYear()}</p>
                        <button class="card-button-two">Remove</button>
                    </div>
                </div>
            </div>
        `;
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

