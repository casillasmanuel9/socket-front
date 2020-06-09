import { ChatService } from './services/chat.service';
import { WebsocketsService } from './services/websockets.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'basico';

  constructor(public webSocketService: WebsocketsService, public chatService: ChatService) {

  }

  ngOnInit(): void {
    this.chatService.getMessagesPrivate().subscribe(msg => {
      console.log(msg)
    });
  }
}
