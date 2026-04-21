import type { CLICommand, State } from "./state.js"

export async function commandMapb(state: State) {
    const api = state.pokeapi;

    if (!state.prevLocationsURL) {
        console.log("you're on the first page");
        return;
    }

    const url = state.prevLocationsURL
    const response = await api.fetchLocations(url);
    const locationAreas = response.results;
    const nextURL = response.next;
    const prevURL = response.previous;

    for (const area of locationAreas) {
        console.log(area.name);
    }

    state.nextLocationsURL = nextURL;
    state.prevLocationsURL = prevURL;
}