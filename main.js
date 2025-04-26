"use strict";

class MovieSearch {
  constructor() {
    this.apiKey = "e03ea455";
    this.mainContainer = document.querySelector("main");
    this.initSearch();
  }

  initSearch() {
    this.findElement();
    this.addListeners();
  }
  createElements(title, year, genre, type, img, plot) {
    const wrapFilm = document.createElement("div");
    wrapFilm.className =
      "bg-white rounded-lg shadow p-4 flex flex-col items-center";
    this.mainContainer.appendChild(wrapFilm);

    const poster = document.createElement("img");
    poster.className = "w-full h-auto mb-4 rounded";
    poster.src = `${
      img !== "N/A"
        ? img
        : "https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
    }`;
    poster.alt = `Постер фільму: ${title}`;
    wrapFilm.appendChild(poster);

    const movieTitle = document.createElement("h2");
    movieTitle.className = "text-xl font-semibold mb-2 text-center";
    movieTitle.textContent = title;
    wrapFilm.appendChild(movieTitle);

    const movieYear = document.createElement("div");
    movieYear.className = "text-gray-600 mb-1";
    movieYear.textContent = `Рік: ${year}`;
    wrapFilm.appendChild(movieYear);

    const movieGenre = document.createElement("div");
    movieGenre.className = "text-gray-600";
    movieGenre.textContent = `Жанр: ${genre}`;
    wrapFilm.appendChild(movieGenre);

    const movieType = document.createElement("div");
    movieType.className = "text-gray-600";
    movieType.textContent = `Тип: ${type}`;
    wrapFilm.appendChild(movieType);

    const moviePlot = document.createElement("div");
    moviePlot.className = "text-gray-600";
    moviePlot.textContent = `Тип: ${plot}`;
    wrapFilm.appendChild(moviePlot);
  }

  findElement() {
    const input = document.getElementById("searchFilm");
    this.input = input;
  }

  addListeners() {
    this.input.addEventListener("input", () => {
      const query = this.input.value.trim();
      this.mainContainer.innerHTML = "";
      console.log(query);
      this.requestAPI(query);
    });
  }

  async requestAPI(clientRequest) {
    const urlInfo = `https://www.omdbapi.com/?apikey=${this.apiKey}&s=${clientRequest}`;
    // const urlPoster = `http://img.omdbapi.com/?apikey=${this.apiKey}`;

    try {
      // const responsePoster = await fetch(urlPoster);
      const response = await fetch(urlInfo);
      if (!response.ok) {
        throw new Error("Помилка мережі");
      }
      const data = await response.json();
      // const poster = await responsePoster.json();
      if (data.Response === "True") {
        console.log("Знайдено фільм:", data);
        data.Search.forEach((el) => {
          this.createElements(
            el.Title,
            el.Year,
            el.Genre,
            el.Type,
            el.Poster,
            el.Plot
          );
        });
      } else {
        console.log("Фільм не знайдено:", data.Error);
      }
    } catch (error) {
      console.error("Виникла помилка:", error);
    }
  }
}

const MovieSearcher1 = new MovieSearch();

/* <div class="bg-white rounded-lg shadow p-4 flex flex-col items-center">
      <img src="https://via.placeholder.com/200x300" alt="Постер фільму" class="w-full h-auto mb-4 rounded">
      <h2 class="text-xl font-semibold mb-2 text-center">Назва фільму</h2>
      <p class="text-gray-600 mb-1">Рік: 2024</p>
      <p class="text-gray-600">Тип: Фільм</p>
    </div> */
