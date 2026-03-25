interface PokemonListItemResponse {
  name: string;
  url: string;
}

interface PokemonListResponse {
  count: number;
  results: PokemonListItemResponse[];
}

interface PokemonTypeResponse {
  type: {
    name: string;
  };
}

interface PokemonAbilityResponse {
  ability: {
    name: string;
  };
}

interface PokemonDetailsResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonTypeResponse[];
  abilities: PokemonAbilityResponse[];
  sprites: {
    front_default?: string | null;
    other?: {
      ['official-artwork']?: {
        front_default?: string | null;
      };
    };
  };
}

export interface CreatureListItem {
  id: number;
  name: string;
  image: string;
}

export interface CreatureDetails {
  id: number;
  name: string;
  image: string | null;
  types: string[];
  abilities: string[];
  height: number;
  weight: number;
}

export interface CreatureListResponse {
  items: CreatureListItem[];
  total: number;
}

class PokeApiService {
  private static instance: PokeApiService;
  private readonly baseUrl = 'https://pokeapi.co/api/v2';

  private constructor() {}

  static getInstance(): PokeApiService {
    if (!PokeApiService.instance) {
      PokeApiService.instance = new PokeApiService();
    }

    return PokeApiService.instance;
  }

  private extractId(url: string): number {
    const parts = url.split('/').filter(Boolean);
    return Number(parts[parts.length - 1]);
  }

  private getImageUrl(id: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }

  async fetchCreatures(limit = 12, offset = 0): Promise<CreatureListResponse> {
    const res = await fetch(
      `${this.baseUrl}/pokemon?limit=${limit}&offset=${offset}`
    );

    if (!res.ok) {
      throw new Error('Failed to fetch creatures');
    }

    const data: PokemonListResponse = await res.json();

    return {
      total: data.count,
      items: data.results.map((item) => {
        const id = this.extractId(item.url);

        return {
          id,
          name: item.name,
          image: this.getImageUrl(id),
        };
      }),
    };
  }

  async fetchCreatureById(id: number): Promise<CreatureDetails> {
    const res = await fetch(`${this.baseUrl}/pokemon/${id}`);

    if (!res.ok) {
      throw new Error('Creature not found');
    }

    const data: PokemonDetailsResponse = await res.json();

    return {
      id: data.id,
      name: data.name,
      image:
        data.sprites.other?.['official-artwork']?.front_default ??
        data.sprites.front_default ??
        null,
      types: data.types.map((item) => item.type.name),
      abilities: data.abilities.map((item) => item.ability.name),
      height: data.height,
      weight: data.weight,
    };
  }
}

const pokeApiService = PokeApiService.getInstance();
export default pokeApiService;