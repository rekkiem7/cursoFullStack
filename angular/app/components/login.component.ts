import {Component,OnInit} from '@angular/core';
import {LoginService} from '../services/login.service';
 
@Component({
    selector: 'login',
    templateUrl: 'app/view/login.html',
    providers:[LoginService]
})
 
export class LoginComponent implements OnInit{
    public titulo: string="Identificate";
    public user;
    public errorMessage;
    public identity;
    public token;
    constructor(
        private _loginService: LoginService
    ){}

    ngOnInit(){
        this.user={
            "email":"",
            "password":"",
            "getHash":"false"
        };
    }

    onSubmit(){
        console.log(this.user);
        this._loginService.signup(this.user).subscribe(
            response =>{
                let identity =response;
                this.identity=identity;
                if(this.identity.length<=1){
                    alert("Error en el servidor");
                }else{
                    if(!this.identity.status){
                        localStorage.setItem("identity",JSON.stringify(identity));
                        this.user.getHash="true";
                        this._loginService.signup(this.user).subscribe(
                            response =>{
                                let token =response;
                                this.token=token;
                                if(this.token.length<=0){
                                    alert("Error en el servidor");
                                }else{
                                    if(!this.token.status){
                                        localStorage.setItem("token",token);
                                        let ide=this._loginService.getIdentity();
                                        let tk=this._loginService.getToken();
                                        console.log(ide);
                                        console.log(tk);
                                    }
                                }
                            },
                            error=>{
                                this.errorMessage=<any>error;
                                if(this.errorMessage !=null){
                                    console.log(this.errorMessage);
                                    alert("error en la petición");
                                }
                            }
                        );
                    }
                }
            },
            error =>{
                this.errorMessage=<any>error;
                if(this.errorMessage !=null){
                    console.log(this.errorMessage);
                    alert("error en la petición");
                }
            }
        );
    }
}