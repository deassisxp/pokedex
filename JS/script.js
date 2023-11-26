const API_URL = "https://pokeapi.co/api/v2/pokemon/";

function createPokemonCard(pokemon) {
    // Criar um elemento div para o card
    let card = document.createElement("div");
    card.classList.add("pokemon__cards");

    // Criar um elemento img para o plano de fundo do card
    let plano = document.createElement("img");
    plano.classList.add("plano");
    plano.src = "./img/carta.jpg";
    plano.alt = "pokemon";

    // Criar um elemento img para a imagem do Pokémon
    let image = document.createElement("img");
    image.classList.add("pokemon__image");
    image.src = pokemon.sprites.front_default;
    image.alt = "Imagem do Pokémon";

    // Criar um elemento h2 para o nome do Pokémon
    let name = document.createElement("h2");
    name.classList.add("pokemon__name");
    name.textContent = pokemon.name;

    // Criar um elemento p para o id do Pokémon
    let id = document.createElement("p");
    id.classList.add("pokemon__id");
    id.textContent = pokemon.id;

    // Criar um elemento p para o tipo do Pokémon
    let type = document.createElement("p");
    type.classList.add("pokemon__tipo");
    type.textContent = pokemon.types[0].type.name;

    // Criar um elemento p para o hp do Pokémon
    let hp = document.createElement("p");
    hp.classList.add("pokemon__hp");
    hp.textContent = "HP: " + pokemon.stats[0].base_stat;

    // Criar um elemento p para o ataque do Pokémon
    let atk = document.createElement("p");
    atk.classList.add("pokemon__atk");
    atk.textContent = "ATK: " + pokemon.stats[1].base_stat;

    // Criar um elemento p para a defesa do Pokémon
    let def = document.createElement("p");
    def.classList.add("pokemon__def");
    def.textContent = "DEF: " + pokemon.stats[2].base_stat;

    // Adicionar os elementos criados ao card
    card.appendChild(plano);
    card.appendChild(image);
    card.appendChild(name);
    card.appendChild(id);
    card.appendChild(type);
    card.appendChild(hp);
    card.appendChild(atk);
    card.appendChild(def);

    // Retornar o card
    return card;
}

function fetchPokemonData(number) {
    let url = API_URL + number;

    fetch(url)
        .then(response => response.json()) 
        .then(pokemon => { 
            let card = createPokemonCard(pokemon);

            let main = document.querySelector(".main");

            main.appendChild(card);
        })
        .catch(error => console.error(error)); 
}

function fetchAllPokemon() {

    for (let i = 1; i <= 151; i++) {
        fetchPokemonData(i);
    }
}

function saveTeam(event) {
    event.preventDefault();

    let teamNameInput = document.getElementById("team-name");

    let teamName = teamNameInput.value;

    if (teamName) {
        let teamMembers = [];

        let cards = document.querySelectorAll(".pokemon__cards");

        for (let card of cards) {
            if (card.classList.contains("selected")) {
                let pokemonName = card.querySelector(".pokemon__name").textContent;

                teamMembers.push(pokemonName);
            }
        }

        if (teamMembers.length > 0) {
            if (teamMembers.length <= 6) {
                let team = {
                    name: teamName,
                    members: teamMembers
                };

                let teamJSON = JSON.stringify(team);

                localStorage.setItem("team", teamJSON);

                window.location.href = "team.html";
            } else {
                alert("O time não pode ter mais de seis Pokémon!");
            }
        } else {
            alert("O time não pode estar vazio!");
        }
    } else {
        alert("O nome do time não pode estar vazio!");
    }
}

function renderTeam() {
    let teamJSON = localStorage.getItem("team");

    if (teamJSON) {
        let team = JSON.parse(teamJSON);

        let teamName = team.name;
        let teamMembers = team.members;

        let teamDisplay = document.querySelector(".team-display");

        let teamNameElement = document.createElement("h2");
        teamNameElement.textContent = teamName;

        teamDisplay.appendChild(teamNameElement);

        for (let member of teamMembers) {
            let url = API_URL + member;

            fetch(url)
                .then(response => response.json()) 
                .then(pokemon => { 
                    let card = createPokemonCard(pokemon);

                    teamDisplay.appendChild(card);
                })
                .catch(error => console.error(error)); 
        }
    } else {
        alert("Não há nenhum time salvo!");
    }
}

function toggleSelected(event) {
    let element = event.target;

    if (element.classList.contains("pokemon__cards") || element.closest(".pokemon__cards")) {
        
        let card = element.classList.contains("pokemon__cards") ? element : element.closest(".pokemon__cards");

        if (card.classList.contains("selected")) {
            
            card.classList.remove("selected");
        } else {
            
            card.classList.add("selected");
        }
    }
}

if (window.location.pathname === "/index.html") {
    fetchAllPokemon();

    let form = document.querySelector(".form");

    form.addEventListener("submit", saveTeam);

    let main = document.querySelector(".main");

    main.addEventListener("click", toggleSelected);
}

if (window.location.pathname === "/team.html") {
    renderTeam();
}