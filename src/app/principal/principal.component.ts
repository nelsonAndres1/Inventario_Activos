import {Component, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import {Gener02Service} from '../services/gener02.service';
import {Gener02} from '../models/gener02';
import {Router, ActivatedRoute, Params, NavigationExtras} from '@angular/router';

@Component({selector: 'app-principal', templateUrl: './principal.component.html', styleUrls: ['./principal.component.css'], providers: [Gener02Service]})
export class PrincipalComponent implements OnInit {

    constructor(private _gener02Service : Gener02Service, private _router : Router, private _route : ActivatedRoute) {}
    public status : any;
    public tokenConsultado : any;
    public identityConsultado : any;
    ngOnInit(): void {}
    opcion2(){
        this._router.navigate(['opcion2']);
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
    info() {
        Swal.fire('Desarrollo', 'Desarrollado por la Oficina de Sistemas e Informatica.','info');
    }
}
