import {Component, OnInit} from '@angular/core';
import {ReporteService} from '../services/reporte.service';
import {Gener02Service} from '../services/gener02.service';
import {Gener02} from '../models/gener02';
import Swal from 'sweetalert2';
import {Router, ActivatedRoute, Params, NavigationExtras} from '@angular/router';

@Component({
    selector: 'app-inicio-traslado',
    templateUrl: './inicio-traslado.component.html',
    styleUrls: ['./inicio-traslado.component.css'],
    providers: [ReporteService, Gener02Service]
})
export class InicioTrasladoComponent implements OnInit {

    public data : any;
    public datoSe : any = '';
    public datoCe : any = '';
    public tokenConsultado : any;
    public identityConsultado : any;
    constructor(private _reporteService : ReporteService, private _gener02Service : Gener02Service, private _router : Router) {}

    ngOnInit(): void {}
    getGener02(pclave : any) {
        const keyword = pclave.target.value;
        const search = this._reporteService.searchGener02(keyword).then(response => {
            this.data = response;
        })
    }
    getDatos02(result : any) {
        console.log(result);
        this.datoSe = result.nomemp+' '+result.segnom+' '+result.priape+' '+result.segape;
        this.datoCe = result.docemp;
        this.Consultar();
    }
    Consultar() {
        this._gener02Service.findGener02(new Gener02('', '', this.datoCe)).subscribe(response => {
            if (response.status != 'error') {
                this.tokenConsultado = response;
                console.log("Token consultado");
                console.log(this.tokenConsultado);
                localStorage.setItem('tokenConsultado3', JSON.stringify(this.tokenConsultado));
                Swal.fire({
                    title: 'La cedula consultada corresponde a ' + this.tokenConsultado.nombre,
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Continuar',
                    denyButtonText: `No Continuar`
                }).then((result) => {
                    if (result.isConfirmed) {
                        this._router.navigate(['traslado']);
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
