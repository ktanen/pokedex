import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  #cache: Cache;
  
  constructor(cacheInterval: number) {
    this.#cache = new Cache(cacheInterval);
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const  fullURL = (pageURL !== undefined) ? pageURL: `${PokeAPI.baseURL}/location-area`;
    const cached = this.#cache.get<ShallowLocations>(fullURL);

    if (cached !== undefined) {
      return cached;
    }

    const response = await fetch(fullURL);
    const responseData = await response.json();
    
    const locations: ShallowLocations = {
        count: responseData.count,
        next: responseData.next,
        previous: responseData.previous,
        results: responseData.results,
    };

    this.#cache.add(fullURL, locations);
    return locations;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const fullURL = `${PokeAPI.baseURL}/location-area/${locationName}`;
    const cached = this.#cache.get<Location>(fullURL);
    
    if (cached !== undefined) {
      return cached;
    }

    const response = await fetch(fullURL);
    const responseData = await response.json();
    const location = {
        name: responseData.location.name,
        pokemon_encounters: responseData.pokemon_encounters
    };

    this.#cache.add(fullURL,location);
    return location;

  }

  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    const fullURL = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;
    const cached = this.#cache.get<Pokemon>(fullURL);
    if (cached !== undefined) {
      return cached;
    }

    const response = await fetch(fullURL);
    const pokemon: Pokemon = await response.json();
    
    this.#cache.add(fullURL, pokemon);
    return pokemon;
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
    base_experience: number;
    height: number;
    weight: number;
    stats: PokemonStat[];
    types: PokemonType[];
}

export type PokemonType = {
  slot: number;
  type: Type;
}
export type Type = {
  name: string;
}
export type PokemonStat = {
  stat: Stat;
  base_stat: number;
}

export type Stat = {
  name: string;
}

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