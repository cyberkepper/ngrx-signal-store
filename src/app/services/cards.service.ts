import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Card } from '../store/cards.store';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  private http = inject(HttpClient);

  loadCards(page = 0) {
    return this.http
      .get(`https://pokeapi.co/api/v2/pokemon?limit=5&offset=${page * 5}`)
      .pipe(
        map((response: any) => {
          return response.results.map((card: any, index: number) => {
            return {
              id: response.results[index].url.split('/')[6],
              name: card.name,
              url: card.url,
              image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                response.results[index].url.split('/')[6]
              }.png`,
            } as Card;
          });
        })
      );
  }
}
