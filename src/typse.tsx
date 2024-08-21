export interface IPokemon {
    name: string;
    url: string;
}

export interface PokemonState {
    pokemons: IPokemon[];
    isLoaded: boolean;
    error: string | null;
    page: number;
    totalPages: number;
}