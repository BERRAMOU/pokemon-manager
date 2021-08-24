export class Pokemon {
  name!: string;
  url!: string;
}

export class PokemonApiResponse implements PokemonApiResponseInterface {
  count!: number;
  next!: object | null;
  previous!: object | null;
  results!: Array<Pokemon>;

  constructor(PokemonApiResponseData: PokemonApiResponseInterface) {
    this.count = PokemonApiResponseData.count;
    this.next = {
      limit : 10,
      offset: 10
    };
    this.previous = PokemonApiResponseData.previous;
    this.results = PokemonApiResponseData.results;
  }
}

export interface PokemonApiResponseInterface {
  count: number;
  next: object | null;
  previous: object | null;
  results: Array<Pokemon>;
}


interface PokemonItemInterface {
  id: string;
  name: string;
  sprites: Sprites;
  is_default: boolean;
  base_experience: number;
}

interface SpritesInterface {
  back_default: string;
}

class Sprites implements SpritesInterface {
  back_default: string;

  constructor(spritesData: SpritesInterface) {
    this.back_default = spritesData.back_default
  }
}

export class PokemonItem implements PokemonItemInterface {
  id!: string;
  name!: string;
  sprites!: Sprites;
  is_default!: boolean;
  base_experience!: number;

  constructor(PokemonItemData: PokemonItemInterface) {
    this.id = PokemonItemData.id;
    this.name = PokemonItemData.name;
    this.sprites = new Sprites(PokemonItemData.sprites);
    this.is_default = PokemonItemData.is_default;
    this.base_experience = PokemonItemData.base_experience;
  }

}
