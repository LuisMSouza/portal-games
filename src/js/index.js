const Key = "ff5ebc6d1c0e486e9c2dcf48fc3adfb6";
var games;

GetResponse();

async function GetResponse() {
    try {
        const response = await fetch(`https://api.rawg.io/api/games?key=${Key}`);
        const data = await response.json();
        games = await data.results;
        // games.sort((a, b) => b.rating - a.rating);
        SelectGame();
    } catch (error) {
        return console.log(error);
    }
}

async function SelectGame() {
    let texto;
    for (let i = 0; i < 3; i++) {
        let imagem = games[i].background_image;
        let titulo = games[i].name;
        let avaliacao = games[i].rating;
        let released = games[i].released;
        texto += `
      <div class="carousel-item">
        <img src="${imagem}" alt="${titulo}">
        <div class="text-item-carousel">
          <h2 class="subtitle-carousel">${titulo}</h2>
          <b style="color: blue;">Sobre: </b>
          <p class="sub1">teste</p>
          <p class="sub2"><b style="color: blue;">Publisher: </b>${games[i].publisher}</p>
          <p class="sub3"><b style="color: blue;">Lançamento: </b>${released}</p>
          <p class="sub4"><b style="color: blue;">Plataformas: </b>${games[i].platforms.map(platform => " " +
            (platform.platform.name))}</p>
          <p class="sub5"><b style="color: blue;">Gênero: </b></p>
          <p class="sub6"><b style="color: blue;">Avaliação: </b>${avaliacao}</p>
        </div>
      </div>
    `;
    }
    document.getElementById("carousel-destaque").innerHTML = texto;
}