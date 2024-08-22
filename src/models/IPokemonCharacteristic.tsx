import {IPokemon} from "./IPokemon";

export interface IPokemonResponse {
    next: string | null,
    previous: string | null,
    results: IPokemon []
}