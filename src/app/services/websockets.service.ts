import { Usuario } from "./../classes/usuario";
import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { Router } from '@angular/router';

@Injectable({
  providedIn: "root",
})
export class WebsocketsService {
  public socketStatus = false;
  public usuario: Usuario;

  constructor(private socket: Socket, private router:Router) {
    this.cargarStorage();
    this.checkStatus();
  }

  getUsuario() {
    return this.usuario;
  }

  checkStatus() {
    this.socket.on("connect", () => {
      console.log("conectado al servidor");
      this.socketStatus = true;
      this.cargarStorage();
    });

    this.socket.on("disconnect", () => {
      console.log("desconectado al servidor");
      this.socketStatus = false;
    });
  }

  emit(evento: string, payload?: any, callback?: Function) {
    console.log("Emitiendo Mensaje");
    this.socket.emit(evento, payload, callback);
  }

  listen(evento: string) {
    return this.socket.fromEvent(evento);
  }

  loginWS(nombre: string) {
    return new Promise((resolve, reject) => {
      console.log("configurando ", nombre);
      this.emit("consfigurar-usaurio", { nombre }, (resp) => {
        this.usuario = new Usuario(nombre);
        this.guardarStorage();
        resolve();
      });
    });
  }

  logoutWS() {
    this.usuario = null;
    localStorage.removeItem('usuario');
    this.emit('consfigurar-usaurio', {
      nombre: 'sin-nombre'
    }, () => {});
    this.router.navigateByUrl('');
  }


  guardarStorage() {
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
  }

  cargarStorage() {
    if(localStorage.getItem('usuario')) {
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.loginWS(this.usuario.nombre);
    }
  }
}
