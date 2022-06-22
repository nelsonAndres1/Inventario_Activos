import {Component, OnInit} from '@angular/core';
import {ReporteService} from '../services/reporte.service';
import {Conta123} from '../models/conta123';
import Swal from 'sweetalert2';
import {ActivatedRoute} from '@angular/router';
import { Model0 } from '../models/model0';

@Component({selector: 'app-reportes', templateUrl: './reportes.component.html', styleUrls: ['./reportes.component.css'], providers: [ReporteService]})
export class ReportesComponent implements OnInit {
    public serviceUrl : string;
    public reportPath : string;
    public activos : any = [];
    public activosF : any = [];
    public activosS : any = [];
    public activosI : any = [];
    public token : any;
    public encargado : any;
    public usuario : any;
    public cedtra : any;
    public mes : any;
    public ano : any;
    public data : any;
    public itemDetail : any;
    constructor(private _reporteService : ReporteService, private route : ActivatedRoute) {

        this.token = JSON.parse(localStorage.getItem("tokenConsultado2") + '');
        this.encargado = this.token['nombre'];
        this.usuario = this.token['usuario'];
        this.cedtra = this.token['cedtra'];
        let date: Date = new Date();
        this.ano = date.getFullYear();

        this.mes = date.getMonth();
        this.serviceUrl = '';
        this.reportPath = '~/Resources/docs/sales-order-detail.rdl';

        this.token = JSON.parse(localStorage.getItem("numero") + '');
        if(this.token==0){
            console.log("sii!");
            this._reporteService.reportes(new Conta123('', this.cedtra,'')).subscribe(response => {
                this.activos = response;
    
                for (let index = 0; index < this.activos.length; index++) {
                    if (this.activos[index]['estado'] == 'I') {
                        this.activosI.push(this.activos[index]);
                    } else if (this.activos[index]['estado'] == 'F') {
                        this.activosF.push(this.activos[index]);
                    } else {
                        this.activosS.push(this.activos[index]);
                    }
                }
    
            });
        }else{
            console.log("Noo!");
            this._reporteService.reportesH2(new Model0(this.token)).subscribe(
                response=>{
                    this.activos = response;
    
                    for (let index = 0; index < this.activos.length; index++) {
                        if (this.activos[index]['estado'] == 'I') {
                            this.activosI.push(this.activos[index]);
                        } else if (this.activos[index]['estado'] == 'F') {
                            this.activosF.push(this.activos[index]);
                        } else {
                            this.activosS.push(this.activos[index]);
                        }
                    }
                }
            )
        }


    }

    ngOnInit(): void {}


}
