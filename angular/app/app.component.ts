import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from "@angular/router";
import { LoginService } from './services/login.service';
 
// Decorador component, indicamos en que etiqueta se va a cargar la 

@Component({
    selector: 'my-app',
    templateUrl: 'app/view/layout.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [LoginService]
})
 
// Clase del componente donde irán los datos y funcionalidades
export class AppComponent {
    public identity;
    public token;

    constructor(
        private _loginService: LoginService
    ){}

    ngOnInit(){
        this.identity= this._loginService.getIdentity();
        this.token= this._loginService.getToken();
    }
}
