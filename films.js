// Runs on page load
addEventListener('DOMContentLoaded', () => {
    domObjs = {
        title: document.querySelector('h1#title'),
        release: document.querySelector('#release'),
        director: document.querySelector('#director'),
        producer: document.querySelector('#producer'),
        characterSpan: document.querySelector('span#character'),
        characterUl: document.querySelector('ul#charList')
    }
    const sp = new URLSearchParams(window.location.search)
    const id = sp.get('id')
    title.textContent = 'aa';
    fetchAllData(id, domObjs);
  });

const fetchAllData = async (filmId) => {
    try {
        let filmData = await fetchFilm(filmId);
        let charactersData = await fetchCharacters(filmId);
        renderFilm(filmData, charactersData);
    } catch (err) {
        throw err
    }
}

const fetchFilm = async (filmId) => {
    try {
        const filmObj = await fetch(`https://swapi2.azurewebsites.net/api/films/${filmId}`);
        const filmJson = await filmObj.json();
        // console.log(filmJson);
        return filmJson
    } catch (err) {
        throw err;
    }
}

const fetchCharacters = async (filmId) => {
    try {
        const charactersObj = await fetch(`https://swapi2.azurewebsites.net/api/films/${filmId}/characters`);
        const charactersJSON = await charactersObj.json();
        // console.log(charactersJSON);
        return charactersJSON; 
    } catch (err) {
        throw err;
    }
}

const renderFilm = (film, characters, domObjs) => {
    console.log(film.title);
    document.title = `SWAPI - ${film.title}`;  // Just to make the browser tab say their name
    domObjs.title.textContent = film.title;
    domObjs.release.textContent = `Release date: ${film.release_date}`;
    domObjs.director.textContent = `Director: ${film.director}`;
    domObjs.producer.textContent = `Producer: ${film.producer}`;
    const charLis = characters.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
    domObjs.characterUl.innerHTML = charLis.join("");
  }