import { Component, OnInit } from '@angular/core';
import { Formulario } from '../models/formulario';
@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  public formulario: Formulario;
  constructor() {
    this.formulario = new Formulario('','','','','','','');
   }

  ngOnInit(): void {

  }
  onSubmit(form){
    console.log("aqui!");
    console.log(this.formulario);
    form.reset();
    

  }

}
