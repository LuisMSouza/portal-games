const Key = "ff5ebc6d1c0e486e9c2dcf48fc3adfb6";

Details();

async function Details() {
    const urlParams = new URLSearchParams(location.search);
    let gameId = parseInt(urlParams.get('id'))

    if (!gameId) return;

    loadInfos(gameId);
}

async function loadInfos(gameId){
  try{
    const result = await fetch(`https://api.rawg.io/api/games/${gameId}?key=${Key}`);
    const data = await result.json();

    setDetails(data)
  }catch(error) {
    console.log(error)
  }
}

function setDetails(response) {
  let info = `
    <div class="media-insert">
    <img src="${response.background_image}" alt="${response.name}" width="80%">
    <h2>${response.name}</h2>
    <h5 style="color: blue;">Sobre: </h5><p>${response.description}</p>
    <h5 style="color: blue;">Data de Lançamento: </h5><p>${response.released}</p>
    <h5 style="color: blue;">Plataformas: </h5><p>${response.platforms.map(platform => " " + (platform.platform.name) )}</p>
    <h5 style="color: blue;">Avaliação</h5><p>${response.rating}</p>
    </div>
  `
  document.getElementById('container-details').innerHTML = info;
}

async function BackTo() {
  window.location.href = "index.html"
}