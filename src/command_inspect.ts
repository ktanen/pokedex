import type { State } from "./state.js"

export async function commandInspect(state: State, ...args: string[]) {
    if (args.length < 1) {
        throw new Error("Please provide a pokemon name.");
    }

    const pokemonName = args[0];

    const pokemon = state.pokedex[pokemonName];

    if (pokemon === undefined) {
        throw new Error("you have not caught that pokemon");
    }

    console.log(`Name: ${pokemonName}`);
    console.log(`Height: ${pokemon.height}`);
    console.log(`Weight: ${pokemon.weight}`);
    console.log("Stats:");
    for (const stat of pokemon.stats) {
        const statName = stat.stat.name;
        const baseStatValue = stat.base_stat;
        console.log(` - ${statName}: ${baseStatValue}`);
    }
    console.log("Types:");

    for (const type of pokemon.types) {
        const typeName = type.type.name;
        console.log(` - ${typeName}`);
    }
    
}