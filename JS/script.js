const pokemonName = document.querySelector('.pokemon__name');
const pokemonID = document.querySelector('.pokemon__id');
const pokemonImage = document.querySelector('.pokemon__image');
const pokemonTipo = document.querySelector('.pokemon__tipo');
const form = document.querySelector('.form');
const input = document.querySelector('.busca');

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch('https://pokeapi.co/api/v2/pokemon/${pokemon}');
    
    if (APIResponse == 200) {
        const data = await APIResponse.json();
        return data; 
    }
    
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Procurando ...';
    pokemonID.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data){
        pokemonName.innerHTML = data.name;
        pokemonID.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        pokemonTipo.innerHTML = data['types']['0']['type']['name']
    } else{
        pokemonName.innerHTML = 'Pokemon não encontrado, Verifique o nome digitado e tente novamente';
        pokemonID.innerHTML = '';
        pokemonImage.style.display = 'none';

    }
    
}

form.addEventListener('submit', (event) => {

    event.preventDefault();
    renderPokemon(input.value.toLowercase());
    input.value = '';
});