import { Component } from '@angular/core';
import { Card } from '../../components/card/card';

@Component({
  selector: 'app-poker',
  imports: [Card],
  templateUrl: './poker.html',
  styleUrl: './poker.scss',
})
export class Poker {}
