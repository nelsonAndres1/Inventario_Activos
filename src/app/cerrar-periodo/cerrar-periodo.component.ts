import { Component, OnInit } from '@angular/core';
import { Conta148Service } from '../services/conta148.service';
import { Conta148 } from '../models/conta148';
import { Periodos } from '../models/Periodos';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cerrar-periodo',
  templateUrl: './cerrar-periodo.component.html',
  styleUrls: ['./cerrar-periodo.component.css'],
  providers: [Conta148Service]
})
export class CerrarPeriodoComponent implements OnInit {

  periodos: any;
  opcionSeleccionado: string = '0';
  verSeleccion: string = '';

  constructor(private conta148Service: Conta148Service) {
    this.conta148Service.getConta148(new Conta148('', '', '', '')).subscribe(
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
          this.conta148Service.Cerrar_Periodo(new Periodos(this.periodos[index].periodo, this.periodos[index].fecini, this.periodos[index].fecfin)).subscribe(
            response => {

              console.log("respuesta!");
              
              console.log(response);
              
            }
          )

        }

      }



    }
    console.log(this.verSeleccion);

  }

  ngOnInit(): void {
  }

}
