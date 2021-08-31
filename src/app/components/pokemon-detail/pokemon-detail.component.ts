import {Component} from '@angular/core';
import {PokemonService} from "../../services/pokemon.service";
import {ActivatedRoute} from "@angular/router";
import {Observable, of} from "rxjs";
import {PokemonItemDetail} from "../../models/pokemon.model";

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent {
  pokemon$: Observable<PokemonItemDetail|null>

  constructor(private pokemonService: PokemonService, private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get('id');
    this.pokemon$ = id ? this.pokemonService.getPokemonById(id) : of(null);
  }

}
