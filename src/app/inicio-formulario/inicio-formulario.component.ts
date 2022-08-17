import { Component, OnInit } from '@angular/core';
import { Formulario } from '../models/formulario';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { FormularioService } from '../services/formulario.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-inicio-formulario',
  templateUrl: './inicio-formulario.component.html',
  styleUrls: ['./inicio-formulario.component.css'],
  providers: [FormularioService]
})
export class InicioFormularioComponent implements OnInit {

  data: any;
  bandera: any;
  constructor(private _formulario: FormularioService, private route: Router) { }

  ngOnInit(): void {
  
  }
  getGener02(pclave: any) {

		const keyword = pclave.target.value;
		if(keyword.length>0){
			const search = this._formulario.searchGener02(keyword).then(response => {
				this.data = response;
				console.log(this.data);
			})
		}else{
			
			console.log("aquiiiiiiiiiiiiiiiiiiiiiiii")
		}


	}
  getDatos(result: any){
		console.log(result);
		this.bandera=true;
    this.route.navigate(['formulario']);
    localStorage.setItem('usuarioConsultado', JSON.stringify(result));   
	}
}
