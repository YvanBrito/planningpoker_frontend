import { Component, input, model } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.scss'
})
export class Card {
  value = input.required({transform: (value: string) => {
    if(!value) return '';

    return value.substring(0,3);
  }});
  isFaceDown = input<boolean>(false);
  playable = input<boolean>(false);
  isSelected = model<boolean>(false);

  select() {
    if (this.playable()) this.isSelected.set(!this.isSelected());
  }
}
