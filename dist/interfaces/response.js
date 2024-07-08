// To parse this data:
//
//   import { Convert, IResponsePokemon } from "./file";
//
//   const iResponsePokemon = Convert.toIResponsePokemon(json);
// Converts JSON strings to/from your types
export class Convert {
    static toIResponsePokemon(json) {
        return JSON.parse(json);
    }
    static iResponsePokemonToJson(value) {
        return JSON.stringify(value);
    }
}
