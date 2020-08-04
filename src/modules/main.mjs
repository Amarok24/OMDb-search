/**
  * @description JavaScript demo of async XHR and OMDb API (Open Movie Database).
  * @website https://github.com/Amarok24/OMDb-search
  * @license MPL 2.0
  * @author Jan Prazak
  * @version 1.01
  */

import * as jXhr from "./jXhr.mjs";
import * as jLoader from "./jLoader.mjs";

let cout = console.log;
let cerr = console.error;

let _messages = document.getElementsByTagName("footer")[0];
let _templateFilm = document.getElementById("templateFilm");
let _filmListing = document.getElementById("filmListing");


// The Open Movie Database API http://www.omdbapi.com/
const _omdbURL = "https://www.omdbapi.com/?apikey="
let _apiKey = "";


function outputMessage(text) {
  _messages.innerHTML += text + "<br/>";
  // TODO: for security reasons innerHTML is not good, better: Node.textContent
}

function clearMessages() {
  _messages.innerHTML = "";
}


async function searchFilm(title) {
  let responseData = null;
  const queryString = `${_omdbURL}${_apiKey}&s=${title}`;
  jLoader.showLoader();

  try {
    responseData = await jXhr.sendXhr("GET", queryString, "json");
    outputMessage("Data fetched, OK! Showing max. 10 results in this demo.");
    processData(responseData); // all errors insinde processData will also be catched here
  } catch (error) {
    cerr("catch block here, details: ", error);
    cout(error.Error);
    outputMessage(error.Error);
  } finally {
    jLoader.hideLoader();
  }
}


function processData(data) {
  const imdbLink = "https://www.imdb.com/title/";
  cout(data);

  if (data.Response === "True") {
    outputMessage("Found " + data.totalResults + " results");
  } else {
    outputMessage("data.Response !== True"); // TODO: not clear when this could happen?
    return 1; // end of function
  }


  for (let i=0; i<data.Search.length; i++) {

    let film = document.importNode(_templateFilm.content, true); // true = deep copy
    film.querySelector("h3").textContent = data.Search[i].Title;
    film.querySelector(".filmYear").textContent = "Year: " + data.Search[i].Year;
    film.querySelector(".filmType").textContent = "Type: " + data.Search[i].Type;
    film.querySelector(".filmID").textContent = "OMDB id: " + data.Search[i].imdbID;
    film.querySelector(".filmLink a").href = imdbLink + data.Search[i].imdbID;
    film.querySelector(".filmPoster").src = data.Search[i].Poster;

    _filmListing.append(film);

  }

}


// @desc Loops to remove every lastChild (setting an empty innerHTML is bad)
function removeChildrenOfId(elementId) {
  let myNode = document.getElementById(elementId);
  while (myNode.firstChild) {
    myNode.removeChild(myNode.lastChild);
  }
}


function apiKeySave() {
  localStorage.setItem("omdbKey", _apiKey);
  jLoader.simulateLoading();
}


function apiKeyChanged() {
  _apiKey = document.getElementById("apiKey").value;
}


function submitClick(ev) {
  let filmTitle = document.getElementById("filmTitle").value;
  ev.preventDefault();
  clearMessages();
  removeChildrenOfId("filmListing");
  searchFilm(filmTitle);
}


function main() {
  let submitButton = document.getElementById("submitButton");
  let apiSaveButton = document.getElementById("apiSaveButton");
  let apiKeyField = document.getElementById("apiKey");
  submitButton.addEventListener("click", submitClick);
  apiSaveButton.addEventListener("click", apiKeySave);
  apiKeyField.addEventListener("change", apiKeyChanged);

  if (localStorage.getItem("omdbKey")) {
    _apiKey = localStorage.getItem("omdbKey");
    apiKeyField.value = _apiKey;
  }
}


cout("main.mjs here");
main();



/* 
EXAMPLE OF JSON RESPONSE (before conversion to JS object)

{
    "Search": [
        {
            "Title": "Battlestar Galactica",
            "Year": "2004–2009",
            "imdbID": "tt0407362",
            "Type": "series",
            "Poster": "https://m.media-amazon.com/images/M/MV5BZjBjMjk4YWQtZjY1MC00NTI5LWEwZDMtYWMyYjk2MjkzMThhXkEyXkFqcGdeQXVyNzA5NjUyNjM@._V1_SX300.jpg"
        },
        {
            "Title": "Battlestar Galactica",
            "Year": "2003",
            "imdbID": "tt0314979",
            "Type": "series",
            "Poster": "https://m.media-amazon.com/images/M/MV5BZjJlYzgzOWUtZmJlZi00ZGM4LTliNzctNWFkNThlMDJhZDQxXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
        },
        {
            "Title": "Battlestar Galactica: Razor",
            "Year": "2007",
            "imdbID": "tt0991178",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMTk5MzUxNTYwMF5BMl5BanBnXkFtZTcwNTIyMjU1MQ@@._V1_SX300.jpg"
        },
        {
            "Title": "Battlestar Galactica: The Plan",
            "Year": "2009",
            "imdbID": "tt1286130",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BOTVlOWJhOTItNjliYy00Nzc0LTgxYjAtYTAzMDNmMzBjNzExXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
        },
        {
            "Title": "Battlestar Galactica: Blood & Chrome",
            "Year": "2012",
            "imdbID": "tt1704292",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BM2RiNjA4MzctMGU1MC00MThiLTk4OWUtODI4ZmM4MmU3YTllXkEyXkFqcGdeQXVyMDM0MzU2NA@@._V1_SX300.jpg"
        },
        {
            "Title": "Battlestar Galactica",
            "Year": "1978–1979",
            "imdbID": "tt0076984",
            "Type": "series",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMTY4NzQ5MDAwM15BMl5BanBnXkFtZTgwODU0OTkwMDE@._V1_SX300.jpg"
        },
        {
            "Title": "Battlestar Galactica: The Resistance",
            "Year": "2006–",
            "imdbID": "tt0840800",
            "Type": "series",
            "Poster": "https://m.media-amazon.com/images/M/MV5BM2NiN2M3MmUtOWFiZC00M2ZjLWI0MjEtNWU4NmQwNGM5NGQyXkEyXkFqcGdeQXVyMDM0MzU2NA@@._V1_SX300.jpg"
        },
        {
            "Title": "Battlestar Galactica",
            "Year": "1978",
            "imdbID": "tt0077215",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BYjhhYzBlZjktMmU2Ny00OTIyLThhZjctNTVjMGQxZWQyMzE4XkEyXkFqcGdeQXVyMzU4Nzk4MDI@._V1_SX300.jpg"
        },
        {
            "Title": "Galactica 1980",
            "Year": "1980",
            "imdbID": "tt0080221",
            "Type": "series",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMTk1ODI1Mzg0MV5BMl5BanBnXkFtZTcwODkxMDU1MQ@@._V1_SX300.jpg"
        },
        {
            "Title": "Battlestar Galactica: The Face of the Enemy",
            "Year": "2008–",
            "imdbID": "tt1338724",
            "Type": "series",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMDYwOTU0MjYtZjk0NC00NmM4LWFkZWItYWQxZGE4ZTExNjg0XkEyXkFqcGdeQXVyMDM0MzU2NA@@._V1_SX300.jpg"
        }
    ],
    "totalResults": "41",
    "Response": "True"
}

*/
