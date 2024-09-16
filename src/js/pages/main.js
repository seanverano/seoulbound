//Importing API Key and Image Endpoint from the config module
//Importing the function for generating cards from card module

import { apiKey } from "../modules/config.js";
import { imgEndpoint } from "../modules/config.js";
import { generateCardHTMLForAdd } from "../modules/card.js";

//preloader animation

window.onload = function () {
  setTimeout(function () {
    document.querySelector(".preloader").style.display = "none";
  }, 4000);
};

//hamburger menu at 768px

function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar-mobile");
  sidebar.classList.toggle("open");
}

window.toggleSidebar = toggleSidebar;

//Fetches korean tv shows (kdrama) using TMDB API and only including non-movie, non-variety and non-reality shows.

async function fetchKoreanTVSeries(
  category,
  sortBy,
  containerClass,
  filterOngoing = false
) {
  const url = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_original_language=ko&sort_by=${sortBy}&include_adult=false&with_genres=18`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const results = filterOngoing
      ? data.results.filter((item) => item.status === "Returning Series")
      : data.results;
    displayContent(results.slice(0, 4), containerClass);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

//handles the kdrama that is being populated when using the search bar
//only maximum of of 16 kdrama/cards will be shown using slice
//then the 2nd function displays the kdrama in the assigned container (only 4 items in a row)

async function fetchSearchResults(query) {
  const url = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${encodeURIComponent(
    query
  )}&language=en-US`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const koreanDramas = data.results.filter((item) =>
      item.origin_country.includes("KR")
    );
    displayContent(koreanDramas.slice(0, 16), "drama-cards-results");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function displayContent(items, containerClass) {
  const container = document.querySelector(`.${containerClass}`);

  if (!container) {
    console.error(`Container with class ${containerClass} not found.`);
    return;
  }

  container.innerHTML = "";

  const rowContainer = document.createElement("div");
  rowContainer.className = "card-row-container";

  for (let i = 0; i < items.length; i += 4) {
    const row = document.createElement("div");
    row.className = "card-row";

    items.slice(i, i + 4).forEach((item) => {
      const cardHTML = generateCardHTMLForAdd(item, imgEndpoint);
      row.innerHTML += cardHTML;
    });

    rowContainer.appendChild(row);
  }

  container.appendChild(rowContainer);

  // When user click an image/poster, it will redirect you to the details page

  document.querySelectorAll(".card img").forEach((img) => {
    img.addEventListener("click", function (event) {
      const target = event.target;
      const card = target.closest(".card");

      if (card && (target.matches("img") || target.closest(".card-info-top"))) {
        const showId = card.getAttribute("data-id");
        if (showId) {
          window.location.href = `details.html?id=${showId}`;
        }
      }
    });
  });
}

//fetching the 12 kdrama shown in the homepage by top rated, trending/popularity and upcoming/newest

fetchKoreanTVSeries("Trending", "popularity.desc", "drama-cards-trending");
fetchKoreanTVSeries("Newest", "first_air_date.desc", "drama-cards-newest");
fetchKoreanTVSeries("Top Rated", "vote_average.desc", "drama-cards-top-rated");

//This handles the visibility of the top rated, trending and newest category's visibility when using the search bar

document
  .querySelector(".search-bar input")
  .addEventListener("input", function () {
    const query = this.value;

    const sections = [
      {
        element: document.querySelector(".drama-cards-results-section"),
        title: document.querySelector(".section-title-three"),
        visibleOnSearch: true,
      },
      {
        element: document.querySelector(".drama-cards-trending"),
        title: document.querySelector(".section-title"),
        visibleOnSearch: false,
      },
      {
        element: document.querySelector(".drama-cards-newest"),
        title: document.querySelector(".section-title-two"),
        visibleOnSearch: false,
      },
      {
        element: document.querySelector(".drama-cards-top-rated"),
        title: document.querySelector(".section-title-four"),
        visibleOnSearch: false,
      },
    ];

    const toggleSectionVisibility = (showResults) => {
      sections.forEach((section) => {
        section.element.style.display =
          showResults === section.visibleOnSearch ? "block" : "none";
        if (section.title) {
          section.title.style.display =
            showResults === section.visibleOnSearch ? "block" : "none";
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

//This handles the adding of k-dramas to watchlist
//An alert msg will be shown once the adding of the item is successful
//if it's already added then a new alert msg will be shown

document.addEventListener("DOMContentLoaded", function () {
  document.body.addEventListener("click", function (event) {
    if (event.target.classList.contains("card-button")) {
      const card = event.target.closest(".card");
      if (card) {
        const item = {
          id: card.getAttribute("data-id").toString(),
          name: card.querySelector("h3").textContent,
          poster_path: card.querySelector("img").src,
          first_air_date: card.querySelector(".card-info-bottom p").textContent,
        };

        let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
        if (!watchlist.some((watchedItem) => watchedItem.id === item.id)) {
          watchlist.push(item);
          localStorage.setItem("watchlist", JSON.stringify(watchlist));
          alert("Added to watchlist!");
        } else {
          alert("Item already in watchlist.");
        }
      }
    }
  });
});

//for fading transition

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".main-content").classList.add("fade-in");
});
