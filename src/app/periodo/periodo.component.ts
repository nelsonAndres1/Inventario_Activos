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
  public periodos: any = [];
  public dependencias: any = [];
  constructor(private conta148Service: Conta148Service) {
    this.conta148 = new Conta148('', '', '', 'A','');
    this.dependencias_periodos();
  }

  ngOnInit(): void {
  }
  onSubmit(form) {
    this.conta148Service.saveConta148(this.conta148).subscribe(
      response => {
        console.log(response);
        Swal.fire(
          'Informacion!',
          response.message,
          response.bandera
        );
        this.conta148 = new Conta148('', '', '', '', '');
      },
      error => {
        Swal.fire(
          'Error!',
          error.error.message,
          'error'
        );
        this.conta148 = new Conta148('', '', '', '','');
      }
    );
  }


  dependencias_periodos(){
    this.conta148Service.getAllPeriodos({}).subscribe(
      response => {
        this.periodos = response;
      }
    )
    this.conta148Service.getConta28({}).subscribe(
      response => {
        this.dependencias = response;
      }
    )
  }


  estado(lyrics){
    if(lyrics=='A'){
      return 'ABIERTO';
    }else if(lyrics=='C'){
      return 'CERRADO';
    }else{
      return 'UNDEFINED'
    }
  }

}
