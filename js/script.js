$(document).ready(function () {
    buscarPokemons(0, 20);
});

$("#load").on("click", function() {
    let qtPokemon = $(".pokemon").length;
    let limint = qtPokemon * 2;
    buscarPokemons(qtPokemon, limint);
});

function buscarPokemons(x, y) {
    $.get(`https://pokeapi.co/api/v2/pokemon?limit=${y}&offset=${x}`, (data) => {
        criarElementos(data.results);
    });
}

function criarElementos(pokedex) {
    pokedex.map((item) => {
        $("#pokedex-div").append(`<article class="pokemon" id="${item.name}"></article>`);
        buscarInformacoes(item.url);
    });
}

function buscarInformacoes(url) {
    $.get(url, (data) => {
        const types = data.types.map(item => `<li class="type">${item.type.name}</li>`);

        $(`#${data.name}`).append(
            `<img src=${data.sprites.front_default} />
            <p>${data.id}</p>
            <h3>${data.name}</h3>
            <ul class="types">
                ${types.join("")}
            </ul>`
        );
    });
}
