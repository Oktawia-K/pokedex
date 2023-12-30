const input = document.querySelector("input");
const button = document.querySelector("button");
const error = document.querySelector(".error");
const bgImage = document.querySelector(".bg-image");

const pokemon = document.querySelector("span.pokemon");
const type = document.querySelector("div.type");
const number = document.querySelector("span.number");
const pokeimage = document.querySelector(".pokeimage");
const weight = document.querySelector("span.weight");
const height = document.querySelector("span.height");

function getPokemon(url = `https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 1025) + 1}`) {
    if (input.value != "") {
        url = `https://pokeapi.co/api/v2/pokemon/${input.value.toLowerCase()}/`
    }

    axios.get(url)
        .then((response) => {
            pokemon.textContent = `${response.data.name}`.toLocaleUpperCase();
            number.textContent = `#${response.data.id}`.toLocaleUpperCase();
            pokeimage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${response.data.id}.png`;

            while (type.childElementCount > 0)
                type.removeChild(type.lastChild);
            const firstType = document.createElement("div");
            firstType.classList.add(`${response.data.types[0].type.name.toLowerCase()}`);
            firstType.textContent = `${response.data.types[0].type.name.toUpperCase()}`;
            type.appendChild(firstType);
            if (response.data.types.length > 1) {
                const secondType = document.createElement("div");
                secondType.classList.add(`${response.data.types[1].type.name.toLowerCase()}`);
                secondType.textContent = `${response.data.types[1].type.name.toUpperCase()}`;
                type.appendChild(secondType);
            }

            bgImage.src = `./media/${response.data.types[0].type.name.toLowerCase()}.jpg`

            weight.textContent = `${response.data.weight / 10} kg`;
            height.textContent = `${response.data.height * 10} cm`;

            error.textContent = "";
        })
        .catch((error) => {

        })
        .finally(function () {
            input.value = "";
        });
}

const getPokemonByEnter = (e) => {
    if (e.key === "Enter") {
        getPokemon();
    }
}

getPokemon();

button.addEventListener("click", getPokemon);
input.addEventListener("keypress", getPokemonByEnter);