import { WebsocketsService } from "./../../services/websockets.service";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  nombre = "";

  constructor(public WsService: WebsocketsService, private router: Router) {}

  ngOnInit(): void {}

  ingresar() {
    this.WsService.loginWS(this.nombre).then(() => {
      this.router.navigateByUrl('/mensajes');
    });
  }
}
