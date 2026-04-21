export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const  fullURL = (pageURL !== undefined) ? pageURL: `${PokeAPI.baseURL}/location-area`;

    const response = await fetch(fullURL);
    const responseData = await response.json();
    return {
        count: responseData.count,
        next: responseData.next,
        previous: responseData.previous,
        results: responseData.results,
    };
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const fullURL = `${PokeAPI.baseURL}/location-area/${locationName}`;
    const response = await fetch(fullURL);
    const responseData = await response.json();
    return {
        name: responseData.location.name,
        pokemon_encounters: responseData.pokemon_encounters
    };
  }
}

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];

};
export type Location = {
  name: string;
  pokemon_encounters: PokemonEncounter[];
};

export type VersionDetail2 = {
  encounter_details: EncounterDetail[]
  max_chance: number
  version: Version2
}

export type Pokemon = {
    name: string;
    url: string;
};

export type Version2 = {
    name: string;
    url: string;
};

export type EncounterDetail = {
  chance: number
  condition_values: any[]
  max_level: number
  method: Method
  min_level: number
};
export type Method = {
  name: string
  url: string
}

export type PokemonEncounter = {
  pokemon: Pokemon
  version_details: VersionDetail2[]
}