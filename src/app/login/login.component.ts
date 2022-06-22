import { Component, OnInit } from '@angular/core';
import { Gener02 } from '../models/gener02';
import { Gener02Service } from '../services/gener02.service';
import { Router, ActivatedRoute, Params, NavigationExtras} from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [Gener02Service]
})
export class LoginComponent implements OnInit {
  public gener02: Gener02;
  public status: any;
  public token: any;
  public identity: any;
  public v: any = true;
  public arrayN:any = [];


  constructor(
    private _gener02Service: Gener02Service,
    private _router: Router,
    private _route: ActivatedRoute
    ) {
      this.gener02 = new Gener02('', '','');
     }

  ngOnInit(): void {
  }
  olvidoC(){
    Swal.fire('¿Olvido la Contraseña?', 'Por favor comunicarse con la oficina de Sistemas e Informatica.','question');
  }
  onSubmit(form: any) {
    var permisos;
    this._gener02Service.signup(this.gener02).subscribe(
      response => {
        //devuelve el token 
        if (response.status != 'error') {
          this.status = 'success';
          this.token = response;
          //objeto usuario identificado
          this._gener02Service.signup(this.gener02, this.v).subscribe(
            response => {
              this.identity = response;

              this.token
              this.identity;

              localStorage.setItem('token',this.token);
              localStorage.setItem('identity', JSON.stringify(this.identity));
              //this.permisos();
              
              //Redirección a principal
              this._router.navigate(['principal']);

            },
            error => {
              this.status = 'error';
              console.log(<any>error);
            }
          );
        } else {
          /* this.status = 'error'; */
          Swal.fire(
            '¡Usuario o Contraseña Incorrectos!',
            'Vuelva a ingresar sus datos',
            'error'
          )
          form.reset();
        }
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    );

  }
  logout(){
    this._route.params.subscribe(
      params=>{
        let logout = +params['sure'];
        if(logout==1){
          localStorage.removeItem('identity');
          localStorage.removeItem('token');
          localStorage.removeItem('tpago');
          localStorage.removeItem('token1');
          localStorage.removeItem('tpa');
          localStorage.removeItem('identity2');
          localStorage.removeItem('identity1');
          localStorage.removeItem('permisos');

          this.identity = '';
          this.token = null;
          if(this.identity==''){
            this._router.navigate(['login']);
          }
        }
      }
    );

  }

}