var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const container = document.querySelector(".container");
document.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield getAllPokemons();
    data.forEach((item) => {
        const forms = item.forms.map(form => form.name).join(", ");
        const speciesName = item.species.name;
        const spriteUrl = item.sprites.front_default;
        container.innerHTML += `
            <div class="card">
                <div class="background">
                    <img src="${spriteUrl}" alt="${item.name}">
                </div>
                <div class="description"> 
                    <p><span class="name">${item.name.charAt(0).toUpperCase() + item.name.slice(1)}</span></p>
                    <p><span>Exp: </span>${item.base_experience}</p>
                    <p><span>Altura: </span>${item.height} </p>
                    <p><span>Peso: </span>${item.weight}</p>
                </div>
            </div>
        `;
    });
}));
const getAllPokemons = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch("https://pokeapi.co/api/v2/pokemon?limit=102");
    let data = yield response.json();
    const results = data.results;
    const detailedPokemons = yield Promise.all(results.map((result) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield fetch(result.url);
        return yield response.json();
    })));
    return detailedPokemons;
});
export {};
