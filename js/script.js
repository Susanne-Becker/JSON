/*Variabele aan header en section meegeven*/
const header = document.querySelector('header');
const section = document.querySelector('section');

/*We slaan de URL van de JSON die we willen ophalen op in een variabele*/ 
let requestURL = 'https://koopreynders.github.io/frontendvoordesigners/opdracht3/json/movies.json';
/*Om een ​​aanvraag te maken, moeten we een nieuwe aanvraagobjectinstantie van de XMLHttpRequestconstructor maken met behulp van het newtrefwoord*/
let request = new XMLHttpRequest();
/*Nu moeten we het verzoek openen met behulp van de open()methode*/
request.open('GET', requestURL);
/*Hier stellen we de in responseTypeop JSON, zodat XHR weet dat de server JSON zal retourneren en dat dit achter de schermen moet worden geconverteerd naar een JavaScript-object. Vervolgens sturen we het verzoek met de send()methode*/
request.responseType = 'json';
request.send();

/*Hier wachten we op het antwoord van de server en het handelen we het vervolgens af*/
request.onload = function () {
    const movie = request.response;
    console.log(movie);
    populateHeader(movie);
    showMovies(movie);
}

/*We geven de parameter de naam 'jsonObj', om ons eraan te herinneren dat dit JavaScript-object afkomstig is van JSON. Hier maken we eerst een <h1> element met createElement(), met textContent zeggen we dat dat gelijk moet zijn aan de 'squadName' uit JSON, dan voeg deze toe aan de header door appendChild() te gebruiken. Vervolgens doen we een zeer vergelijkbare bewerking met een alinea: maak deze, stel de tekstinhoud in en voeg deze toe aan de koptekst. Het enige verschil is dat de tekst is ingesteld op een aaneengeschakelde tekenreeks die zowel de homeTownals formedeigenschappen van het object bevat.*/
function populateHeader() {
    const myH1 = document.createElement('h1');
    myH1.textContent = 'movies';
    header.appendChild(myH1);
}

/*Eerst maken we nieuwe elementen: article, H2, p & ul. Dan geven we de h2 de helden namen mee uit JSON. Daarna geven we de 3 paragrafen informatie mee. Hierna slaan we de power eigenschappen (JSON) op in een nieuwe const en creeeren we een 'li', deze zetten we in een ul. Als laatste zetten we de H2, p, ul's binnen de article en zetten we de article binnen de section*/
function showMovies(jsonObj) {
    const info = jsonObj; 
    console.log(info);
    for (let i = 0; i < info.length; i++) { //For loop. Eerst i = 0. Dan i = groter dan de lengte van info (6). Daarna i ++ dus naar volgende movie.
        console.log(info[i]);
        const myArticle = document.createElement('article');
        const myVideo = document.createElement('video');
        const myH2 = document.createElement('h2'); 
        const myH3 = document.createElement('h3');
        const myPara1 = document.createElement('p');
        const myPara2 = document.createElement('p');
        const myPara3 = document.createElement('p');
        const myPara4 = document.createElement('p');
        const myImg = document.createElement('img');
        const mySource = document.createElement('source');
        const myList = document.createElement('ul');

        myH2.textContent = info[i].id; 
        myH3.textContent = info[i].title;
        myPara1.textContent = 'Plot: ' + info[i].plot;
        myPara2.textContent = 'Genre(s): ' + info[i].genres;
        myPara3.textContent = 'Release date: ' + info[i].release_date;
        myImg.src = info[i].cover;
        mySource.src = info[i].trailer;
        mySource.type = "video/mp4";
        myPara4.textContent = 'Actors:';

        const actors = info[i].actors;
        for (let j = 0; j < actors.length; j++) {
            const listItem = document.createElement('li');
            listItem.textContent = actors[j].actor_name;
            myList.appendChild(listItem);
        }
        myArticle.appendChild(myH2); 
        myArticle.appendChild(myH3);
        myArticle.appendChild(myImg); 
        myArticle.appendChild(myPara1);
        myArticle.appendChild(myPara2);
        myArticle.appendChild(myPara3);
        myArticle.appendChild(myPara4);
        myArticle.appendChild(myList);

        myVideo.appendChild(mySource);
        myArticle.appendChild(myVideo);

        section.appendChild(myArticle);
    }
}
