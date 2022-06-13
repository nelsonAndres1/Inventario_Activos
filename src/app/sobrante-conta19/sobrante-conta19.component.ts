import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {Router, ActivatedRoute, NavigationExtras} from '@angular/router';
import {Conta19Service} from '../services/conta19.service';
import Swal from 'sweetalert2';
import {delay} from 'rxjs';
@Component({selector: 'app-sobrante-conta19', templateUrl: './sobrante-conta19.component.html', styleUrls: ['./sobrante-conta19.component.css'], providers: [Conta19Service]})
export class SobranteConta19Component implements OnInit {
    data : any;
    listaSobrantes : any = [];
    ao = [];
    ap = [];
    bandera = false;
    public cedtraConsultado : any;
    constructor(private _conta19Service : Conta19Service, private route : ActivatedRoute) {
        this.cedtraConsultado = JSON.parse(localStorage.getItem('tokenConsultado') + '');

        this.route.queryParams.subscribe(response => {
            const paramsData = JSON.parse(response['result']);
            console.log("params data");
            console.log(paramsData);
        })

    }

    ngOnInit(): void {}

    getConta19(pclave : any) {
        const keyword = pclave.target.value;
        const search = this._conta19Service.searchConta19(keyword).then(response => {
            this.data = response;
        });
    }

    confirmaciones(ao1 : any = [], ap1 : any = []) { // Detalle
        Swal.fire({
            title: '<strong>Estado <u>activo</u></strong>',
            icon: 'info',
            input: 'select',
            inputOptions: {
                'Estado': {
                    B: 'Bueno',
                    R: 'Regular',
                    D: 'Dañado',
                    O: 'Obsoleto'
                }
            },
            inputPlaceholder: 'Seleccione el estado del activo!',
            showCancelButton: true,
            inputValidator: (value) => {
                return new Promise((resolve) => {
                    if (value == '') {
                        Swal.fire('Error!', 'No ha seleccionado el estado!', 'error');
                        delay(1000);
                        this.confirmaciones(ao1, ap1);
                    } else {
                        console.log(value);
                        Swal.fire('Listo!', 'Ha seleccionado el estado: ' + value, 'success');
                        var bdc = true;
                        ao1.push(value);
                        if (bdc) {
                            this.confirmacionDetalle(ap1);
                        }
                    }
                })
            }

        });
    }
    confirmacionDetalle(ap1 : any = []) {
        Swal.fire({
            title: ' <strong>Ingrese la Observación del <u>Activo</u></strong>',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Continuar',
            showLoaderOnConfirm: true,
            preConfirm: (login) => {
                if (login.length > 199 || login.length == 0) {
                    Swal.fire('Error!', 'Observación Incorrecta.', 'error');
                    this.confirmacionDetalle(ap1);
                } else {
                    ap1.push(login);
                    Swal.fire('Listo!', 'Observación Correcta.', 'success');
                    console.log(login);
                }
            }
        })
    }


    getActivos(result : any) {
        var bandera = false;
        if (this.listaSobrantes.length > 0) {
            for (let index = 0; index < this.listaSobrantes.length; index++) {
                if (this.listaSobrantes[index]['codact'] == result.codact) {
                    bandera = true;
                }
            }
        }
        if (bandera) {
            Swal.fire('Error!', 'Activo ya agregado', 'error');
        } else {
            this.confirmaciones(this.ao, this.ap);

            this.listaSobrantes.push(result);
        }
    }
    deleteActivos(result : any) {
        this.listaSobrantes.splice(result, 1);
    }
}
