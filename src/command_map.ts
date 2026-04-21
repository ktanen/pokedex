import type { CLICommand, State } from "./state.js"

export async function commandMap(state: State) {
    const api = state.pokeapi;
    const url = state.nextLocationsURL ?? undefined;
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