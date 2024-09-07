// This module generates the HTML for the ".card", 
// It adds the image, title, release date (year) and the button

import { imgEndpoint } from '../modules/config.js';

//For main.js, there's an ADD to watchlist button
export const generateCardHTMLForAdd = (item, imgEndpoint) => {
    return `
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
};

//Meanwhile watchlist.js, there's a REMOVE to watchlist button
export const generateCardHTMLForRemove = (item, imgEndpoint) => {
    return `
        <div class="card" data-id="${item.id}">
            <img src="${item.poster_path ? imgEndpoint + item.poster_path : 'https://via.placeholder.com/500x750'}" alt="${item.name}">
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
};
