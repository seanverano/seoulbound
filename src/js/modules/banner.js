//Importing API Key and Image Endpoint from the config module

import { apiKey } from '../modules/config.js';

const imgEndpoint = 'https://image.tmdb.org/t/p/original';

const dramaTitles = [
    'Squid Game',
    'Crash Landing on You',
    'Goblin',
    'Queen of Tears',
    'Signal'
];

let currentDramaIndex = 0;

function fetchKoreanDramas() {
    const promises = dramaTitles.map(title => {
        const url = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${encodeURIComponent(title)}&with_original_language=ko`;
        return fetch(url).then(response => response.json());
    });

    Promise.all(promises)
        .then(results => {
            const dramas = results.map(result => result.results[0]).filter(Boolean);
            initializeBannerCarousel(dramas);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function initializeBannerCarousel(dramas) {
    const container = document.querySelector('.banner-content');
    container.innerHTML = ''; 

    function displayCurrentDrama() {
        const drama = dramas[currentDramaIndex];
        
        const img = document.createElement('img');
        img.src = drama.backdrop_path ? `${imgEndpoint}${drama.backdrop_path}` : 'https://via.placeholder.com/1920x1080';
        img.alt = drama.name;
        img.className = 'banner-image';
        
        const infoOverlay = document.createElement('div');
        infoOverlay.className = 'banner-info';
        infoOverlay.innerHTML = `
            <h2>${drama.name}</h2>
            <p>Year: ${new Date(drama.first_air_date).getFullYear()}</p>
            <p>Rating: ${drama.vote_average.toFixed(1)}/10</p>
        `;
        
        container.innerHTML = '';
        container.appendChild(img);
        container.appendChild(infoOverlay);
    }

    function nextDrama() {
        currentDramaIndex = (currentDramaIndex + 1) % dramas.length;
        displayCurrentDrama();
    }

    displayCurrentDrama(); 
    setInterval(nextDrama, 3000); 
}

document.addEventListener('DOMContentLoaded', fetchKoreanDramas);