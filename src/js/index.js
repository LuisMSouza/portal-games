const Key = "ff5ebc6d1c0e486e9c2dcf48fc3adfb6";
var games;
var publishers;
var platforms;
var lancamentos;

GetResponse();
Publishers();
Platforms();
Lancamentos();

async function GetResponse() {
  try {
    const response = await fetch(`https://api.rawg.io/api/games?key=${Key}`);
    const data = await response.json();
    games = await data.results;
    let texto;
    for (let i = 0; i < 1; i++) {
      const getData = await fetch(`https://api.rawg.io/api/games/${games[i].id}?key=${Key}`);
      const data2 = await getData.json();
      let imagem = games[i].background_image;
      let titulo = games[i].name;
      let released = games[i].released;
      texto += `<div class="img-dest">
        <img src="${imagem}" width="80%"
          style="border: white solid 1px;">
        <h3>${titulo}</h3>
        <h5>Data de lançamento: ${released}</h5>
      </div>`
    }
    document.getElementById("destaques").innerHTML = texto;
  } catch (error) {
    return console.log(error);
  }
}

async function Publishers() {
  try {
    const result = await fetch(`https://api.rawg.io/api/publishers?key=${Key}`);
    const data = await result.json();
    publishers = data.results;

    PublishersSection();
  } catch (error) {

    throw new Error("Não foi possível obter os dados")
  }
}

async function Lancamentos() {
  try {
    const result = await fetch(`https://api.rawg.io/api/games?key=${Key}&dates=2022-01-01,2022-11-13`);
    const data = await result.json();
    lancamentos = data.results;

    LancamentosSection();
  } catch (error) {
    throw new Error("Não foi possível obter os dados")
  }
}

async function Platforms() {
  try {
    const result = await fetch(`https://api.rawg.io/api/platforms?key=${Key}`);
    const data = await result.json();
    platforms = data.results;

    PlatformsSection();
  } catch (error) {
    throw new Error("Não foi possível obter os dados")
  }
}

async function LancamentosSection() {
  let card = "";

  for (let i = 0; i < 3; i++) {
    console.log
    card += `
        <div class="card" style="width:360px">
          <img class="card-img-top" src="${lancamentos[i].background_image}" alt="Card image">
          <h4 class="title-games">${lancamentos[i].name}</h4>
          <div class="card-body">
            <a href="detalhes.html?id=${lancamentos[i].id}" class="btn btn-secondary" style="margin-left: 30%;">+ Mais detalhes</a>
          </div>
        </div>
    `
  }

  document.querySelector('.cards-destaque').innerHTML = card;
}

async function PlatformsSection() {
  let card = "";

  for (let i = 0; i < 3; i++) {
    card += `
    <div class="card" style="width:360px">
      <img class="card-img-top" src="${platforms[i].image_background}" alt="Card image">
      <div class="card-body">
        <h4 class="card-title">${platforms[i].name}</h4>
        <p class="card-text">• Numero de jogos: ${platforms[i].games_count}</p>
        <a class="more-information" href="platforms.html?id=${platforms[i].id}">Mais informações</a>
      </div>
    </div>
    `
  }

  document.querySelector('.platfm').innerHTML = card;
}

async function PublishersSection() {
  let card = "";

  for (let i = 0; i < 3; i++) {
    card += `
            <div class="card" style="width:360px">
                <img class="card-img-top" src="${publishers[i].image_background}" alt="Card image">
                <div class="card-body">
                    <h4 class="card-title">${publishers[i].name}</h4>
                    <p class="card-text">• Numero de jogos: ${publishers[i].games_count}</p>
                    <a class="more-information" href="publishers.html?id=${publishers[i].id}">Mais informações</a>
                </div>
            </div>
    `
  }

  document.querySelector('.pubdiv').innerHTML = card;
}

function loadMoreGames() {
  let cards = "";

  for (let i = 3; i <= 11; i++) {
    cards += `
        <div class="card" style="width:360px">
          <img class="card-img-top" src="${lancamentos[i].background_image}" alt="Card image">
          <h4 class="title-games">${lancamentos[i].name}</h4>
          <div class="card-body">
            <a href="detalhes.html?id=${lancamentos[i].id}" class="btn btn-secondary" style="margin-left: 30%;">+ Mais detalhes</a>
          </div>
        </div>
    `
  }

  document.getElementById('buttonMoreLanc').disabled = true;
  document.querySelector('.cards-destaque').innerHTML += cards;
}

function loadMorePlatforms() {
  let cards = "";

  for (let i = 3; i <= 7; i++) {
    cards += `
        <div class="card" style="width:360px">
          <img class="card-img-top" src="${platforms[i].image_background}" alt="Card image">
          <h4 class="title-games">${platforms[i].name}</h4>
          <div class="card-body">
            <a href="platforms.html?id=${platforms[i].id}" class="btn btn-secondary" style="margin-left: 30%;">+ Mais detalhes</a>
          </div>
        </div>
    `
  }

  document.getElementById('buttonMorePlat').disabled = true;
  document.querySelector('.platfm').innerHTML += cards;
}

function loadMorePublishers() {
  let cards = "";

  for (let i = 3; i <= 7; i++) {
    cards += `
        <div class="card" style="width:360px">
          <img class="card-img-top" src="${publishers[i].image_background}" alt="Card image">
          <h4 class="title-games">${publishers[i].name}</h4>
          <div class="card-body">
            <a href="publishers.html?id=${publishers[i].id}" class="btn btn-secondary" style="margin-left: 30%;">+ Mais detalhes</a>
          </div>
        </div>
    `
  }

  document.getElementById('buttonMorePubl').disabled = true;
  document.querySelector('.pubdiv').innerHTML += cards;
}

async function Search() {
  const gameSearched = document.getElementById("searchBox").value;
  if (!gameSearched) return;
  window.location.href = `searched.html?search=${gameSearched}`
}