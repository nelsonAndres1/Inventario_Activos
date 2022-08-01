import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Conta19Service } from '../services/conta19.service';
import Swal from 'sweetalert2';
import { delay } from 'rxjs';
import { Conta124 } from '../models/conta124';
import { Conta123 } from '../models/conta123';
import { Gener02 } from '../models/gener02';
import { Conta65 } from '../models/conta65';
import { Conta65_copia } from '../models/conta65_copia';
import { Conta19 } from '../models/conta19';
import { TrasladoService } from '../services/traslado.service';

@Component({ selector: 'app-sobrante-conta19', templateUrl: './sobrante-conta19.component.html', styleUrls: ['./sobrante-conta19.component.css'], providers: [Conta19Service, TrasladoService] })
export class SobranteConta19Component implements OnInit {
    data: any;
    listaSobrantes: any = [];
    ao = [];
    ap = [];
    bandera = false;
    public cedtraConsultado: any;
    public inventariados: any = [];
    public statusInv: any;
    public usuario: any;
    public faltantes: any;
    public documento: any;
    public consultado: any;
    public ubicaciones: any;
    constructor(private _conta19Service: Conta19Service, private route: ActivatedRoute, private _router: Router, private _trasladoService: TrasladoService) {
        this.cedtraConsultado = JSON.parse(localStorage.getItem('tokenConsultado') + '');
        this.consultado = JSON.parse(localStorage.getItem('tokenConsultado') + '');
        this.usuario = JSON.parse(localStorage.getItem('identity') + '');
        this._conta19Service.getCedTra(new Gener02('', '', this.cedtraConsultado.cedtra)).subscribe(response => { })
        this.getConta116(this.cedtraConsultado.coddep);
        this._conta19Service.getDocumentoConta65({}).subscribe(response => {
            this.documento = response;
            console.log("respuesta documento");
            console.log(response);
        })
        console.log(this.cedtraConsultado.coddep)
        this.route.queryParams.subscribe(response => {
            if (response['result'] == undefined) { } else {
                const paramsData = JSON.parse(response['result']);
                const faltantes = JSON.parse(response['faltantes']);
                this.faltantes = faltantes;
                this.inventariados = paramsData;

            }
            /*             console.log("inventariados");
                        console.log(this.inventariados[0]['detalleGeneral']); */

        })
    }

    ngOnInit(): void { }
    dependencia(){
        console.log("Holaaaaaa!")
    }

    getConta19(pclave: any) {
        const keyword = pclave.target.value;
        const search = this._conta19Service.searchConta19(keyword).then(response => {
            this.data = response;
            console.log(this.data);
        });
    }

    conta65(codact: any, cedtra: any, usuario: any, detalle: any, FoS: any) {
        var coddep: any;
        var coddeoV: any;
        var aredes = '';
        this._conta19Service.consultConta65(new Conta65(codact, cedtra)).subscribe(response => {
            console.log(response);
            /*             if (response.aredes != "") { */
            coddep = this.consultado.coddep;
            coddeoV = this.consultado.coddep;
            console.log("codep");
            console.log(coddep);
            console.log("coddep*2");
            coddep = coddep.split('');
            console.log(coddep);
            console.log("aredes");

            aredes = coddep[0].concat(coddep[1]);
            console.log(aredes);
            if (FoS == 'F') { } else if (FoS == 'I') { } else {

                this._conta19Service.saveConta65(new Conta65_copia('01', this.documento, usuario, response.codact, response.subcod, detalle, response.areori, response.depori, response.ubiori, response.cedori, aredes, coddeoV, FoS, this.cedtraConsultado.cedtra, response.estado)).subscribe(response2 => {
                    if (response2.status == 'success') {
                        console.log("sipiiii sobrantes");
                        response2.aredes,
                            response2.depdes,
                            this._conta19Service.updateConta19(new Conta19(response.codact, '', '', '', '', aredes, coddeoV, FoS, this.cedtraConsultado.cedtra, '', usuario, '', '')).subscribe(response => {
                                console.log("respuesta!")
                                console.log(response);
                            })
                    }

                })
            }
            /* } */
        });
    }

    confirmaciones(ao1: any = [], ap1: any = []) { // Detalle
        let bandera=false;
        Swal.fire({
            title: '<strong>Estado <u>activo</u></strong>',
            icon: 'info',
            input: 'select',
            allowOutsideClick: false,
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
                        value='B';
                        ao1.push(value);
                        var bdc = true;
                        ao1.push(value);
                        if (bdc) {
                            this.confirmacionDetalle(ap1);
                        }
                        //this.confirmaciones(ao1, ap1);
                        bandera=true;
                    } else {
                        console.log(value);
                        Swal.fire('Listo!', 'Ha seleccionado el estado: ' + value, 'success');
                        var bdc = true;
                        ao1.push(value);
                        if (bdc) {
                            this.confirmacionDetalle(ap1);
                        }
                        bandera=true;
                    }

                })
           
            }

        });
    }
    confirmacionDetalle(ap1: any = []) {
        Swal.fire({
            title: ' <strong>Ingrese la Observación del <u>Activo</u></strong>',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Continuar',
            allowOutsideClick: false,
            showLoaderOnConfirm: true,
            preConfirm: (login) => {
                if (login.length > 199) {
                    Swal.fire('Error!', 'Observación Incorrecta.', 'error');
                    this.confirmacionDetalle(ap1);
                }else if(login.length==0){
                    login='SO';
                    ap1.push(login);
                }else {
                    ap1.push(login);
                    Swal.fire('Listo!', 'Observación Correcta.', 'success');
                }
            }
        })
    }


    getActivos(result: any) {
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
    deleteActivos(result: any) {
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
    guardarFaltantes(listaF: any) {
        var lista_success: any = [];
        var bandera: any;
        if (listaF.length > 0) {


            for (let index = 0; index < listaF.length; index++) {

                this._conta19Service.saveConta124(new Conta124('01', listaF[index]['codact'], listaF[index]['subcod'], this.cedtraConsultado.coddep, listaF[index]['est'], 'F', 'F', 'Faltantes')).subscribe(response => {

                    if (response.status == "success") {

                        bandera = true;
                        this.conta65(listaF[index]['codact'], this.cedtraConsultado.cedtra, this.usuario.sub, 'F', 'F');

                    } else {

                        bandera = false;
                    }
                })
            }

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Activos Faltantes guardados correctamente!',
                showConfirmButton: false,
                timer: 1500,
                confirmButtonText: 'Look up'
            });

        } else {
            Swal.fire('Info!', '¡No existen Activos Faltantes!.', 'info');

        }
    }
    getConta116(depdes: any) {

        this._trasladoService.getConta116(new Conta19('', '', '', '', '', '', depdes, '', '', '', '', '', '')).subscribe(
            response => {
                console.log("respuesta de ubides");
                this.ubicaciones = response;
                console.log(this.ubicaciones);
            }
        )
    }

    guardarSobrantes(listaS: any) {
        
        let ubi2: any = []
        for (let index = 0; index < this.ubicaciones.length; index++) {
            console.log("respuesta11111111111111111111111111!");
            console.log(this.ubicaciones[index].codubi);
            ubi2.push(this.ubicaciones[index].codubi);

        }

        console.log("ubidos");
        console.log(ubi2);

        let ubides: any;
        if (listaS.length > 0) {
            Swal.fire({
                title: 'Por favor ingrese la ubicación de destino de los Activos Sobrantes',
                input: 'select',
                inputOptions: ubi2,
                inputAttributes: {
                    autocapitalize: 'off'
                },
                showCancelButton: false,
                confirmButtonText: 'Enviar',
                showLoaderOnConfirm: true,
                allowOutsideClick: false,
                ////aquiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
                preConfirm: (login) => {
                    ubides = login;
                    Swal.fire({
                        title: 'Por favor ingrese el detalle del traslado de sobrantes',
                        input: 'text',
                        inputAttributes: {
                            autocapitalize: 'off'
                        },
                        showCancelButton: false,
                        confirmButtonText: 'Enviar',
                        showLoaderOnConfirm: true,
                        allowOutsideClick: false,
                        preConfirm: (detalle) => {
                            if(detalle.length>0){

                            }else{
                                detalle='SIN DETALLE';
                            }
                            for (let index = 0; index < listaS.length; index++) {
                                console.log("lista: " + index);
                                console.log(listaS[index]);
                                console.log(this.ao[index]);
                                console.log(this.ap[index]);
                                console.log("esteeeeeeeeeeeeeeeeeeee");
                                //aquiiiiiiiiiiii!
                                console.log(new Conta124('01', listaS[index]['codact'], listaS[index]['subcod'], this.cedtraConsultado.coddep, listaS[index]['estado'], this.ao[index], 'S', this.ap[index]));
                                this._conta19Service.saveConta124(new Conta124('01', listaS[index]['codact'], listaS[index]['subcod'], this.cedtraConsultado.coddep, listaS[index]['estado'], this.ao[index], 'S', this.ap[index])).subscribe(response => {
                                    if (response.status == "success") {
                                        this.conta65(listaS[index]['codact'], this.cedtraConsultado.cedtra, this.usuario.sub, detalle, ubides);


                                        Swal.fire({
                                            position: 'top-end',
                                            icon: 'success',
                                            title: 'Activos Sobrantes guardados correctamente!',
                                            showConfirmButton: true,
                                            confirmButtonText: 'Ok'

                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                
                                                console.log("Faltantes.... ",this.faltantes);

                                                this.guardarFaltantes(this.faltantes);
                                            }
                                        });
                                    } else {
                                        Swal.fire({
                                            position: 'top-end',
                                            icon: 'error',
                                            title: 'Activos Sobrantes NO guardados!',
                                            showConfirmButton: true,
                                            confirmButtonText: 'Ok'
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                console.log("Faltantes.... ",this.faltantes);
                                                this.guardarFaltantes(this.faltantes);
                                            }
                                        })
                                    }
                                })
                            }

                        }
                    })


                }
            });


        } else {
            Swal.fire('Info!', '¡No existen Activos Sobrantes!.', 'info');
            this.guardarFaltantes(this.faltantes);
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
            if (result.isConfirmed) {
                if (this.inventariados.length > 0) {

                    this._conta19Service.saveConta123(new Conta123(this.usuario.sub, this.cedtraConsultado.cedtra, 'A')).subscribe(response => {
                        if (response.status == 'success') {
                            for (let index = 0; index < this.inventariados.length; index++) {

                                console.log(this.inventariados[index]['est']['est']);

                                this.conta65(this.inventariados[index]['codact'], this.cedtraConsultado.cedtra, this.usuario.sub, this.inventariados[index]['observacion'], 'I');
                                console.log("esteeeeeeeeeeeeeeee!");
                                console.log(new Conta124('01', this.inventariados[index]['codact'], this.inventariados[index]['subcod'], this.cedtraConsultado.coddep, this.inventariados[index]['est']['est'], this.inventariados[index]['estado'], 'I', this.inventariados[index]['observacion']));
                                this._conta19Service.saveConta124(new Conta124('01', this.inventariados[index]['codact'], this.inventariados[index]['subcod'], this.cedtraConsultado.coddep, this.inventariados[index]['est']['est'], this.inventariados[index]['estado'], 'I', this.inventariados[index]['observacion'])).subscribe(response => {
                                    if (response.status == "success") {

                                        Swal.fire({
                                            position: 'top-end',
                                            icon: 'success',
                                            title: 'Activos Inventariados guardados correctamente!',
                                            showConfirmButton: true,
                                            confirmButtonText: 'Ok'
                                        }).then((result) => {
                                            if (result.isConfirmed) {
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
                        }
                    })
                } else {

                    Swal.fire({
                        icon: 'info',
                        title: 'Información',
                        text: 'No existen Activos inventariados!',
                        footer: 'Se procedera a guardar los Activos sobrantes y faltantes',
                        showConfirmButton: true,
                        confirmButtonText: 'Ok'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            this.guardarSobrantes(this.listaSobrantes);
                        }
                    })

                }
            } else if (result.isDenied) {
                Swal.fire('Activos no guardados', '', 'info')
            }
        })
    }
}
