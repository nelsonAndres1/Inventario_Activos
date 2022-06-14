import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {Router, ActivatedRoute, NavigationExtras} from '@angular/router';
import {Conta19Service} from '../services/conta19.service';
import Swal from 'sweetalert2';
import {delay} from 'rxjs';
import {Conta124} from '../models/conta124';
@Component({selector: 'app-sobrante-conta19', templateUrl: './sobrante-conta19.component.html', styleUrls: ['./sobrante-conta19.component.css'], providers: [Conta19Service]})
export class SobranteConta19Component implements OnInit {
    data : any;
    listaSobrantes : any = [];
    ao = [];
    ap = [];
    bandera = false;
    public cedtraConsultado : any;
    public inventariados : any = [];
    public statusInv : any;
    constructor(private _conta19Service : Conta19Service, private route : ActivatedRoute) {
        this.cedtraConsultado = JSON.parse(localStorage.getItem('tokenConsultado') + '');
        console.log(this.cedtraConsultado.coddep)
        this.route.queryParams.subscribe(response => {
            console.log(response['result']);
            if (response['result'] == undefined) {} else {
                const paramsData = JSON.parse(response['result']);
                console.log("params data");
                console.log(paramsData);
                this.inventariados = paramsData;
            }
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
            console.log("sobrantes");
            console.log(this.listaSobrantes);
            console.log("permisos1");
            console.log(this.ao);
            console.log("permisos2");
            console.log(this.ap);
        }
    }
    deleteActivos(result : any) {
        this.listaSobrantes.splice(result, 1);
        this.ao.splice(result, 1);
        this.ap.splice(result, 1);
        console.log("sobrantes");
        console.log(this.listaSobrantes);
        console.log("permisos1");
        console.log(this.ao);
        console.log("permisos2");
        console.log(this.ap);
    }
    guardarSobrantes(listaS : any = []) {
        if (listaS.length > 0) {
            for (let index = 0; index < listaS.length; index++) {
                console.log("lista: " + index);
                console.log(listaS[index]);
                console.log(this.ao[index]);
                console.log(this.ap[index]);
                
                this._conta19Service.saveConta124(new Conta124('01',listaS[index]['codact'],listaS[index]['subcod'],this.cedtraConsultado.coddep,listaS[index]['estado'],this.ao[index],'S',this.ap[index])).subscribe(response =>{
                    if(response.status == "success"){
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Activos Sobrantes guardados correctamente!',
                            showConfirmButton: false,
                            timer: 1500
                        }) 
                    }else{
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'Activos Sobrantes NO guardados!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
            }

        } else {
            Swal.fire('Info!', '¡No existen Activos Sobrantes!.', 'info');
        }
    }
    onSubmit() {
        Swal.fire({
            title: '¿Estas seguro de guardar los cambios?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            denyButtonText: `No Guardar`
        }).then((result) => {
            if (result.isConfirmed) { // primero se guardaran los inventariados
                if (this.inventariados.length > 0) {
                    for (let index = 0; index < this.inventariados.length; index++) {

                        console.log(this.inventariados[index]['est']['est']);
                        this._conta19Service.saveConta124(new Conta124('01', this.inventariados[index]['codact'], this.inventariados[index]['subcod'], this.inventariados[index]['codact'], this.inventariados[index]['est']['est'], this.inventariados[index]['estado'], 'I', this.inventariados[index]['observacion'])).subscribe(response => {
                            if (response.status == "success") {

                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Activos Inventariados guardados correctamente!',
                                    showConfirmButton: true,
                                    confirmButtonText: 'Ok',
                                }).then((result)=>{
                                    if(result.isConfirmed){
                                        this.guardarSobrantes(this.listaSobrantes);
                                    }
                                });
                            } else {
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'error',
                                    title: 'Activos Inventariados NO guardados!',
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                            }
                        })
                    }
                } else {

                    Swal.fire({
                        icon: 'info', 
                        title: 'Información', 
                        text: 'No existen Activos inventariados!', 
                        footer: 'Se procedera a guardar los Activos sobrantes y faltantes',
                        showConfirmButton: true,
                        confirmButtonText: 'Ok'
                    }).then((result)=>{
                        if(result.isConfirmed){
                            this.guardarSobrantes(this.listaSobrantes);
                        }
                    })
                    
                }

                // this._conta19Service.saveConta124(new Conta124())

            } else if (result.isDenied) {
                Swal.fire('Activos no guardados', '', 'info')
            }
        })
    }
}
