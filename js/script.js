$(document).ready(function () {
    buscarPokemons(0, 20);
});

$("#load").on("click", function() {
    let qtPokemon = $(".pokemon").length;
    let limint = qtPokemon * 2;
    buscarPokemons(qtPokemon, limint);
});

$("#template").on("click", function() {
    $("main").toggleClass("dark")
    $(".button").toggleClass("dark")
    $(".pokemon").toggleClass("dark")
    $("main").hasClass("dark") ? $("#template").text("Dark") : $("#template").text("Light")
})

function buscarPokemons(x, y) {
    $.get(`https://pokeapi.co/api/v2/pokemon?limit=${y}&offset=${x}`, (data) => {
        criarElementos(data.results);
    });
}

function criarElementos(pokedex) {
    let dark = $("main").hasClass("dark")
    pokedex.map((item) => {
        $("#pokedex-div").append(`<article class="pokemon ${dark ? "dark" : null}" id="${item.name}"></article>`);
        buscarInformacoes(item.url);
    });
}

function buscarInformacoes(url) {
    $.get(url, (data) => {
        const types = data.types.map(item => `<li class="type ${item.type.name}">${item.type.name}</li>`);

        $(`#${data.name}`).append(
            `<div>
                <p class="id">#${data.id}</p>
                <img class="imagem" src=${data.sprites.front_default} title="PokeAPI" />
                <h3 class="nome">${data.name}</h3>
                <ul class="list-style text-center">
                    ${types.join("")}
                </ul>
            </div>`
        );
    });
}
