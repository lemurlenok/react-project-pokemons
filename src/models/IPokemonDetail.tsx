export interface IPokemonDetail {
    id: number;
    name: string;
    imageUrl: string;
    height: number;
    weight: number;
    base_experience: number;
    abilities: Array<{ ability: { name: string } }>;
    stats: Array<{ stat: { name: string }, base_stat: number }>;
    types: Array<{ type: { name: string } }>;
    forms: Array<{ name: string }>;
}