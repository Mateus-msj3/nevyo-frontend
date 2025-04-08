import {Injectable} from '@angular/core';
import * as SockJS from 'sockjs-client';
import {Client, Message} from '@stomp/stompjs';
import {Subject, Observable} from 'rxjs';
import {LocalStorageService} from "./local-storage.service";
import {Notification} from "../models/notification";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private client!: Client;
  private notificationSubject: Subject<number> = new Subject<number>();

  constructor(private localStorageService: LocalStorageService) {
    this.connect();
  }


  private connect() {
    const token = this.localStorageService.getToken();
    // Configura o STOMP Client com WebSocket
    this.client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8081/api/v1/ws'),
      reconnectDelay: 5000, // Tempo de reconexão em milissegundos
      connectHeaders: {
        Authorization: `Bearer ${token}` // Adiciona o token ao cabeçalho de autorização
      }
    });

    // Ação a ser executada quando o WebSocket conectar com sucesso
    this.client.onConnect = (frame) => {
      // Inscreve-se no tópico para receber notificações de mudanças no usuário
      this.client.subscribe('/topic/notifications', (notificationResponse: any) => {
        console.log(notificationResponse)
        const totalNotifications: number = JSON.parse(notificationResponse.body); // Converte de string para Notification
        this.notificationSubject.next(totalNotifications); // Emite a notificação convertida
      });
    };

    // Ação a ser executada caso a conexão falhe
    this.client.onStompError = (frame) => {
      console.error('Broker reported error: ', frame.headers['message']);
      console.error('Additional details: ', frame.body);
    };

    // Ativa a conexão WebSocket
    this.client.activate();
    console.log('WebSocket connected');
  }

  // Retorna um Observable para receber notificações em tempo real
  getNotifications(): Observable<number> {
    return this.notificationSubject.asObservable();
  }

}
