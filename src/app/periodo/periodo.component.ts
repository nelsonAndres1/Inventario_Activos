import { Component, OnInit } from '@angular/core';
import { Conta148 } from '../models/conta148';
import { Conta148Service } from '../services/conta148.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-periodo',
  templateUrl: './periodo.component.html',
  styleUrls: ['./periodo.component.css'],
  providers: [Conta148Service]
})
export class PeriodoComponent implements OnInit {
  public conta148: Conta148;
  constructor(private conta148Service: Conta148Service) {
    this.conta148 = new Conta148('', '', '','A');
  }

  ngOnInit(): void {
  }
  onSubmit(form) {
    console.log("formulario");
    console.log(this.conta148);

    this.conta148Service.saveConta148(this.conta148).subscribe(
      response => {
        console.log(response);
        Swal.fire(
          'Informacion!',
          response.message,
          response.bandera
        );
        this.conta148 = new Conta148('', '', '','');
      },
      error => {
        Swal.fire(
          'Error!',
          'Perido ya existe!',
          'error'
        );
        this.conta148 = new Conta148('', '', '','');
      }
    );
  }

}
