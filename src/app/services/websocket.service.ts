import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  ws!: WebSocket;
  messages: Subject<any> = new Subject<any>();
  roomId: string = '';
  connected = false;

  constructor() {}

  connect() {
    if (this.ws) {
      return;
    }

    this.ws = new WebSocket('ws://localhost:8080/ws/game');

    this.ws.onopen = () => {
      this.connected = true;
      this.addMessage('Conectado ao servidor.');
    };

    this.ws.onmessage = (event) => {
      const msg = event.data;

      if (msg.startsWith('ROOM_CREATED')) {
        this.roomId = msg.split(' ')[1];
      }

      this.addMessage(msg);
    };

    this.ws.onclose = () => {
      this.connected = false;
      this.addMessage('Desconectado.');
    };

    this.ws.onerror = (err) => console.error('Erro no WebSocket:', err);
  }

  listen(): Observable<any> {
    return this.messages.asObservable();
  }

  sendCommand(command: string) {
    if (this.ws && this.connected) {
      this.ws.send(command);
    }
  }

  createRoom() {
    this.sendCommand('CREATE_ROOM');
  }

  joinRoom() {
    if (this.roomId) {
      this.sendCommand(`JOIN_ROOM ${this.roomId}`);
    }
  }

  sendAction(action: string) {
    this.sendCommand(`ACTION ${action}`);
  }

  addMessage(msg: string) {
    this.messages.next(msg);
  }
}
