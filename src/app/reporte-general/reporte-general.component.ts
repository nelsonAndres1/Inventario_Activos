import { Component, OnInit } from '@angular/core';
import { Conta148Service } from '../services/conta148.service';
import { Conta148 } from '../models/conta148';
import { Periodos } from '../models/Periodos';
import Swal from 'sweetalert2';
import { ReporteService } from '../services/reporte.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-reporte-general',
  templateUrl: './reporte-general.component.html',
  styleUrls: ['./reporte-general.component.css'],
  providers: [Conta148Service, ReporteService]
})
export class ReporteGeneralComponent implements OnInit {

  periodos: any;
  opcionSeleccionado: string = '0';
  verSeleccion: string = '';
  public respuesta: any;
  public name='REPORTE GENERAL';

  constructor(private conta148Service: Conta148Service, private reporteService: ReporteService, private _route: Router) {
    this.conta148Service.getConta148_C(new Conta148('', '', '', '')).subscribe(
      response => {
        this.periodos = response;
        console.log("periodos");
        console.log(this.periodos);
      }
    );

  }

  capturar() {
    this.verSeleccion = this.opcionSeleccionado;
    console.log(this.verSeleccion);
  }

  submit() {

    if (this.verSeleccion == '') {
      Swal.fire(
        'Error',
        'Seleccione una opción!',
        'error'
      );



    } else {
      Swal.fire(
        'Información',
        'Ha seleccionado el periodo: ' + this.verSeleccion,
        'success'
      );

      for (let index = 0; index < this.periodos.length; index++) {
        if (this.periodos[index].periodo == this.verSeleccion) {
          console.log("periodos");
          console.log(new Periodos('', this.periodos[index].fecini, this.periodos[index].fecfin));
          this.reporteService.reporte_general(new Periodos('', this.periodos[index].fecini, this.periodos[index].fecfin)).subscribe(
            response => {

              console.log("respuesta!");
              this.respuesta = response;
              console.log(this.respuesta);


              localStorage.setItem('reportados', JSON.stringify(this.respuesta));
              this._route.navigate(['reporte-general-pdf']);

            }
          )

        }

      }



    }
    console.log(this.verSeleccion);

  }

  ngOnInit(): void {
  }
  exportToExcel(): void {
    let element = document.getElementById('season-tble');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }

}
