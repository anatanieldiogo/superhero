//HERO TAMBNAIL

//random number to search by id between(0, 732)
function randomNumber() {
    var random = Math.floor((Math.random() * 732) + 1);
    return random;
}

//Make carousel without load the loading icon
function getHeoresNoLoad() {
    $('.loading-tamb-hero').css('display', 'none')

    $.ajax({
        type: "GET",
        url: "https://www.superheroapi.com/api.php/2920044964974186/" + randomNumber(),
        dataType: 'json',
        success: function (result) {
            showheroTamb(result);
        }
    });
}

//On page load, first show the load icon after, show the hero tambnail
function getHeores() {
    $('.loading-tamb-hero').css('display', 'flex')

    $.ajax({
        type: "GET",
        url: "https://www.superheroapi.com/api.php/2920044964974186/" + randomNumber(),
        dataType: 'json',
        success: function (result) {
            $('.loading-tamb-hero').css('display', 'none')
            showheroTamb(result);
            setInterval(function () {
                getHeoresNoLoad()
            }, 7000)
        }
    });
}
getHeores()

//ALIGNMENT - CHANGE THE ALIGNMENT COLOR
function alignment(alignment) {

    var color;

    if (alignment == 'bad') {
        color = 'background-color:#ed4c78;color:#ffa6b5;';
    } else if (alignment == 'neutral') {
        color = 'background-color:#ffbf36;color:#ffe2a6;';
    }
    return color;
}

//SHOW/RENDER TAMBNAIL
function showheroTamb(hero) {

    $('.add-blur').html(`
        <div class="hero-banner blur" data-panel="1" data-name="${hero.name}" data-id="${hero.id}" onclick="getHero(this)" title="${hero.biography['full-name']}">
            <div class="hero-banner-left">
                <span id="hero-status" style="${alignment(hero.biography['alignment'])}">${hero.biography['alignment']}</span>
                <h1>${shorText(hero.biography['full-name'], 15)}</h1>
                <h2>${hero.name}</h2>
                <span id="bn-power">Power: ${hero.powerstats['power']}</span>
            </div>
            <div class="hero-banner-right">
                <img src="${hero.image['url']}" alt="${hero.name}">
                <img src="${hero.image['url']}" alt="${hero.name}" class="hero-shadow">
            </div>
        </div>
    `);
}

//RANDOM CHAR(from a to z) TO SEARCH HERO BY NAME, THIS API DOESN'T HAVE ANY ENDPOINT TO GET ALL HERO SO I DID THAT
const random = (length = 8) => {
    // Declare all characters
    let chars = 'abcdefghijklmnopqrstuvwxyz';

    // Pick characers randomly
    let str = '';
    for (let i = 0; i < length; i++) {
        str += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return str;

};

//GETTING ALL HEROES THAT MATCH WITH RAMDOM CHAR
function getAllHeroes() {
    $('.loading-heroes').css('display', 'flex')
    $.ajax({
        type: "GET",
        url: "https://www.superheroapi.com/api.php/2920044964974186/search/" + random(1),
        dataType: 'json',
        success: function (result) {
            $('.loading-heroes').css('display', 'none')
            result.results.forEach(element => {
                $('.heroes-content').append(allHeroes(element));
            });
        }
    });
}
getAllHeroes()

//SHOW/RENDERING ALL HEROES
function allHeroes(hero) {
    //ALL HEROES
    var renderedCard = document.createElement('DIV');
    renderedCard.innerHTML = `
        <div class="heroes-name click" title="${hero.biography['full-name']} - ${hero.name}" data-name="${hero.name}" data-id="${hero.id}" data-panel="1" onclick="getHero(this)">
            <div class="hero-name">
                <img src="${hero.image['url']}" alt="${hero.name}">
                <div>
                    <h2>${shorText(hero.biography['full-name'], 10)}</h2>
                    <p>${hero.name}</p>
                </div>
            </div>
            <span title="publisher">${hero.biography['publisher']}</span>
        </div>
    `;
    return renderedCard;
}

//REDUCE THE HERO NAME AND ADD "..."
function shorText(textComplete, size) {
    let texto = textComplete
    let limit = size
    let tempText = "";

    if (texto.length > limit) {
        for (let i = 0; i < limit; i++) {
            tempText += texto[i];
        }
        return tempText += "...";
    } else {
        return tempText = texto
    }
}



//----------SEARCH SYSTEM----------------

//SEARCH HEROES BY NAME
let timeout = null;

$('.hero-search').on("keyup input", function () {
    $('.search-form span').css('display', 'flex')
    $('.search-results').css("display", "block");
    $('.search-res-item').remove();
    $('.search-res-error').remove();
    $('.search-results').html("<div class='loading'><img src='img/spinner.svg' alt='spinner'></div>");


    clearTimeout(timeout);
    const query = $(this).val();

    if ($(this).val() !== '') {
        timeout = setTimeout(function () {
            $.ajax({
                type: "GET",
                url: "https://www.superheroapi.com/api.php/2920044964974186/search/" + query,
                dataType: 'json',
                success: function (result) {
                    if (result.response != 'error') {
                        result.results.forEach(element => {
                            $('.search-results').append(getHtml(element));
                        });
                    } else {
                        $('.search-results').append(getError(result));
                    }
                    $('.loading').remove();
                }
            });
        }, 1000);
    }

    if ($(this).val() == '') {
        $('.search-results').css("display", "none");
        $('.search-form span').css('display', 'none')
    }
});

//SHOW/RENDER HEROES RESULTS
function getHtml(data) {
    // Card container heroes
    var renderedCard = document.createElement('DIV');

    renderedCard.innerHTML = `
    <div class="search-res-item" data-panel="1" data-name="${data.name}" data-id="${data.id}" onclick="getHero(this)">
        <img src="${data.image['url']}" alt="${data.name}">
        <div class="search-res-text">
            <h5>${data.name}</h5>
            <p>${data.biography['publisher']}</p>
        </div>
    </div>
`
    return renderedCard;
}

//SHOW MESSAGE IF HERO NOT FOUND
function getError(data) {
    var renderedCard = document.createElement('DIV');

    renderedCard.innerHTML = `
    <div class="search-res-error">
        <span>${data.error}</span>
    </div>
`
    return renderedCard;
}


//--------------GO TO HERO INFORMATION AFTER SEARCH--------------------------

//GET HERO INFORMATION WHEN CLICKED
function getHero(that) {
    $('.search-results').css('display', 'none')
    $('.hero-search').val($(that).attr('data-name'))
    $('.content-panel').hide();
    $('.loading-hero-info').css('display', 'flex')

    const id = $(that).attr('data-id');


    $.ajax({
        type: "GET",
        url: "https://www.superheroapi.com/api.php/2920044964974186/" + id,
        dataType: 'json',
        success: function (result) {
            $('.loading-hero-info').css('display', 'none')
            $('.content-panel').hide();
            $('.panels-panels').append(getHeroId(result));
        }
    });

    panels($(that).attr('data-panel'))
}

//SHOW/RENDER HERO INFORMATION
function getHeroId(data) {
    var renderedCard = document.createElement('DIV');

    var clss;
    if (JSON.parse(localStorage.getItem(key = data.id))) {
        clss = 'fas'
    }else{
        clss = 'far'
    }

    renderedCard.innerHTML = `
        <div class="content-panel scroll">
        <div class="hero-id">
            <div class="hero-id-header">
                <div class="hero-id-h-left">
                    <span class="hero-save click" data-image="${data.image['url']}" data-panel="1" data-fullName="${data.biography['full-name']}" data-name="${data.name}" data-id="${data.id}" data-power="${data.powerstats['power']}" data-combat=" ${data.powerstats['combat']}" onclick="saveHero(this)"><i class="${clss} fa-heart"></i></span>
                    <img src="${data.image['url']}" alt="${data.name}">
                    <img src="${data.image['url']}" alt="${data.name}" class="hero-id-img-back">
                </div>
                <div class="hero-id-h-right">
                    <h2 title="Name">${data.name}</h2>
                    <p id="hero-full-name" title="Full name">${data.biography['full-name']}</p>
                    <p class="colored" title="Alter egos">${data.biography['alter-egos']}</p>
                    <div>
                        <span title="Alignment" style="${alignment(data.biography['alignment'])}">${data.biography['alignment']}</span>
                        <span title="Publisher">${data.biography['publisher']}</span>
                    </div>
                    <p title="Place of birth">${data.biography['place-of-birth']}</p>
                    <p id="colored" title="First appearance">${data.biography['first-appearance']}</p>
                </div>
            </div>
            <div class="hero-id-doby">
                <h2 class="hero-title-2">Aliases</h2>
                <ul>
                    <li><i class="fas fa-signature"></i> ${data.biography['aliases']}</li>
                </ul>
                <h2 class="hero-title-2">Appearance</h2>
                <div class="hero-id-two">
                    <ul>
                        <li title="gender"><i class="fas fa-venus-mars"></i> ${data.appearance['gender']}</li>
                        <li title="race"><i class="fas fa-fingerprint"></i> ${data.appearance['race']}</li>
                    </ul>
                    <ul>
                        <li title="height"><i class="fas fa-male"></i> ${data.appearance['height'][1]}</li>
                        <li title="weight"><i class="fas fa-weight-hanging"></i> ${data.appearance['weight'][1]}</li>
                    </ul>
                    <ul>
                        <li title="Eye color"><i class="fas fa-eye"></i> ${data.appearance['eye-color']}</li>
                        <li title="Hair color"><i class="fas fa-bowling-ball"></i> ${data.appearance['hair-color']}</li>
                    </ul>
                </div>
                <h2 class="hero-title-2">Work</h2>
                <ul>
                    <li title="Occupation"><i class="fas fa-briefcase"></i> ${data.work['occupation']}</li>
                    <li title="Base"><i class="fas fa-map-marker-alt"></i> ${data.work['base']}</li>
                </ul>
                <h2 class="hero-title-2">connections</h2>
                <ul>
                    <li title="group-affiliation"><i class="fas fa-users"></i> ${data.connections['group-affiliation']}</li>
                    <li title="relatives"><i class="fas fa-user-friends"></i> ${data.connections['relatives']}</li>
                </ul>
                <h2 class="hero-title-2">powerstats</h2>
                <div class="hero-id-powers">
                    <p>intelligence</p>
                    <div class="hero-power-base">
                        <div class="hero-power-count" style="width: ${data.powerstats['intelligence']}%;"></div>
                        <span>${data.powerstats['intelligence']}%</span>
                    </div>
                    <p>strength</p>
                    <div class="hero-power-base">
                        <div class="hero-power-count" style="width: ${data.powerstats['strength']}%;"></div>
                        <span>${data.powerstats['strength']}%</span>
                    </div>
                    <p>speed</p>
                    <div class="hero-power-base">
                        <div class="hero-power-count" style="width: ${data.powerstats['speed']}%;"></div>
                        <span>${data.powerstats['speed']}%</span>
                    </div>
                    <p>durability</p>
                    <div class="hero-power-base">
                        <div class="hero-power-count" style="width: ${data.powerstats['durability']}%;"></div>
                        <span>${data.powerstats['durability']}%</span>
                    </div>
                    <p>power</p>
                    <div class="hero-power-base">
                        <div class="hero-power-count" style="width: ${data.powerstats['power']}%;"></div>
                        <span>${data.powerstats['power']}%</span>
                    </div>
                    <p>combat</p>
                    <div class="hero-power-base">
                        <div class="hero-power-count" style="width: ${data.powerstats['combat']}%;"></div>
                        <span>${data.powerstats['combat']}%</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
 `
    return renderedCard;
}


//CHANGE PANEL BY PANEL INDEX
var tabPanels = document.querySelectorAll(".content .content-panel");

function panels(panelIndex) {

    tabPanels.forEach(function (node) {
        $('.content-panel').hide();
        node.style.display = "none";
    })

    tabPanels[panelIndex].style.display = "block";
}
panels(0)


//SAVE HERO TO LOCALSTORAGE

function saveHero(that) {
    const id = $(that).attr('data-id')
    const name = $(that).attr('data-name')
    const fullName = $(that).attr('data-fullName')
    const panel = $(that).attr('data-panel')
    const image = $(that).attr('data-image')
    const power = $(that).attr('data-power')
    const combat = $(that).attr('data-combat')

    const hero = {
        id: id,
        name: name,
        fullName: fullName,
        image: image,
        panel: panel,
        power: power,
        combat: combat,
    };

    if (JSON.parse(localStorage.getItem(key = id))) {
        removeSave(id)
        Toast.show('Hero successfully removed', 'danger')
    } else {
        Toast.show('Hero successfully saved')
        // convert object to JSON string
        // using JSON.stringify()
        const jsonObj = JSON.stringify(hero);
        // save to localStorage
        localStorage.setItem(id, jsonObj);
    }

    getSavedHero()
}

function getSavedHero() {

    $('.hero-most').remove()
    Object.keys(localStorage).forEach((key) => {

        var saved = JSON.parse(localStorage.getItem(key));
        $('.hero-most-content').append(renderSaved(saved));
    });

}
getSavedHero()

function renderSaved(saved) {

    var renderedCard = document.createElement('DIV');

    renderedCard.innerHTML = `
                <div class="hero-most click" title="${saved.name}" data-panel="${saved.panel}" data-name="${saved.name}" data-id="${saved.id}" onclick="getHero(this)">
                    <img src="${saved.image}" alt="${saved.name}">
                    <h2>${saved.name}</h2>
                    <p title="Combat / Power">${saved.combat} / ${saved.power}</p>
                </div>
    `
    return renderedCard;
}

//REMOVE AN ITEM FROM LOCALSTORAGE
function removeSave(id) {
    localStorage.removeItem(id);
    //localStorage.clear(); CLEAR ALL LOCALSTORAGE ITEMS
}