import { Component, OnInit, Renderer2 } from '@angular/core';
import { Formulario } from '../models/formulario';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { FormularioService } from '../services/formulario.service';
import { Router } from '@angular/router';
@Component({
	selector: 'app-formulario',
	templateUrl: './formulario.component.html',
	styleUrls: ['./formulario.component.css'],
	providers: [FormularioService]
})
export class FormularioComponent implements OnInit {
	public formulario: Formulario;
	public forma!: FormGroup;
	public banDire: any = false;
	public direccion: any;
	datos: any;
	data: any;
	bandera: any = false;
	dirpart1: string = "";
	dirpart2: string = "";
	dirpart3: string = "";
	dirpart4: string = "";
	dirpart5: string = "";
	dirpart6: string = "";
	dirpart7: string = "";
	dirpart8: string = "";
	dirpart9: string = "";
	dirpart10: string = "";
	dirpart11: string = "";
	dirpart12: string = "";
	dirpart13: string = "";
	dirpart14: string = "";
	dirpart15: string = "";
	dirpart16: string = "";


	menum_dirpart1 = [
		{ value: "AU", label: "AUTOPISTA" },
		{ value: "AV", label: "AVENIDA" },
		{ value: "AC", label: "AVENIDA CALLE" },
		{ value: "AK", label: "AVENIDA CARRERA" },
		{ value: "CL", label: "CALLE" },
		{ value: "CR", label: "CARRERA" },
		{ value: "CT", label: "CARRETERA" },
		{ value: "CV", label: "CIRCUNVALAR" },
		{ value: "DG", label: "DIAGONAL" },
		{ value: "TV", label: "TRANSVERSAL" },
		{ value: "TC", label: "TRONCAL" },
		{ value: "VT", label: "VARIANTE" },
		{ value: "VI", label: "VÍA" },
	];

	menum_dirpart3 = [
		{ value: "A", label: "A" },
		{ value: "B", label: "B" },
		{ value: "C", label: "C" },
		{ value: "D", label: "D" },
		{ value: "E", label: "E" },
		{ value: "F", label: "F" },
		{ value: "G", label: "G" },
		{ value: "H", label: "H" },
		{ value: "I", label: "I" },
		{ value: "J", label: "J" },
		{ value: "K", label: "K" },
		{ value: "L", label: "L" },
		{ value: "M", label: "M" },
		{ value: "N", label: "N" },
		{ value: "O", label: "O" },
		{ value: "P", label: "P" },
		{ value: "Q", label: "Q" },
		{ value: "R", label: "R" },
		{ value: "S", label: "S" },
		{ value: "T", label: "T" },
		{ value: "U", label: "U" },
		{ value: "V", label: "V" },
		{ value: "X", label: "X" },
		{ value: "Y", label: "Y" },
		{ value: "Z", label: "Z" },
	];

	menum_dirpart4 = [
		{ value: "BIS", label: "BIS" },
		{ value: "1", label: "1" },
		{ value: "2", label: "2" },
	];

	menum_dirpart5 = [
		{ value: "NORTE", label: "NORTE" },
		{ value: "OESTE", label: "OESTE" },
		{ value: "SUR", label: "SUR" },
	];

	menum_dirpart11 = [
		{ value: "BQ", label: "BLOQUE" },
		{ value: "EQ", label: "ESQUINA" },
		{ value: "IN", label: "INTERIOR" },
		{ value: "KM", label: "KILÓMETRO" },
		{ value: "MZ", label: "MANZANA" },
		{ value: "MD", label: "MÓDULO" },
		{ value: "PI", label: "PISO" },
		{ value: "PL", label: "PLANTA" },
		{ value: "SC", label: "SECTOR" },
		{ value: "SM", label: "SUPERMANZANA" },
		{ value: "TO", label: "TORRE" },
	];

	menum_dirpart13 = [
		{ value: "AP", label: "APARTAMENTO" },
		{ value: "BG", label: "BODEGA" },
		{ value: "CS", label: "CASA" },
		{ value: "CN", label: "CONSULTORIO" },
		{ value: "DP", label: "DEPOSITO" },
		{ value: "LC", label: "LOCAL" },
		{ value: "LM", label: "LOCAL MEZZANINE" },
		{ value: "LT", label: "LOTE" },
		{ value: "MN", label: "MEZZANINE" },
		{ value: "OF", label: "OFICINA" },
		{ value: "PN", label: "PENT-HOUSE" },
		{ value: "PD", label: "PREDIO" },
		{ value: "PU", label: "PUESTO" },
		{ value: "SS", label: "SEMISÓTANO" },
		{ value: "SO", label: "SÓTANO" },
		{ value: "ST", label: "SUITE" },
		{ value: "TZ", label: "TERRAZA" },
		{ value: "UN", label: "UNIDAD" },
	];

	menum_dirpart15 = [
		{ value: "AD", label: "ADMINISTRACIÓN" },
		{ value: "AE", label: "AEROPUERTO" },
		{ value: "AG", label: "AGRUPACIÓN" },
		{ value: "AL", label: "ALTILLO" },
		{ value: "BL", label: "BULEVAR" },
		{ value: "CU", label: "CÉLULA" },
		{ value: "CE", label: "CENTRO COMERCIAL" },
		{ value: "CQ", label: "CIRCULAR" },
		{ value: "CD", label: "CIUDADELA" },
		{ value: "CO", label: "CONJUNTO RESIDENCIAL" },
		{ value: "COR", label: "CORREGIMIENTO" },
		{ value: "CC", label: "CUENTAS CORRIDAS" },
		{ value: "DS", label: "DEPOSITO SÓTANO" },
		{ value: "ED", label: "EDIFICIO" },
		{ value: "EN", label: "ENTRADA" },
		{ value: "ET", label: "ETAPA" },
		{ value: "ES", label: "ESTACIÓN" },
		{ value: "EX", label: "EXTERIOR" },
		{ value: "FI", label: "FINCA" },
		{ value: "GA", label: "GARAJE" },
		{ value: "GS", label: "GARAJE SÓTAN" },
		{ value: "PQ", label: "PARQUE" },
		{ value: "PA", label: "PARQUEADERO" },
		{ value: "PJ", label: "PASAJE" },
		{ value: "PS", label: "PASEO" },
		{ value: "PT", label: "PEATONAL" },
		{ value: "PR", label: "PORTERÍA" },
		{ value: "RP", label: "ROUND POINT (GLORIETA)" },
		{ value: "UL", label: "UNIDAD RESIDENCIAL" },
		{ value: "UR", label: "URBANIZACIÓN" },
		{ value: "ZN", label: "ZONA" },
	];
	datoDireccion: any;
	constructor(private renderer: Renderer2, private _formulario: FormularioService, private route: Router) {
		this.formulario = new Formulario('', '', '', '', '', '', '', '');
		this.datos = localStorage.getItem('usuarioConsultado');
		this.datos = this.datos.replace(/ /g, "");
		this.datos = JSON.parse(this.datos + '');
		console.log("datos!");
		console.log(this.datos);
		this.formulario = this.datos;
		this.datoDireccion=JSON.parse(localStorage.getItem('usuarioConsultado')+'');
		this.formulario.diremp=this.datoDireccion.diremp;
	}

	ngOnInit(): void {

	}

	funcionDireccion() {
		this.banDire = true;
	}

	funcionDireccion2() {
		this.banDire = false;

	}

	onSubmit(form) {
		console.log("aqui!");
		console.log(this.formulario);
		localStorage.removeItem('usuarioConsultado');
		this.route.navigate(['inicio-formulario'])

	}



	asignarDireccion() {
		let direccion = $("#div_direccion").html();
		this.forma.controls['direccion'].setValue(direccion);
		$('#div_direccion').html("");
		const element = this.renderer.selectRootElement('#direccion');
		element.focus();
		/* $(('#modal_direccion') as any).modal('close'); */
	}
	addDireccion() {
		let part1 = " # ";
		let part2 = " - ";
		if (this.dirpart1 == '') {
			part1 = "";
			part2 = "";
		}
		let html = this.dirpart1 + " " + this.dirpart2 + this.dirpart3 + " " + this.dirpart4 + " " + this.dirpart5 + part1 + this.dirpart6 + this.dirpart7 + " " + this.dirpart8 + " " + this.dirpart9 + part2 + this.dirpart10 + " " + this.dirpart11 + " " + this.dirpart12 + " " + this.dirpart13 + " " + this.dirpart14 + " " + this.dirpart15 + " " + this.dirpart16;
		$('#div_direccion').html(html);
		this.formulario.diremp = html;
		this.direccion = html;


	}
	getGener02(pclave: any) {

		const keyword = pclave.target.value;
		if (keyword.length > 0) {
			const search = this._formulario.searchGener02(keyword).then(response => {
				this.data = response;
				console.log(this.data);
			})
		} else {
			this.bandera = false;
			console.log("aquiiiiiiiiiiiiiiiiiiiiiiii")
		}


	}
	getDatos(result: any) {
		console.log(result);
		this.bandera = true;
	}

}
