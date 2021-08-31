import {Component} from '@angular/core';
import {PokemonService} from "../../services/pokemon.service";
import {Observable} from "rxjs";
import {PokemonApiResponse} from "../../models/pokemon.model";

@Component({
  selector: 'pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent {

  pokemonResponse$: Observable<PokemonApiResponse> = this.pokemonService.getPokemons(0, 10);
  displayedColumns: string[] = ['name', 'url', 'detail'];

  constructor(private pokemonService: PokemonService) {}
  
  /**
   * Move to next or previous page.
   * 
   * @param event
   */
  moveToNextOrPreviousPage(event?: MouseEvent) {
    const target = event?.target as HTMLInputElement;
    const paginationConf = getPaginationConf(target.value);
    this.pokemonResponse$ = this.pokemonService.getPokemons(paginationConf.offset, paginationConf.limit);
  }
}

/**
 *
 * @param url
 */
function getPaginationConf(url: string) {
  console.log(url);
  const params = url.split("=");
  const limit = params[2] != undefined ? Number(params[2]) : 0;
  const offset = params[1] != undefined ? Number(params[1].split("&")[0]) : 0;
  return {
    limit,
    offset
  }
}
