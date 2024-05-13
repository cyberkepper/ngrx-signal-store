import { Component, effect, inject, signal } from '@angular/core';
import { CardStore } from '../../store/cards.store';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
})
export class CardsComponent {
  readonly store = inject(CardStore);
  page = signal(0);

  ngOnInit() {
    this.store.loadPages(this.page());
  }

  nextPage() {
    this.page.update((page) => page + 1);
    this.store.loadPages(this.page());
  }
}
