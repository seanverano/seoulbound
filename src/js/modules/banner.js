// Importing API Key and Image Endpoint from the config module

import { apiKey } from '../modules/config.js';

// This endpoint is different from the original as it uses HD images for the banner

const imgEndpoint = 'https://image.tmdb.org/t/p/original';

const dramaTitles = [
    'Pachinko',
    'Crash Landing on You',
    'All Of Us Are Dead',
    'Sky Castle',
    'Queen of Tears',
    'DP',
    'Goblin',
    'Reply 1988',
    'My Love From Another Star',
    'Vincenzo',
    'Stairway To Heaven',
];

let currentDramaIndex = 0;

// This function fetches the k-dramas that I choose to display in the banner at the top of the homepage

async function fetchKoreanDramas() {
    try {
        const promises = dramaTitles.map(async (title) => {
            const url = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${encodeURIComponent(title)}&with_original_language=ko`;
            const response = await fetch(url);
            return response.json();
        });

        const results = await Promise.all(promises);
        const dramas = results.map(result => result.results[0]).filter(Boolean);
        initializeBannerCarousel(dramas);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// this handles the banner fading transition

function initializeBannerCarousel(dramas) {
    const container = document.querySelector('.banner-content');
    let fadeDuration = 4000; 

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
            <p>${new Date(drama.first_air_date).getFullYear()}</p>
        `;
        
        container.innerHTML = ''; 
        container.appendChild(img);
        container.appendChild(infoOverlay);

        setTimeout(() => {
            img.classList.add('active');
            infoOverlay.classList.add('active');
        }, 10); 

        const existingElements = container.querySelectorAll('.banner-image, .banner-info');
        existingElements.forEach(element => {
            if (!element.classList.contains('active')) {
                element.classList.remove('active');
                setTimeout(() => {
                    container.removeChild(element);
                }, fadeDuration); 
            }
        });
    }

    function nextDrama() {
        currentDramaIndex = (currentDramaIndex + 1) % dramas.length;
        displayCurrentDrama();
    }

    displayCurrentDrama(); 
    setInterval(nextDrama, 4000); 
}

document.addEventListener('DOMContentLoaded', fetchKoreanDramas);
