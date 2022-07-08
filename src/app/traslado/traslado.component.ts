import {Component, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import {Conta19Service} from '../services/conta19.service';
import {Gener02} from '../models/gener02';
import {Conta19_Copia} from '../models/conta19_copia';
import {Router, ActivatedRoute, Params, NavigationExtras} from '@angular/router';
import {Conta19} from '../models/conta19';
import {delay, identity} from 'rxjs';
import {Conta124} from '../models/conta124';
import {Conta123} from '../models/conta123';

@Component({selector: 'app-traslado', templateUrl: './traslado.component.html', styleUrls: ['./traslado.component.css'], providers: [Conta19Service]})
export class TrasladoComponent implements OnInit {
    public token : any;
    public encargado : any;
    public usuario : any;
    public cedtra : any;
    public activos : any;
    public tactivos : any;
    public array : any = [];
    public conta19 : any;
    public lista_activos : any = [];
    public cedtraConsultado : any;
    ao = [];
    ap = [];
    public datosActivos : any;
    constructor(private _conta19Service : Conta19Service, private _router : Router) {
        this.token = JSON.parse(localStorage.getItem("tokenConsultado3") + '');
        this.cedtraConsultado = JSON.parse(localStorage.getItem('tokenConsultado3') + '');
        console.log("dependencia!!!");
        console.log(this.cedtraConsultado);
        this.encargado = this.token['nombre'];
        this.usuario = this.token['usuario'];
        this.cedtra = this.token['cedtra'];

        this.getConta19(this.cedtra);
    }

    ngOnInit(): void {}
    getConta19(cedtra : any) {
        this._conta19Service.getConta19(new Conta19_Copia(cedtra)).subscribe(response => {
            console.log("respuesta");
            console.log(response);
            if (response.status != 'error') {
                this.activos = response;
                console.log("aaaaaa :)")
                console.log(this.activos);
                for (let index = 0; index < this.activos.length; index++) {
                    this.tactivos = index + 1;
                }
            } else {
                this.activos = '';
                Swal.fire('Error', 'No se han encontrado activos', 'info');
                this._router.navigate(['principal']);
            }

        });
    }
    confirmaciones(ao1 : any = [], ap1 : any = []) { // Detalle
        Swal.fire({
            title: '<strong>Estado <u>Activo</u></strong>',
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
    guardar() {
        Swal.fire({
            title: 'Custom width, padding, color, background.',
            width: 600,
            padding: '3em',
            color: '#716add',
            background: '#fff url(/images/trees.png)',
            backdrop: `
          rgba(0,0,123,0.4)
          url("/images/nyan-cat.gif")
          left top
          no-repeat
        `
        })
    }
    submit() {
        if (this.array.length > 0) {
            Swal.fire({

                title: "¿Estas Seguro?",
                text: "Se modificaran los activos",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#4BB543',
                cancelButtonColor: '#EA1737',
                confirmButtonText: 'Iniciar'

            }).then(result => {

                if (result.value) {

                    for (let index = 0; index < this.array.length; index++) {
                        this.conta19 = new Conta19(this.array[index].codact, this.array[index].subcod, this.array[index].codbar, this.ao[index], this.array[index].detalle, this.array[index].codare, this.array[index].coddep, this.array[index].codubi, this.array[index].cedtra, this.array[index].codcen, this.usuario, this.array[index], this.ap[index]);
                        this.lista_activos.push(this.conta19);
                    }

                    for (let index = 0; index < this.lista_activos.length; index++) {
                        for (let index2 = 0; index2 < this.activos.length; index2++) {
                            if (this.lista_activos[index]['codact'] == this.activos[index2]['codact']) {
                                this.activos.splice(index2, 1);
                            }
                        }

                    }
                    console.log("Faltantes!")
                    console.log(this.activos);
                    const navigationExtras: NavigationExtras = {
                        queryParams: {
                            result: JSON.stringify(this.lista_activos),
                            faltantes: JSON.stringify(this.activos)
                        }
                    }
                    Swal.fire('Listo!', 'Activos(s) guardados', 'success');
                    this._router.navigate(['sobrante-conta19'], navigationExtras);
                } else {


                    console.log('yes');
                    Swal.fire('Cancelado!', 'Activos(s) No guardados', 'error');
                }
            })

        } else {

            let timerInterval
            Swal.fire({
                title: 'No ha seleccionado ningun activo!',
                timer: 3000,
                didOpen: () => {},
                willClose: () => {
                    clearInterval(timerInterval);
                    this._router.navigate(['sobrante-conta19']);
                }
            }).then((result) => { /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {}
            })
        }

    }


    onChange($event, result : any) {
        var bandera = false;
        const navigationExtras: NavigationExtras = {
            queryParams: {
                result: JSON.stringify(result)
            }
        }
        const isChecked = $event.target.checked;

        if (isChecked == true) {
            if (this.array.length > 0) {
                for (let index = 0; index <= this.array.length; index++) {
                    if (this.array[index] == result) {
                        console.log(this.array[index]);
                        console.log(result);
                        bandera = true;
                    }
                }
                if (bandera != true) {

                    this.array.push(result);
                    this.confirmaciones(this.ao, this.ap);
                }
            } else {
                this.array.push(result);
                this.confirmaciones(this.ao, this.ap);
            }
        } else {
            for (let index = 0; index <= this.array.length; index++) {
                if (this.array[index] == result) {
                    this.array.splice(index, 1);
                    this.ao.splice(index, 1);
                    this.ap.splice(index, 1);
                }
            }
        }
        for (let index = 0; index < this.array.length; index++) {}
        console.log(this.ao); // estado
        console.log(this.ap); // detalle
        console.log(this.array); // activos
    }

    guardarFaltantes(listaF : any) {
        var lista_success: any = [];
        var bandera: any;
        if (listaF.length > 0) {


            for (let index = 0; index < listaF.length; index++) {

                this._conta19Service.saveConta124(new Conta124('01', listaF[index]['codact'], listaF[index]['subcod'], this.cedtraConsultado.coddep, listaF[index]['est'], 'F', 'F', 'Faltantes')).subscribe(response => {

                    if (response.status == "success") {
                        bandera = true;
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
            }).then((result) => {
                this._router.navigate(['principal']);
            });


        } else {
            Swal.fire('Info!', '¡No existen Activos Faltantes!.', 'info').then((result) => {
                this._router.navigate(['principal']);
            });

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
                for (let index = 0; index < this.array.length; index++) {
                    this.conta19 = new Conta19(this.array[index].codact, this.array[index].subcod, this.array[index].codbar, this.ao[index], this.array[index].detalle, this.array[index].codare, this.array[index].coddep, this.array[index].codubi, this.array[index].cedtra, this.array[index].codcen, this.usuario, this.array[index], this.ap[index]);
                    this.lista_activos.push(this.conta19);
                }

                for (let index = 0; index < this.lista_activos.length; index++) {
                    for (let index2 = 0; index2 < this.activos.length; index2++) {
                        if (this.lista_activos[index]['codact'] == this.activos[index2]['codact']) {
                            this.activos.splice(index2, 1);
                        }
                    }

                }

                if (this.lista_activos.length > 0) {

                    this._conta19Service.saveConta123(new Conta123(this.usuario, this.cedtraConsultado.cedtra, 'A')).subscribe(response => {
                        if (response.status == 'success') {
                            for (let index = 0; index < this.lista_activos.length; index++) {

                                console.log(this.lista_activos[index]['est']['est']);
                                this._conta19Service.saveConta124(new Conta124('01', this.lista_activos[index]['codact'], this.lista_activos[index]['subcod'], this.cedtraConsultado.coddep, this.lista_activos[index]['est']['est'], this.lista_activos[index]['estado'], 'I', this.lista_activos[index]['observacion'])).subscribe(response => {
                                    if (response.status == "success") {

                                        Swal.fire({
                                            position: 'top-end',
                                            icon: 'success',
                                            title: 'Activos Inventariados guardados correctamente!',
                                            showConfirmButton: true,
                                            confirmButtonText: 'Ok'
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                this.guardarFaltantes(this.activos);
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
                        footer: 'Se procedera a guardar los Activos faltantes',
                        showConfirmButton: true,
                        confirmButtonText: 'Ok'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            this.guardarFaltantes(this.activos);
                        }
                    })

                }
            } else if (result.isDenied) {
                Swal.fire('Activos no guardados', '', 'info')
            }
        })
    }

}
