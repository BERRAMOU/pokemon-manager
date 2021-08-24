import {Injectable} from '@angular/core';
import {Pokemon, PokemonApiResponse, PokemonItem} from "../models/pokemon";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})

export class PokemonService {
  private pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private http: HttpClient) {
  }

  /**
   * GEt all pokemons data.
   */
  getPokemons(offset = 0, limit = 0): Observable<PokemonApiResponse> {
    if (offset > 0 || limit > 0) {
      return this.http.get<PokemonApiResponse>(this.pokemonUrl + "?offset=" + offset + "&limit=" + limit);
    }
    return this.http.get<PokemonApiResponse>(this.pokemonUrl);
  }

  /**
   * Get single Pokemon data.
   *
   * @param id
   */
  getPokemon(id: string): Observable<PokemonItem> {
    return this.http.get<PokemonItem>(this.pokemonUrl + id + "/").pipe(
      map(data => new PokemonItem(data))
    );
  }

}

/**
 *
 * @param data
 */
function mapPokemonApiResponseToPokemon(data: PokemonApiResponse): Array<Pokemon> {
  return data.results;
}

