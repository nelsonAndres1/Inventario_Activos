import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Gener02Service } from '../services/gener02.service';
import { Gener02 } from '../models/gener02';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [Gener02Service]
})
export class HomeComponent implements OnInit {
  public identity;
    public permis: any;
    public token;
  constructor(private _gener02Service: Gener02Service, private _router: Router, private _route: ActivatedRoute) {
    this.identity = this._gener02Service.getIdentity();
        this.token = this._gener02Service.getToken();
  }

  public status: any;
  public tokenConsultado: any;
  public identityConsultado: any;
  ngOnInit(): void { }
  opcion2() {
    this._router.navigate(['opcion2']);
  }
  opcion3(){
    this._router.navigate(['consulta']); 
  }

  alerta() {
    Swal.fire({
      title: 'Ingrese cedula a consultar',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        this._gener02Service.findGener02(new Gener02('', '', login)).subscribe(response => {
          if (response.status != 'error') {
            this.tokenConsultado = response;
            console.log("Token consultado");
            console.log(this.tokenConsultado);
            localStorage.setItem('tokenConsultado', JSON.stringify(this.tokenConsultado));
            Swal.fire({
              title: 'La cedula consultada corresponde a ' + this.tokenConsultado.nombre,
              showDenyButton: true,
              showCancelButton: true,
              confirmButtonText: 'Continuar',
              denyButtonText: `No Continuar`
            }).then((result) => {
              if (result.isConfirmed) {
                this._router.navigate(['conta19']);
              } else if (result.isDenied) {
                Swal.fire('Cancelado', '', 'error')
              }
            })
          } else {
            Swal.fire('La Cedula no fue encontrada', 'Verifique y vuelva a ingresar sus datos', 'error');
          }
        });
      }
    })
  }
  reportes() {
    this._router.navigate(['inicio-reporte']);
  }
  inicio_traslado() {
    this._router.navigate(['inicio-traslado']);
  }

  crear_periodo(){
    this._router.navigate(['crear-periodo']);
  }
  cerrar_periodo(){
    this._router.navigate(['cerrar-periodo']);
  }

  reporte_general(){
    this._router.navigate(['reporte-general']);
  }

  salir() {

    Swal.fire({
        icon: 'warning',
        title: 'Salida',
        text: '¿Estas seguro de salir?',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!'
    }).then((result) => {
        if (result.isConfirmed) {

            localStorage.removeItem('identity');
            localStorage.removeItem('token');
            localStorage.removeItem('tpago');
            localStorage.removeItem('token1');
            localStorage.removeItem('tpa');
            localStorage.removeItem('identity2');
            localStorage.removeItem('identity1');
            localStorage.removeItem('permisos');
            localStorage.removeItem('tokenConsultado');
            localStorage.removeItem('tokenConsultado2');
            localStorage.removeItem('numero');

            this.identity = null;
            this.token = null;
            if (this.identity == null) {

                console.log(this.identity);
                this._router.navigate(['login']);
            }
        }
    });




}

}
