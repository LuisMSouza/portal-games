const Key = "ff5ebc6d1c0e486e9c2dcf48fc3adfb6";

Details();

async function Details() {
    const urlParams = new URLSearchParams(location.search);
    let platformId = parseInt(urlParams.get('id'))

    if (!platformId) return;

    loadInfos(platformId);
}

async function loadInfos(platformId){
  try{
    const result = await fetch(`https://api.rawg.io/api/platforms/${platformId}?key=${Key}`);
    const data = await result.json();

    setDetails(data)
  }catch(error) {
    console.log(error)
  }
}

function setDetails(response) {
  let info = `
    <div class="media-insert">
    <img src="${response.image_background}" alt="${response.name}" width="80%">
    <h2>${response.name}</h2>
    <h5 style="color: blue;">Sobre: </h5><p>${response.description}</p>
    <h5 style="color: blue;">Número de jogos: </h5><p>${response.games_count}</p>
    </div>
  `
  document.getElementById('container-details').innerHTML = info;
}

async function BackTo() {
  window.location.href = "index.html"
}