let searchButton = document.querySelector('.search-button');
let resultElement = document.querySelector('.result');
let soundElement = document.querySelector('.sound');
let soundSource = "";

const URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

searchButton.addEventListener('click', function () {
    let wordInput = document.querySelector('.search-input').value.toLowerCase();

    fetch(`${URL}${wordInput}`)
        .then((respone) => {
            return respone.json();
        })
        .then((result) => {
            console.log(result);
            resultElement.innerHTML = `
            <div class="word">
                <h2>${wordInput}</h2>
                <button class="listen">
                    <i class="fa-solid fa-volume-high"></i>
                </button>
            </div>
            <div class="detail">
                <p>${result[0].meanings[0].partOfSpeech}</p>
                <p>${result[0].phonetics[0].text}</p>
            </div>

            <p class="word-meaning">${result[0].meanings[0].definitions[0].definition || ""}</p>
            <p class="word-example">${result[0].meanings[0].definitions[0].example || ""}</p>
            `
            soundSource = result[0].phonetics[0].audio;

            let listenElement = document.querySelector('.listen');
            soundElement.setAttribute('src', soundSource);

            listenElement.addEventListener('click', function () {
                soundElement.play();
            })
        })
        .catch(() => {
            resultElement.innerHTML = `
                <div class="error">
                    <h1>ERROR !!!</h1>
                </div>
            `
        });
});


