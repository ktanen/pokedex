import type { State } from "./state.js"

export async function commandCatch(state: State, ...args: string[]) {
    if (args.length < 1) {
        throw new Error("Please provide a pokemon name.");
    }

    const pokemonName = args[0];

    console.log(`Throwing a Pokeball at ${pokemonName}...`);

    const pokemon = await state.pokeapi.fetchPokemon(pokemonName);
    const base_experience = pokemon.base_experience;

    const catchChance = 1 - (base_experience / 700);
    const caught = Math.random() < catchChance;

    if (caught) {
        console.log(`${pokemonName} was caught!`);
        console.log("You may now inspect it with the inspect command.")
    } else {
        console.log(`${pokemonName} escaped!`);
    }

    state.pokedex[pokemonName] = pokemon;
}