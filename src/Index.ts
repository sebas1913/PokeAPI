import { IResponsePokemon } from "./interfaces/response.js";

const container = document.querySelector(".container") as HTMLDivElement;

document.addEventListener("DOMContentLoaded", async () => {
    const data: IResponsePokemon[] = await getAllPokemons();

    data.forEach((item: IResponsePokemon) => {
        const forms = item.forms.map(form => form.name).join(", ");
        const speciesName = item.species.name;
        const spriteUrl = item.sprites.front_default;

        container.innerHTML += `
            <div class="card">
                <div class="background">
                    <img src="${spriteUrl}" alt="${item.name}">
                </div>
                <div class="description"> 
                    <p><span class="name">${item.name}</span></p>
                    <p><span>${item.base_experience}</span></p>
                    <p><span>Altura: </span>${item.height} </p>
                    <p><span>Peso: </span>${item.weight}</p>
                </div>
            </div>
        `;
    });
});

const getAllPokemons = async (): Promise<IResponsePokemon[]> => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=102");
    let data = await response.json();

    const results = data.results;

    const detailedPokemons: IResponsePokemon[] = await Promise.all(
        results.map(async (result: { url: string }) => {
            const response = await fetch(result.url);
            return await response.json();
        })
    );

    return detailedPokemons;
};
