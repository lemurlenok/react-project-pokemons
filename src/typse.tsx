export interface IPokemon {
    id: number;
    name: string;
    url: string;
}
export interface PokemonResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: IPokemon[];
}