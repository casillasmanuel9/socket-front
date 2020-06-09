import { ChatService } from './../../services/chat.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  texto = "";
  mensajesSuscription: Subscription;
  elemento: HTMLElement;

  mensajes: any[] = [];

  constructor(private chatS: ChatService) { }

  ngOnInit(): void {
    this.elemento = document.getElementById('chat-mensajes');

    this.mensajesSuscription = this.chatS.getMessages().subscribe(msg =>{
      this.mensajes.push(msg);
      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 50);
    });
  }

  ngOnDestroy(): void {
    this.mensajesSuscription.unsubscribe();
  }

  enviar() {
    if(this.texto.trim().length === 0) return;
    this.chatS.sendMessage(this.texto);
    this.texto = "";
  }

}
