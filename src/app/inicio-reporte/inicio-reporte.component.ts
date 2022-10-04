import {Component, OnInit} from '@angular/core';
import {ReporteService} from '../services/reporte.service';
import Swal from 'sweetalert2';
import {Gener02Service} from '../services/gener02.service';
import {Router, ActivatedRoute, NavigationExtras} from '@angular/router';
import {Gener02} from '../models/gener02';
import {Conta123} from '../models/conta123';

@Component({selector: 'app-inicio-reporte', templateUrl: './inicio-reporte.component.html', styleUrls: ['./inicio-reporte.component.css'], providers: [ReporteService]})
export class InicioReporteComponent implements OnInit {
    public datoSe : any = '';
    public datoCe : any = '';
    public data : any;
    public tokenConsultado : any;
    opcionSeleccionado : string = '0';
    verSeleccion : string = '';
    banderaH : any;
    public fechas : any;
    public palabraclave : any;

    constructor(private _reporteService : ReporteService, private router : Router, private _gener02Service : Gener02Service) {}

    ngOnInit(): void {}
    getGener02_(){
        this._reporteService.searchGener02_sub(new Gener02('','',this.palabraclave)).subscribe(
            response=>{
                console.log("respuesta!");
                console.log(response);
                if(response.bandera==true){
                    this.data = [response]; 
                    console.log(response);
                }else{
                    Swal.fire('Usuario No Encontrado', '', 'error')
                }
            }
        )
    }
    getGener02(pclave : any) {
        const keyword = pclave.target.value;

        this.palabraclave = pclave.target.value;
        
    }
    getDatos02(result : any) {
        console.log(result);
        this.datoSe = result.nomemp+' '+result.segnom+' '+result.priape+' '+result.segape;
        this.datoCe = result.docemp;
    }
    capturar() {
        this.verSeleccion = this.opcionSeleccionado;
        console.log(this.verSeleccion);
    }
    consultar(numero : any) {
        console.log(numero);
        const navigationExtras: NavigationExtras = {
            queryParams: {
                result: JSON.stringify(numero)
            }
        }
        localStorage.setItem('numero', JSON.stringify(numero));
        this.router.navigate(['reportes']);
        
    }
    enviarDatos(resultC : any, tr : any) {

        if (tr == '1') {

            this._gener02Service.findGener02(new Gener02('', '', resultC)).subscribe(response => {
                if (response.status != 'error') {
                    this.tokenConsultado = response;
                    console.log(this.tokenConsultado);
                    localStorage.setItem('tokenConsultado2', JSON.stringify(this.tokenConsultado));
                         
                    Swal.fire({
                        title: 'La cedula consultada corresponde a ' + this.tokenConsultado.nombre,
                        showDenyButton: true,
                        showCancelButton: true,
                        confirmButtonText: 'Continuar',
                        denyButtonText: `No Continuar`
                    }).then((result) => {
                        if (result.isConfirmed) {
                            this.banderaH = true;
                            this._reporteService.reportesH(new Conta123('', resultC, '')).subscribe(response => {
                                this.fechas = response;
                            });
                        } else if (result.isDenied) {
                            Swal.fire('Cancelado', '', 'error')
                        }
                    })
                } else {
                    Swal.fire('La Cedula no fue encontrada', 'Verifique y vuelva a ingresar sus datos', 'error');
                }
            });


        } else {


            const navigationExtras: NavigationExtras = {
                queryParams: {
                    result: JSON.stringify(resultC)
                }
            }
            this._gener02Service.findGener02(new Gener02('', '', resultC)).subscribe(response => {
                if (response.status != 'error') {
                    this.tokenConsultado = response;
                    console.log(this.tokenConsultado);
                    localStorage.setItem('tokenConsultado2', JSON.stringify(this.tokenConsultado));
                    Swal.fire({
                        title: 'La cedula consultada corresponde a ' + this.tokenConsultado.nombre,
                        showDenyButton: true,
                        showCancelButton: true,
                        confirmButtonText: 'Continuar',
                        denyButtonText: `No Continuar`
                    }).then((result) => {
                        if (result.isConfirmed) {
                            localStorage.setItem('numero', JSON.stringify(0));
                            this.router.navigate(['reportes'], navigationExtras);
                        } else if (result.isDenied) {
                            Swal.fire('Cancelado', '', 'error')
                        }
                    })
                } else {
                    Swal.fire('La Cedula no fue encontrada', 'Verifique y vuelva a ingresar sus datos', 'error');
                }
            });
        }
    }

    Consultar() {
        let bandera = true;
        if (this.datoCe == '') {
            Swal.fire('¡Error!', 'No ha seleccionado un Usuario', 'error');
            bandera = false;
        }
        if (this.verSeleccion == '') {
            Swal.fire('¡Error!', 'No ha seleccionado un Tipo de Reporte', 'error');
            bandera = false;
        }

        if (bandera) {
            this.enviarDatos(this.datoCe, this.verSeleccion);
        } else {
            Swal.fire('¡Información!', 'Verifique los datos!', 'info');
        }

    }


}
