export interface IPokemon {
    id: number;
    name: string;
    abilities: { ability: { name: string } }[];
    stats: { stat: { name: string }; base_stat: number }[];
    types: { type: { name: string } }[];
    forms: { name: string }[];
    imageUrl: string;
    height: number;
    weight: number;
    base_experience: number;
}

export interface Stat {
    name: string;
    value: number;
}