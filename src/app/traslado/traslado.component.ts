import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Conta19Service } from '../services/conta19.service';
import { Gener02 } from '../models/gener02';
import { Conta19_Copia } from '../models/conta19_copia';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { Conta19 } from '../models/conta19';
import { delay, identity } from 'rxjs';
import { Conta124 } from '../models/conta124';
import { ReporteService } from '../services/reporte.service';
import { Gener02Service } from '../services/gener02.service';
import { TrasladoService } from '../services/traslado.service';
import { Conta65_copia } from '../models/conta65_copia';
import { Conta65 } from '../models/conta65';
import { Conta148Service } from '../services/conta148.service';
import * as ExcelJS from 'exceljs';
import saveAs from 'file-saver';
import { LOGO } from '../services/logo';
import { position } from 'html2canvas/dist/types/css/property-descriptors/position';
import { ImagePosition } from 'exceljs';

@Component({ selector: 'app-traslado', templateUrl: './traslado.component.html', styleUrls: ['./traslado.component.css'], providers: [Conta19Service, ReporteService, Gener02Service, TrasladoService, Conta148Service] })
export class TrasladoComponent implements OnInit {
    filterPost = '';
    public token: any;
    public encargado: any;
    public usuario: any;
    public cedtra: any;
    public activos: any;
    public tactivos: any;
    public array: any = [];
    public conta19: any;
    public lista_activos: any = [];
    public cedtraConsultado: any;
    public datoSe: any = '';
    public data: any;
    public datoCe: any = '';
    public tokenConsultado: any;
    public ubicaciones: any;
    public banderaSe: any;
    ao = [];
    ap = [];
    public datosActivos: any;
    public lista_observacion: any = [];
    public lista_estado: any = [];
    public observacion_traslado: any = [];
    public ubi_traslado: any = [];
    public depdesdes: any;
    public identity: any;
    public documento: any;
    public searchValue: any;
    public palabraclave: any;
    public coddepdes: any = '';
    public dependencias: any = [];
    public dependenciaReport: any = '';
    constructor(private _conta19Service: Conta19Service, private _router: Router, private _reporteService: ReporteService, private _gener02Service: Gener02Service, private _trasladoService: TrasladoService, private _conta148Service: Conta148Service) {
        this.token = JSON.parse(localStorage.getItem("tokenConsultado3") + '');
        this.identity = JSON.parse(localStorage.getItem("identity") + '');
        this.cedtraConsultado = JSON.parse(localStorage.getItem('tokenConsultado3') + '');
        console.log("dependencia!!!");
        console.log(this.cedtraConsultado);
        this.encargado = this.token['nombre'];
        this.usuario = this.token['usuario'];
        this.cedtra = this.token['cedtra'];
        this.dependenciaReport = this.token['coddep'];
        this.searchValue = null;
        this.getConta19(this.cedtra);
        this._conta19Service.getDocumentoConta65({}).subscribe(response => {
            this.documento = response;
            console.log("respuesta documento");
            console.log(response);
        })
        this._conta148Service.getConta28({}).subscribe(
            response => {
                this.dependencias = response;
            }
        )
    }
    onCambio(event, dato: any): void {
        let bandera = false;
        console.log("valueeeeeeeeee");
        const newVal = event.target.value;
        console.log(newVal + ' ' + dato);
        if (this.lista_estado.length > 0) {
            for (let index = 0; index < this.lista_estado.length; index++) {
                if (this.lista_estado[index][1] == dato) {
                    this.lista_estado.splice(index, 1);
                    console.log(this.lista_estado);
                    bandera = true;
                }
            }
            if (bandera) {
                this.lista_estado.push([newVal, dato]);
                console.log(this.lista_estado);
            } else {
                this.lista_estado.push([newVal, dato]);
                console.log(this.lista_estado);
            }
        } else {
            this.lista_estado.push([newVal, dato]);
            console.log(this.lista_estado);
        }


    }
    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    getRandomParagraph() {
        return "INSTRUCCIONES: Diligencie este formato en forma clara y el letra imprenta. En caso de perdida o robo del activo anexar denuncio ante la Entidad Competente."
    }

    getparagraph() {
        return "AUTORIZO EL TRATAMIENTO DE DATOS PERSONALES. Autorizó en los términos de la Ley 1581 de 2012 y Decreto 1377 de 2013, de manera libre, previa y voluntaria a la Caja de Compensación Familiar de Nariño para el tratamiento de mis datos personales suministrados a través de este formulario como la recolección, almacenamiento, uso, circulación o supresión para las finalidades mencionadas en las 'POLITICAS Y PROCEDIMIENTOS PARA LA PROTECCIÓN DE DATOS PERSONALES EN LA CAJA DE COMPENSACIÓN FAMILIAR DE NARIÑO', que permitan recibir información sobre los servicios sociales programas de la Caja de Compensación Familiar."
    }

    generateInvoice(array) {
        const date = new Date().toLocaleDateString()
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Invoice');

        const header = worksheet.getCell('A1');
        header.value = 'Caja de Compensación Familiar de Nariño ';
        header.font = { bold: true };
        header.alignment = { horizontal: 'center' };
        worksheet.addRow([]); // Add an empty row for spacing

        const codigo = worksheet.getCell('F1');
        codigo.value = 'Código: PGA-SAA-F-1';
        codigo.font = { bold: true, size: 8 };
        codigo.alignment = { horizontal: 'center' };
        worksheet.addRow([]); // Add an empty row for spacing

        const version = worksheet.getCell('F2');
        version.value = 'Versión: 2';
        version.font = { bold: true, size: 8 };
        version.alignment = { horizontal: 'center' };
        worksheet.addRow([]); // Add an empty row for spacing

        const fecha = worksheet.getCell('F3');
        fecha.value = 'Aprobación: 17/11/2022';
        fecha.font = { bold: true, size: 8 };
        fecha.alignment = { horizontal: 'center' };
        worksheet.addRow([]); // Add an empty row for spacing

        const sistema = worksheet.getCell('A2');
        sistema.value = 'Sistema de Gestión';
        sistema.font = { bold: true };
        sistema.alignment = { horizontal: 'center' };
        worksheet.addRow([]); // Add an empty row for spacing

        const formato = worksheet.getCell('A3');
        formato.value = 'Formato para nota de novedades Activos Fijos';
        formato.font = { bold: true };
        formato.alignment = { horizontal: 'center' };
        worksheet.addRow([]);

        const randomParagraphCell = worksheet.getCell('A5');
        const randomParagraph = this.getRandomParagraph();
        randomParagraphCell.value = randomParagraph;
        randomParagraphCell.font = { bold: false, size: 8 }


        const mes = worksheet.getCell('F5');
        mes.value = date;
        mes.font = { bold: false };
        mes.alignment = { horizontal: 'center' };
        worksheet.addRow([]);


        const paragraphCell = worksheet.getCell('A6');
        const paragraph = this.getparagraph();
        paragraphCell.font = { bold: false, size: 8 }
        paragraphCell.value = paragraph;

        const basic = worksheet.getCell('A7');
        basic.value = 'Datos Basicos (Origen).';
        basic.font = { bold: true };
        worksheet.addRow([]); // Add an empty row for spacing

        const instructions = worksheet.getCell('A8');
        instructions.value = 'Nombres y Apellidos: '+this.encargado;
        instructions.font = { bold: false };
        worksheet.addRow([]); // Add an empty row for spacing

        const documento = worksheet.getCell('A9');
        documento.value = 'Documento: '+this.cedtra;
        documento.font = { bold: false };
        worksheet.addRow([]); // Add an empty row for spacing

        const personalInfoCell = worksheet.getCell('A10');
        personalInfoCell.value = 'Dependencia: '+this.dependenciaReport;
        personalInfoCell.font = { bold: false };
        worksheet.addRow([]); // Add an empty row for spacing

        const unidad = worksheet.getCell('A11');
        unidad.value = 'Unidad de Negocio:';
        unidad.font = { bold: false };
        worksheet.addRow([]); // Add an empty row for spacing

        const novedad = worksheet.getCell('A12');
        novedad.value = 'Clase de Novedad';
        novedad.font = { bold: true };

        const optionsCell = worksheet.getCell('A13');
        optionsCell.value = 'Seleccione una opción:';
        optionsCell.font = { bold: false };

        const dataValidation: any = {
            type: 'list',
            formulae: ['"Traslado en la dependencia,Dependencia a dependencia,Prestamo,No necesario"'],
            showDropDown: true,
            allowBlank: true,
        };

        optionsCell.dataValidation = dataValidation;
        worksheet.addRow([]); // Add an empty row for spacing

        const datosTraslados = worksheet.getCell('A14');
        datosTraslados.value = 'Datos Destino:';
        datosTraslados.font = { bold: true };
        worksheet.addRow([]); // Add an empty row for spacing

        const nombreApelllidos = worksheet.getCell('A15');
        nombreApelllidos.value = 'Nombres y Apellidos: ' + this.datoSe;
        nombreApelllidos.font = { bold: false };
        worksheet.addRow([]); // Add an empty row for spacing

        const docempdes = worksheet.getCell('A16');
        docempdes.value = 'documento: ' + this.datoCe;
        docempdes.font = { bold: false };
        worksheet.addRow([]); // Add an empty row for spacing


        const dependencia = worksheet.getCell('A17');
        dependencia.value = 'Dependencia destino: '+this.depdesdes;
        dependencia.font = { bold: false };
        worksheet.addRow([]); // Add an empty row for spacing

        const cargod = worksheet.getCell('A18');
        cargod.value = 'Cargo:';
        cargod.font = { bold: false };

        const unidaddes = worksheet.getCell('A19');
        unidaddes.value = 'Unidad de Negocio:';
        unidaddes.font = { bold: false };
        worksheet.addRow([]); // Add an empty row for spacing

        const baja = worksheet.getCell('A20');
        baja.value = 'Tipo de baja';
        baja.font = { bold: true };

        const optionsBaja = worksheet.getCell('A21');
        optionsBaja.value = 'Seleccione una opción:';
        optionsBaja.font = { bold: false };

        const dataBaja: any = {
            type: 'list',
            formulae: ['"Obsoleto,Inservible,Perdida o robo,No necesario"'],
            showDropDown: true,
            allowBlank: true,
        };
        optionsBaja.dataValidation = dataBaja;
        worksheet.addRow([]);

        worksheet.mergeCells('A1:E1');
        worksheet.mergeCells('A2:E2');
        worksheet.mergeCells('A3:E3');
        worksheet.mergeCells('A4:F4');
        worksheet.mergeCells('A5:E5');
        worksheet.mergeCells('A6:F6');
        worksheet.mergeCells('A7:F7');
        worksheet.mergeCells('A8:F8');
        worksheet.mergeCells('A9:F9');
        worksheet.mergeCells('A10:F10');
        worksheet.mergeCells('A11:F11');
        worksheet.mergeCells('A12:F12');
        worksheet.mergeCells('A13:F13');
        worksheet.mergeCells('A14:F14');
        worksheet.mergeCells('A15:F15');
        worksheet.mergeCells('A16:F16');
        worksheet.mergeCells('A17:F17');
        worksheet.mergeCells('A18:F18');
        worksheet.mergeCells('A19:F19');
        worksheet.mergeCells('A20:F20');
        worksheet.mergeCells('A21:F21');
        worksheet.mergeCells('A22:F22');


        worksheet.getColumn(1).width = 20;
        worksheet.getColumn(2).width = 20;
        worksheet.getColumn(3).width = 20;
        worksheet.getColumn(4).width = 20;
        worksheet.getColumn(5).width = 20;
        worksheet.getColumn(6).width = 20;
        worksheet.getColumn(7).width = 20;

        const position: ImagePosition = {
            tl: { col: 0.1, row: 0.1 },
            ext: { width: 75, height: 75 }
        }
        const Logo = workbook.addImage({
            base64: LOGO,
            extension: 'png'
        });
        worksheet.addImage(Logo, position);
        const tableHeaders = ['No. Plaqueta', 'Cantidad', 'Detalle', '', '', 'Marca y/o Serie'];
        worksheet.addRow(tableHeaders);
        worksheet.mergeCells('C23:E23');
        for (let index = 0; index < array.length; index++) {
            const rowData = [array[index].codact, 1, array[index].detalle, '', '', array[index].observacion];
            worksheet.addRow(rowData);
        }
        let numero = 24;
        let numero_total;
        let celda_2;
        let celda_3;
        let celda_4;
        for (let index = 0; index < array.length; index++) {
            let numero2 = numero + index;
            let celda = 'C' + numero2 + ':' + 'E' + numero2;
            worksheet.mergeCells(celda);
        }
        numero_total = numero + array.length;
        celda_2 = 'A' + numero_total + ':' + 'B' + numero_total;
        celda_3 = 'C' + numero_total + ':' + 'D' + numero_total;
        celda_4 = 'E' + numero_total + ':' + 'F' + numero_total;
        worksheet.mergeCells(celda_2);
        worksheet.mergeCells(celda_3);
        worksheet.mergeCells(celda_4);

        const autorizado = worksheet.getCell('A'+numero_total);
        autorizado.value = 'Autorizado por :';
        autorizado.font = { bold: false };
        worksheet.addRow([]); // Add an empty row for spacing

        const responsable = worksheet.getCell('C'+numero_total);
        responsable.value = 'Responsable (entrega) :';
        responsable.font = { bold: false };
        worksheet.addRow([]); // Add an empty row for spacing

        const responsable_recibe = worksheet.getCell('E'+numero_total);
        responsable_recibe.value = 'Responsable (recibe) :';
        responsable_recibe.font = { bold: false };
        worksheet.addRow([]); // Add an empty row for spacing

        workbook.xlsx.writeBuffer().then((buffer: ArrayBuffer) => {
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, 'invoice.xlsx');
        });
    }

    onDependencia(event) {
        this.coddepdes = event.target.value;
        this.depdesdes = this.coddepdes;
        this.getConta116(this.coddepdes);
    }


    onSubmit() {
        let bandera: any;
        let bandera2: any;
        var coddep: any;
        var coddeoV: any;
        var aredes = '';
        coddep = this.coddepdes;
        coddeoV = this.coddepdes;
        console.log("codep");
        console.log(coddep);
        console.log("coddep*2");
        coddep = coddep.split('');
        console.log(coddep);
        console.log("aredes");
        let banderu_reporte = false;

        aredes = coddep[0].concat(coddep[1]);
        console.log(aredes);
        Swal.fire({
            title: '¿Estas seguro de guardar los cambios?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            denyButtonText: `No Guardar`
        }).then((result) => {
            if (result.isConfirmed) {

                for (let index1 = 0; index1 < this.array.length; index1++) {
                    if (this.lista_observacion.length > 0) {
                        for (let index2 = 0; index2 < this.lista_observacion.length; index2++) {

                            if (this.array[index1].codact == this.lista_observacion[index2][1]) {
                                this.array[index1].observacion = this.lista_observacion[index2][0];
                                bandera = true;
                            } else {
                                bandera = false;
                            }


                        }
                        if (bandera == false) {
                            this.array[index1].observacion = 'sin observacion';
                        }
                    } else {
                        this.array[index1].observacion = 'sin observacion';
                    }


                }

                for (let index1 = 0; index1 < this.array.length; index1++) {
                    if (this.lista_estado.length > 0) {
                        for (let index2 = 0; index2 < this.lista_estado.length; index2++) {
                            if (this.array[index1].codact == this.lista_estado[index2][1]) {
                                this.array[index1].estado = this.lista_estado[index2][0];
                                bandera2 = true;
                            } else {
                                bandera2 = false;
                            }

                        }
                        if (bandera2 == false) {
                            this.array[index1].estado = 'B';
                        }
                    } else {
                        this.array[index1].estado = 'B';
                    }


                }
                for (let index = 0; index < this.array.length; index++) {
                    this.conta19 = new Conta19(this.array[index].codact, this.array[index].subcod, this.array[index].codbar, this.array[index].estado, this.array[index].detalle, this.array[index].codare, this.array[index].coddep, this.array[index].codubi, this.array[index].cedtra, this.array[index].codcen, this.usuario, this.array[index], this.array[index].observacion);
                    this.lista_activos.push(this.conta19);
                }

                for (let index = 0; index < this.lista_activos.length; index++) {
                    for (let index2 = 0; index2 < this.activos.length; index2++) {
                        if (this.lista_activos[index]['codact'] == this.activos[index2]['codact']) {
                            this.activos.splice(index2, 1);
                        }
                    }

                }

                if (this.lista_activos.length > 0) {

                    if (this.datoCe.length > 0) {
                        console.log(this.datoCe, ' - ', this.cedtraConsultado.cedtra);
                        if (this.datoCe != this.cedtraConsultado.cedtra) {

                            if (this.observacion_traslado.length > 0) {

                                if (this.ubi_traslado > 0 && this.ubi_traslado < 99) {
                                    for (let index = 0; index < this.array.length; index++) {
                                        this._trasladoService.updateConta19(new Conta19(this.array[index].codact, '', '', '', '', '', this.depdesdes, this.ubi_traslado, this.datoCe, '', this.identity.sub, '', this.observacion_traslado)).subscribe(
                                            response => {
                                                if (response.status != 'error') {
                                                    this._conta19Service.consultConta65(new Conta65(this.array[index].codact, this.cedtra)).subscribe(
                                                        response => {
                                                            this._trasladoService.saveConta65(new Conta65_copia('01', this.documento, this.identity.sub, this.array[index].codact, response.subcod, this.observacion_traslado, response.areori, response.depori, response.ubiori, response.cedori, aredes, coddeoV, this.ubi_traslado, this.datoCe, 'A')).subscribe(
                                                                response => {
                                                                    console.log(this.array);
                                                                    if (response.status = "success") {
                                                                        Swal.fire('Traslado Realizado!', '', 'success');
                                                                        if (!banderu_reporte) {
                                                                            this.generateInvoice(this.array);
                                                                        }
                                                                        banderu_reporte = true;
                                                                        delay(1500);
                                                                        this._router.navigate(['inicio-traslado']);
                                                                    } else {
                                                                        Swal.fire('Traslado No Realizado!', '', 'error');
                                                                    }

                                                                }
                                                            )
                                                        }
                                                    )

                                                }
                                            }
                                        )

                                    }
                                } else {
                                    Swal.fire('Ubicación Incorrecta!', '', 'error');
                                }

                            } else {
                                Swal.fire('Traslado sin Observación!', '', 'error');
                            }
                        } else {
                            Swal.fire('Error!', 'No se puede realizar traslado al mismo usuario!', 'error');
                        }
                    } else {
                        Swal.fire('No ha seleccionado Usuario a trasladar!', '', 'error');
                    }
                } else {

                    Swal.fire('No ha seleccionado activos!', '', 'info')

                }
            } else if (result.isDenied) {
                Swal.fire('Activos no guardados', '', 'info')
            }
        })
    }
    onText(event, dato: any): void {
        let bandera = false;
        console.log("valueeeeeeeeee texto");
        const newVal = event.target.value;
        console.log(newVal + ' ' + dato);
        console.log(newVal + ' ' + dato);
        if (this.lista_observacion.length > 0) {
            for (let index = 0; index < this.lista_observacion.length; index++) {
                if (this.lista_observacion[index][1] == dato) {
                    this.lista_observacion.splice(index, 1);
                    console.log(this.lista_observacion);
                    bandera = true;
                }
            }
            if (bandera) {
                this.lista_observacion.push([newVal, dato]);
                console.log(this.lista_observacion);
            } else {
                this.lista_observacion.push([newVal, dato]);
                console.log(this.lista_observacion);
            }
        } else {
            this.lista_observacion.push([newVal, dato]);
            console.log(this.lista_observacion);
        }
    }
    getGener02(pclave: any) {
        const keyword = pclave.target.value;

        this.palabraclave = pclave.target.value;

    }

    getGener02_() {
        this._reporteService.searchGener02_sub(new Gener02('', '', this.palabraclave)).subscribe(
            response => {

                if (response.bandera == true) {
                    this.data = [response];
                    console.log(response);
                } else {
                    Swal.fire('Usuario No Encontrado', '', 'error')
                }
            }
        )
    }

    getConta116(depdes: any) {
        this._trasladoService.getConta116(new Conta19('', '', '', '', '', '', depdes, '', '', '', '', '', '')).subscribe(
            response => {
                console.log("respuesta de ubides");
                console.log(response);
                this.ubicaciones = response;
                console.log(this.ubicaciones);
                if (this.ubicaciones.length > 0) {

                } else {
                    this.ubicaciones = [{ codubi: '1' }];
                }
            },
            error => {
                this.ubicaciones = [{ codubi: '1' }];
            }
        )

    }



    getDatos02(result: any) {

        this.datoSe = result.nomemp + ' ' + result.segnom + ' ' + result.priape + ' ' + result.segape;
        this.datoCe = result.docemp;
        this._gener02Service.findGener02(new Gener02('', '', this.datoCe)).subscribe(response => {
            console.log("Reespuesta")
            this.depdesdes = response.coddep;


            console.log(response);
            this.banderaSe = true;

        })
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

                    } else if (result.isDenied) {
                        Swal.fire('Cancelado', '', 'error')
                    }
                })
            } else {
                Swal.fire('La Cedula no fue encontrada', 'Verifique y vuelva a ingresar sus datos', 'error');
            }
        });
    }

    ngOnInit(): void { }
    getConta19(cedtra: any) {
        this._conta19Service.getConta19(new Conta19_Copia(cedtra)).subscribe(response => {
            console.log("respuesta");
            console.log(response);
            if (response.status != 'error') {
                this.activos = response;
                console.log("aaaaaa :)")
                console.log(this.activos);
                for (let index = 0; index < this.activos.length; index++) {
                    this.tactivos = index + 1;
                }
            } else {
                this.activos = '';
                Swal.fire('Error', 'No se han encontrado activos', 'info');
                this._router.navigate(['home']);
            }

        });
    }
    confirmaciones(ao1: any = [], ap1: any = []) { // Detalle
        Swal.fire({
            title: '<strong>Estado <u>Activo</u></strong>',
            icon: 'info',
            input: 'select',
            inputOptions: {
                'Estado': {
                    B: 'Bueno',
                    R: 'Regular',
                    D: 'Dañado',
                    O: 'Obsoleto'
                }
            },
            inputPlaceholder: 'Seleccione el estado del activo!',
            showCancelButton: true,
            inputValidator: (value) => {
                return new Promise((resolve) => {
                    if (value == '') {
                        Swal.fire('Error!', 'No ha seleccionado el estado!', 'error');
                        delay(1000);
                        this.confirmaciones(ao1, ap1);
                    } else {
                        console.log(value);
                        Swal.fire('Listo!', 'Ha seleccionado el estado: ' + value, 'success');
                        var bdc = true;
                        ao1.push(value);
                        if (bdc) {
                            this.confirmacionDetalle(ap1);
                        }
                    }
                })
            }

        });
    }
    confirmacionDetalle(ap1: any = []) {
        Swal.fire({
            title: ' <strong>Ingrese la Observación del <u>Activo</u></strong>',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Continuar',
            showLoaderOnConfirm: true,
            preConfirm: (login) => {
                if (login.length > 199 || login.length == 0) {
                    Swal.fire('Error!', 'Observación Incorrecta.', 'error');
                    this.confirmacionDetalle(ap1);
                } else {
                    ap1.push(login);
                    Swal.fire('Listo!', 'Observación Correcta.', 'success');
                    console.log(login);
                }
            }
        })
    }
    guardar() {
        Swal.fire({
            title: 'Custom width, padding, color, background.',
            width: 600,
            padding: '3em',
            color: '#716add',
            background: '#fff url(/images/trees.png)',
            backdrop: `
          rgba(0,0,123,0.4)
          url("/images/nyan-cat.gif")
          left top
          no-repeat
        `
        })
    }
    submit() {
        if (this.array.length > 0) {
            Swal.fire({

                title: "¿Estas Seguro?",
                text: "Se modificaran los activos",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#4BB543',
                cancelButtonColor: '#EA1737',
                confirmButtonText: 'Iniciar'

            }).then(result => {

                if (result.value) {

                    for (let index = 0; index < this.array.length; index++) {
                        this.conta19 = new Conta19(this.array[index].codact, this.array[index].subcod, this.array[index].codbar, this.ao[index], this.array[index].detalle, this.array[index].codare, this.array[index].coddep, this.array[index].codubi, this.array[index].cedtra, this.array[index].codcen, this.usuario, this.array[index], this.ap[index]);
                        this.lista_activos.push(this.conta19);
                    }

                    for (let index = 0; index < this.lista_activos.length; index++) {
                        for (let index2 = 0; index2 < this.activos.length; index2++) {
                            if (this.lista_activos[index]['codact'] == this.activos[index2]['codact']) {
                                this.activos.splice(index2, 1);
                            }
                        }

                    }
                    console.log("Faltantes!")
                    console.log(this.activos);
                    const navigationExtras: NavigationExtras = {
                        queryParams: {
                            result: JSON.stringify(this.lista_activos),
                            faltantes: JSON.stringify(this.activos)
                        }
                    }
                    Swal.fire('Listo!', 'Activos(s) guardados', 'success');
                    this._router.navigate(['sobrante-conta19'], navigationExtras);
                } else {


                    console.log('yes');
                    Swal.fire('Cancelado!', 'Activos(s) No guardados', 'error');
                }
            })

        } else {

            let timerInterval
            Swal.fire({
                title: 'No ha seleccionado ningun activo!',
                timer: 3000,
                didOpen: () => { },
                willClose: () => {
                    clearInterval(timerInterval);
                    this._router.navigate(['sobrante-conta19']);
                }
            }).then((result) => { /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) { }
            })
        }

    }
    onDestino(des: any) {

        this.ubi_traslado = des.target.value;


    }
    onObservacion(obs: any) {
        console.log("observacion");
        this.observacion_traslado = obs.target.value;
    }


    onChange($event, result: any) {

        /* this.clearSearch() */
        console.log(result);
        this.searchValue = '';

        if (result.checked == true) {
            result.checked = false;
        }
        result.checked = true;
        console.log(result);
        var select = document.getElementById("estado")

        console.log("selected");
        console.log(select);
        console.log("activos");
        console.log(this.activos);
        var bandera = false;

        const navigationExtras: NavigationExtras = {
            queryParams: {

                result: JSON.stringify(result)
            }
        }
        this.searchValue = '';
        const isChecked = $event.target.checked;

        if (isChecked == true) {
            this.searchValue = '';
            if (this.array.length > 0) {
                for (let index = 0; index <= this.array.length; index++) {
                    if (this.array[index] == result) {
                        console.log(this.array[index]);
                        console.log(result);
                        bandera = true;
                    }
                }
                if (bandera != true) {

                    this.array.push(result);
                    console.log("seleeee");
                    console.log(this.array);
                    this.searchValue = '';

                    //this.confirmaciones(this.ao, this.ap);
                    //aquiiii!!!!!!!!!!!!!!!!!!!!!!
                }
            } else {
                result.checked = false;
                this.array.push(result);
                console.log("seleeee");
                this.searchValue = '';

                //this.confirmaciones(this.ao, this.ap);
            }
        } else {
            for (let index = 0; index <= this.array.length; index++) {
                if (this.array[index] == result) {
                    result.checked = false;
                    this.array.splice(index, 1);
                    this.ao.splice(index, 1);
                    this.ap.splice(index, 1);
                    this.searchValue = '';
                }
            }
        }
        for (let index = 0; index < this.array.length; index++) { }
        console.log(this.ao); // estado
        console.log(this.ap); // detalle
        console.log(this.array); // activos
        delay(3000);
        this.searchValue = '';
    }

    guardarFaltantes(listaF: any) {
        var lista_success: any = [];
        var bandera: any;
        if (listaF.length > 0) {


            for (let index = 0; index < listaF.length; index++) {

                this._conta19Service.saveConta124(new Conta124('01', listaF[index]['codact'], listaF[index]['subcod'], this.coddepdes, listaF[index]['est'], 'F', 'F', 'Faltantes', this.cedtraConsultado.cedtra)).subscribe(response => {

                    if (response.status == "success") {
                        bandera = true;
                    } else {

                        bandera = false;
                    }
                })
            }

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Activos Faltantes guardados correctamente!',
                showConfirmButton: false,
                timer: 1500,
                confirmButtonText: 'Look up'
            }).then((result) => {
                this._router.navigate(['home']);
            });


        } else {
            Swal.fire('Info!', '¡No existen Activos Faltantes!.', 'info').then((result) => {
                this._router.navigate(['home']);
            });

        }
    }



}
