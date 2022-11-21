import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Conta19Service } from '../services/conta19.service';
import Swal from 'sweetalert2';
import { Gener02 } from '../models/gener02';
import { TrasladoService } from '../services/traslado.service';
import { ReporteService } from '../services/reporte.service';
import { Conta19 } from '../models/conta19';

@Component({
    selector: 'app-consulta',
    templateUrl: './consulta.component.html',
    styleUrls: ['./consulta.component.css'],
    providers: [Conta19Service, TrasladoService, ReporteService]
})
export class ConsultaComponent implements OnInit {

    data: any;
    listaSobrantes: any = [];
    ao = [];
    ap = [];
    bandera = false;



    public documento: any;
    public nombre: any;
    public vacio: any = null;
    public data_nombre: any;

    public codigo: any;
    public detalle: any;
    public ubicacion: any;
    public encargado: any;
    public estado: any;
    public clase_activo: any;
    public claact: any;

    constructor(private _conta19Service: Conta19Service, private route: ActivatedRoute, private _router: Router, private _trasladoService: TrasladoService, private _reporteService: ReporteService) {
        this._conta19Service.getDocumentoConta65({}).subscribe(response => {
            this.documento = response;
            console.log("respuesta documento");
            console.log(response);
        })

    }


    ngOnInit(): void { }
    dependencia(cedtra) {
        console.log("cedtra!");
        console.log(cedtra);
        this._reporteService.searchGener02_sub(new Gener02('', '', cedtra)).subscribe(
            response => {

                if (response.bandera == true) {
                    this.data_nombre = [response];
                    console.log(response);

                    Swal.fire('Usuario Encontrado: ' + response.nomemp + ' ' + response.segnom + ' ' + response.priape + ' ' + response.segape, '', 'info')


                } else {
                    Swal.fire('Usuario No Encontrado', '', 'error')
                }
            }
        )
    }


    traernombre(cedtra: any) {
        this._conta19Service.traer_nombre(new Gener02('', '', cedtra)).subscribe(
            response => {
                this.nombre = response
            }
        )
        return this.nombre.nombre;
    }

    getConta19(pclave: any) {
        const keyword = pclave.target.value;
        const search = this._conta19Service.searchConta19(keyword).then(response => {
            this.data = response;
            console.log(this.data);
        });
    }


    estados(letra:any){

        if(letra == 'A'){
            return "ACTIVO";
        }else if(letra == 'B'){
            return "BAJA";
        }else if(letra == 'D'){
            return "DEPRECIADO";
        }else if(letra == 'I'){
            return "INACTIVO";
        }else{
            return "N/A";
        }
    }


    getActivos(result: any) {

        this._conta19Service.getConta19_(new Conta19(result.codact,'','','','','','','','','','','','')).subscribe(
            response =>{
                console.log("respuestaaaaaaaaaaaaaaaaaa!");
                console.log(response);
                this.codigo = result.codact;
                this.detalle = result.detalle;
                this.encargado = result.cedtra;
                
                this.estado = this.estados(result.estado);
                this.clase_activo = response;
                this.claact = this.clase_activo[0].claact;
                this.nombre = this.clase_activo[0].nombre;
                this.ubicacion = this.clase_activo[0].coddep;
                console.log("pruebaaa!");
                console.log(this.clase_activo);
            },
            error=>{

                console.log(error);
            }
            
        )
       

    }
}
