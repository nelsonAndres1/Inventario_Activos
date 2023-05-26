import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import { ReporteService } from '../services/reporte.service';
@Component({
  selector: 'app-reporte-general-pdf',
  templateUrl: './reporte-general-pdf.component.html',
  styleUrls: ['./reporte-general-pdf.component.css'],
  providers: [ReporteService]

})
export class ReporteGeneralPDFComponent implements OnInit {

  public name = 'REPORTE GENERAL.XLSX';
  public reportados: any;
  public faltantes: any = [];
  public sobrantes: any = [];
  public output:any = [];
  constructor(private _router: Router, private _reporteService: ReporteService) {
    this.reportados = JSON.parse(localStorage.getItem("reportados") + '');
    this.asignacion_detalle(this.reportados);
    
  }

  ngOnInit(): void {
  }
  exportToExcel(): void {
    this._reporteService.dowloadExcel(this.sobrantes,'inventario');
    this._reporteService.dowloadExcel(this.sobrantes,'faltantes');
  }

  asignacion_detalle(activos: any) {

    for (let index = 0; index < activos.length; index++) {
      if (activos[index].estinv == 'I' || activos[index].estinv == 'Z') {
        this.sobrantes.push(activos[index]);
      } if (activos[index].estinv == 'F') {
        this.faltantes.push(activos[index]);
      }
    }
  }

  detalles(detalle: any) {
    if (detalle == 'F') {
      return "FALTANTE";
    }
    if (detalle == 'B') {
      return "BUENO";
    }
    if (detalle == 'D') {
      return "DAÑADO";
    }
    if (detalle == 'R') {
      return "REGULAR";
    }
    if (detalle == 'O') {
      return "OBSOLETO";
    } else {
      return "SIN OBSERVACION";
    }
  }

}
