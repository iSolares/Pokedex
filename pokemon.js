const baseUrl = "https://pokeapi.co/api/v2/pokemon?limit=299&offset=0"
let pokemonsContainer = document.querySelector("section")
let select = document.querySelector('#pokemon-filter');
const typePokemon = [
    { type: 'all'},
    { type: 'fire'},
    { type: 'grass'},
    { type: 'bug'},
    { type: 'water'},
    { type: 'poison'},
    { type: 'flying'},
    { type: 'normal'},
    { type: 'eletric'},
    { type: 'ground'},
    { type: 'fairy'},
    { type: 'psychic'},
    { type: 'fighting'},
    { type: 'rock'},
    { type: 'ice'},
    { type: 'steel'},
    { type: 'ghost'},
    { type: 'dragon'},
    { type: 'dark'},
 ]

async function getPokemons () {
    try {
        let response = await fetch(`${baseUrl}pokemon`)
        let data = await response.json()
        return data.results
    } catch (e) {
        
        console.log(e)
    }
}
async function getPokemon(url) {
    try {
        let response = await fetch(url)
        let data = await response.json()
        return data
    } catch (e) {
        
        console.log(e)
    }
}

async function showPokemons() {
    pokemonsContainer.innerHTML = ""
    let pokemons = await getPokemons()
    for(let item of pokemons) {
        let pokemon = await getPokemon(item.url)
        pokemonsContainer.innerHTML += `<div class="pokemon-cards" >
        <img src = '${pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default}'/>
        <span>${pokemon.name}</span>
        <div class="types ${pokemon.name}"></div>
        </div>`

        pokemon.types.forEach(type => {
        let types = document.querySelector(`.${pokemon.name}`)
        types.innerHTML += `<span class="type ${type.type.name}">${type.type.name}</span>`
        })

    }
}   
function filterPokemons(type) {
    let pokemonCards = document.querySelectorAll(".pokemon-cards");

    for (let card of pokemonCards) {
        if (type === "" || type === "all" || card.querySelector(`.${type}`)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    }
}

select.addEventListener("change", (event) => {
    filterPokemons(event.target.value);
});

showPokemons();