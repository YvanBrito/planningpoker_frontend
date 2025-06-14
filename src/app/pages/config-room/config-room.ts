import { Component, computed, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WebSocketService } from '../../services/websocket.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-config-room',
  imports: [FormsModule],
  templateUrl: './config-room.html',
  styleUrl: './config-room.scss',
})
export class ConfigRoom implements OnInit, OnDestroy {
  sequencias = [
    {
      name: 'Fibonacci',
      key: 'fibonacci',
      value: '0,1,1,2,3,5,8,13,21,34',
    },
    {
      name: 'Sequencial',
      key: 'sequencial',
      value: '0,1,2,3,4,5,6,7,8,9',
    },
  ];
  seq = signal('');

  teste = computed(
    () =>
      this.sequencias.filter(({ key }) => {
        console.log(this.seq());
        return key === this.seq();
      })[0]?.value || this.seq()
  );

  private sub!: Subscription;
  constructor(
    private webSocketService: WebSocketService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.webSocketService.connect();
    this.sub = this.webSocketService.listen().subscribe((msg) => {
      if (this.webSocketService.roomId)
        this.router.navigate([`/poker/${this.webSocketService.roomId}`]);
    });
  }

  criarSala() {
    this.webSocketService.createRoom();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
