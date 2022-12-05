const Key = "ff5ebc6d1c0e486e9c2dcf48fc3adfb6";

Details();

async function Details() {
  const urlParams = new URLSearchParams(location.search);
  let Id = urlParams.get('search')

  if (!Id) return;

  SearchFunction(Id);
}

async function SearchFunction(gameId) {
  let gamesFound;

  try {
    const results = await fetch(`https://api.rawg.io/api/games?key=${Key}&search=${gameId}`);
    const data = await results.json();
    gamesFound = data.results;
    if (gamesFound.length == 0) {
      return GameNotFound();
    }
    LoadGameSearched(gamesFound);
  } catch (e) {
    console.log(e);
    return GameNotFound();
  }
}

async function LoadGameSearched(gSearched) {
  let cards = `
  <div class="textresult">
      <h1>Resultados de busca</h1>
    </div>
    `

  for (let i = 0; i < 10; i++) {
    cards += `
    <div class="card" style="width: 18rem;">
      <img src="${gSearched[i].background_image}" class="card-img-top" alt="${gSearched[i].name}">
      <div class="card-body">
        <h5 class="card-title">${gSearched[i].name}</h5>
      </div>
      <div class="card-body">
        <a href="detalhes.html?id=${gSearched[i].id}" class="btn btn-secondary">Mais detalhes</a>
      </div>
    </div>
    `
  }
  document.getElementById("container-results").innerHTML = cards;
  console.log("ok")
}

async function GameNotFound() {
  let text = `
  <div class="textresult">
      <h1>Não foram encontrados resultados</h1>
    </div>
    `;
  document.getElementById("container-results").innerHTML = text;
}

async function BackTo() {
  window.location.href = "index.html"
}