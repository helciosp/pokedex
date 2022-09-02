$(document).ready(function () {
    buscarPokemons(0, 20);
});

$("#form-pesquisa").submit(function() {
    pesquisar();
    return false
});

$("#load").on("click", function() {
    let load = $("#load")
    if(load.val() == "1") {
        $(".pokemon").remove();
        buscarPokemons(0, 20);
        load.text("Carregar mais Pokémon");
        load.val(0);
        return
    }
    let qtPokemon = $(".pokemon").length;
    let limint = qtPokemon * 2;
    buscarPokemons(qtPokemon, limint);
});

$("#pesquisar").on("click", function() {
    pesquisar();
})

$("#template").on("click", function() {
    $("main").toggleClass("dark")
    $(".button").toggleClass("dark")
    $(".pokemon").toggleClass("dark")
    $("main").hasClass("dark") ? $("#template").text("Dark") : $("#template").text("Light")
})

function pesquisar() {
    let value = $("#input-pesquisa").val().replace(/\s/g, '')
    let load = $("#load")
    
    if(value == "") return

    load.text("Limpar pesquisa");
    load.val(1);
    
    buscarPokemons(0, 0, value);
}

function buscarPokemons(x, y, pokemon) {
    if(pokemon) {
        $.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`, (data) => {
            criarElementos(data, true);
        })
        .fail(function () {
            alert("Pokemon não encontrado! Tente novamente.")
        });
        return
    }
    $.get(`https://pokeapi.co/api/v2/pokemon?limit=${y}&offset=${x}`, (data) => {
        criarElementos(data.results);
    });
}

function criarElementos(pokedex, oneElement) {
    let dark = $("main").hasClass("dark")
    
    if(oneElement) {
        $(".pokemon").remove();
        $("#pokedex-div").append(`<article class="pokemon ${dark ? "dark" : ""}" id="${pokedex.name}"></article>`);
        estrurura(pokedex);
        return
    }
    
    pokedex.map((item) => {
        $("#pokedex-div").append(`<article class="pokemon ${dark ? "dark" : ""}" id="${item.name}"></article>`);
        buscarInformacoes(item.url);
    });
}

function buscarInformacoes(url) {
    $.get(url, (data) => {
        estrurura(data);
    });
}

function estrurura(data) {
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
}
