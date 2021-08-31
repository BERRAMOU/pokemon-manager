import {Injectable} from '@angular/core';
import {PokemonApiResponse, PokemonItemDetail} from "../models/pokemon.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})

export class PokemonService {
  private pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private http: HttpClient) {}

  /**
   * GEt all pokemons data.
   */
  getPokemons(offset = 0, limit = 0): Observable<PokemonApiResponse> {
    if (offset > 0 || limit > 0) {
      return this.http.get<PokemonApiResponse>(this.pokemonUrl + "?offset=" + offset + "&limit=" + limit)
      .pipe(
        map(data => new PokemonApiResponse(data, this))
      );
    }
    return this.http.get<PokemonApiResponse>(this.pokemonUrl).pipe(
      map(data => new PokemonApiResponse(data, this))
    );
  }

  /**
   * Get single Pokemon data.
   *
   * @param id
   */
  getPokemonById(id: string): Observable<PokemonItemDetail> {
    return this.http.get<PokemonItemDetail>(this.pokemonUrl + id + "/").pipe(
      map(data => new PokemonItemDetail(data))
    );
  }

  /**
   * Get single Pokemon data.
   *
   * @param url
   */
   getPokemonByUrl(url: string):Observable<PokemonItemDetail>{
    return this.http.get<PokemonItemDetail>(url).pipe(
      map(data => new PokemonItemDetail(data))
    );
  }
}
