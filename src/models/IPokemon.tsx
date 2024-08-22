export interface IPokemon {
    id: number;
    name: string;
    imageUrl?: string; // Додано для збереження URL зображення
}

export interface IPokemonResponse {
    results: IPokemon[];
    next: string | null;
    previous: string | null;
}