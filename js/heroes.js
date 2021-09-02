/*Variabele aan header en section meegeven*/
const header = document.querySelector('header');
const section = document.querySelector('section');

/*We slaan de URL van de JSON die we willen ophalen op in een variabele*/ 
let requestURL = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json';
/*Om een ​​aanvraag te maken, moeten we een nieuwe aanvraagobjectinstantie van de XMLHttpRequestconstructor maken met behulp van het newtrefwoord*/
let request = new XMLHttpRequest();
/*Nu moeten we het verzoek openen met behulp van de open()methode*/
request.open('GET', requestURL);
/*Hier stellen we de in responseTypeop JSON, zodat XHR weet dat de server JSON zal retourneren en dat dit achter de schermen moet worden geconverteerd naar een JavaScript-object. Vervolgens sturen we het verzoek met de send()methode*/
request.responseType = 'json';
request.send();

/*Hier wachten we op het antwoord van de server en het handelen we het vervolgens af*/
request.onload = function () {
    const superHeroes = request.response;
    populateHeader(superHeroes);
    showHeroes(superHeroes);
}

/*We geven de parameter de naam 'jsonObj', om ons eraan te herinneren dat dit JavaScript-object afkomstig is van JSON. Hier maken we eerst een <h1> element met createElement(), met textContent zeggen we dat dat gelijk moet zijn aan de 'squadName' uit JSON, dan voeg deze toe aan de header door appendChild() te gebruiken. Vervolgens doen we een zeer vergelijkbare bewerking met een alinea: maak deze, stel de tekstinhoud in en voeg deze toe aan de koptekst. Het enige verschil is dat de tekst is ingesteld op een aaneengeschakelde tekenreeks die zowel de homeTownals formedeigenschappen van het object bevat.*/
function populateHeader(jsonObj) {
    const myH1 = document.createElement('h1');
    myH1.textContent = jsonObj['squadName'];
    header.appendChild(myH1);

    const myPara = document.createElement('p');
    myPara.textContent = 'Hometown: ' + jsonObj['homeTown'] + ' // Formed: ' + jsonObj['formed'];
    header.appendChild(myPara);
}

/*Eerst maken we nieuwe elementen: article, H2, p & ul. Dan geven we de h2 de helden namen mee uit JSON. Daarna geven we de 3 paragrafen informatie mee. Hierna slaan we de power eigenschappen (JSON) op in een nieuwe const en creeeren we een 'li', deze zetten we in een ul. Als laatste zetten we de H2, p, ul's binnen de article en zetten we de article binnen de section*/
function showHeroes(jsonObj) {
    const heroes = jsonObj['members'];

    for (let i = 0; i < heroes.length; i++) {
        const myArticle = document.createElement('article');
        const myH2 = document.createElement('h2');
        const myPara1 = document.createElement('p');
        const myPara2 = document.createElement('p');
        const myPara3 = document.createElement('p');
        const myList = document.createElement('ul');

        myH2.textContent = heroes[i].name;
        myPara1.textContent = 'Secret identity: ' + heroes[i].secretIdentity;
        myPara2.textContent = 'Age: ' + heroes[i].age;
        myPara3.textContent = 'Superpowers:';

        const superPowers = heroes[i].powers;
        for (let j = 0; j < superPowers.length; j++) {
            const listItem = document.createElement('li');
            listItem.textContent = superPowers[j];
            myList.appendChild(listItem);
        }

        myArticle.appendChild(myH2);
        myArticle.appendChild(myPara1);
        myArticle.appendChild(myPara2);
        myArticle.appendChild(myPara3);
        myArticle.appendChild(myList);

        section.appendChild(myArticle);
    }
}