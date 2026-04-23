import type { State } from "./state.js"

export async function commandExplore(state: State, ...args: string[]) {
    const api = state.pokeapi;
    if (args.length < 1) {
        throw new Error("Please provide a location area name");
        
    }

    const locationAreaName = args[0];

    const location = await api.fetchLocation(locationAreaName);

    const encounters = location.pokemon_encounters;

    console.log(`Exploring ${locationAreaName}...`);
    console.log("Found Pokemon:");

    for (const encounter of encounters) {
        console.log(` - ${encounter.pokemon.name}`);
    }

}