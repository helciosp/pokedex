let x = 0;

$(document).ready(
    function buscarPokemons() {
        $.get("https://pokeapi.co/api/v2/pokemon", (data) => {
        criarElementos(data.results);
        x += 20;
    })
});

$("#load").on("click", function() {
    $.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${x}`, (data) => {
    criarElementos(data.results);
    x += 20;
    })
})

function criarElementos(pokedex) {
    pokedex.map((item, index) => {
        $("#pokedex-div").append(`<article id=${index + x}></article>`);
        buscarInformacoes(item.url);
    })
}

function buscarInformacoes(url) {
    $.get(url, (data) => {
        const types = data.types.map(item => `<p class="type">${item.type.name}</p>`)

        $(`#${data.id}`).append(
            `<img src=${data.sprites.front_default} />
            <p>${data.id}</p>
            <h3>${data.name}</h3>
            <div class="types">
                ${types.join("")}
            </div>`
        );
    })
}
