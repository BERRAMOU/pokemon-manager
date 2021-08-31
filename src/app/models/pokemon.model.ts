import {PokemonService} from "../services/pokemon.service";
import {forkJoin} from "rxjs";

export class Pokemon implements PokemonInterface {
  name!: string;
  url!: string;
  image!: string;

  constructor(pokemonInterfaceData: PokemonInterface) {
    this.name = pokemonInterfaceData.name
    this.url = pokemonInterfaceData.url
    this.image = pokemonInterfaceData.image
  }
}

interface PokemonInterface {
  name: string;
  url: string;
  image: string;
}

// Pokemon API response representaion.
export class PokemonApiResponse implements PokemonApiResponseInterface {
  count!: number;
  next!: object | null;
  previous!: object | null;
  results!: Array<Pokemon>;

  constructor(PokemonApiResponseData: PokemonApiResponseInterface, pokemonService: PokemonService) {
    this.count = PokemonApiResponseData.count;
    this.next = PokemonApiResponseData.next;
    this.previous = PokemonApiResponseData.previous;
    this.results = PokemonApiResponseData.results.map(
      PokemonData => {
        let image = '';
        forkJoin(pokemonService.getPokemonByUrl(PokemonData.url)).subscribe(
          val => {
            image = val[0].sprites.back_default;
          }
        );
        return new Pokemon({...PokemonData, image: image});
      }
    );
  }
}

export interface PokemonApiResponseInterface {
  count: number;
  next: object | null;
  previous: object | null;
  results: Array<Pokemon>;
}

// Pokemon Sprites data.
interface SpritesInterface {
  back_default: string;
}

class Sprites implements SpritesInterface {
  back_default: string;

  constructor(spritesData: SpritesInterface) {
    this.back_default = spritesData.back_default
  }
}

// Detail Pokemon Data.
interface PokemonItemDetailInterface {
  id: string;
  name: string;
  sprites: Sprites;
  is_default: boolean;
  base_experience: number;
}

export class PokemonItemDetail implements PokemonItemDetailInterface {
  id!: string;
  name!: string;
  sprites!: Sprites;
  is_default!: boolean;
  base_experience!: number;

  constructor(PokemonItemData: PokemonItemDetailInterface) {
    this.id = PokemonItemData.id;
    this.name = PokemonItemData.name;
    this.sprites = new Sprites(PokemonItemData.sprites);
    this.is_default = PokemonItemData.is_default;
    this.base_experience = PokemonItemData.base_experience;
  }
}
