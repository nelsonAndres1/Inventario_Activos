import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ReporteService } from '../services/reporte.service';
import { Conta123 } from '../models/conta123';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { Model0 } from '../models/model0';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({ selector: 'app-reportes', templateUrl: './reportes.component.html', styleUrls: ['./reportes.component.css'], providers: [ReporteService] })
export class ReportesComponent implements OnInit {
    @ViewChild('myData') myData !: ElementRef;
    public serviceUrl: string;
    public reportPath: string;
    public activos: any = [];
    public activosF: any = [];
    public activosS: any = [];
    public activosI: any = [];
    public token: any;
    public encargado: any;
    public usuario: any;
    public cedtra: any;
    public mes: any;
    public ano: any;
    public ano1: any;
    public data: any;
    public itemDetail: any;
    public bandera_reporte: any;
    public fecha: any;
    public hora: any;
    constructor(private _reporteService: ReporteService, private route: ActivatedRoute) {


        Swal.fire({
            title: '¿Que tipo de reporte desea generar?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Entrega',
            denyButtonText: `Recibir`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                this.bandera_reporte = false;

            } else if (result.isDenied) {
                this.bandera_reporte = true;

            }
        });



        this.token = JSON.parse(localStorage.getItem("tokenConsultado2") + '');
        this.encargado = this.token['nombre'];
        this.usuario = this.token['usuario'];
        this.cedtra = this.token['cedtra'];
        let date: Date = new Date();
        this.ano = date.getFullYear();

        this.ano = date.getFullYear();

        this.hora = date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();

        this.mes = date.getMonth();

        this.ano1 =date.getMonth()+1;

        this.fecha = date.getFullYear()+'/'+this.ano1+'/'+date.getDate();
        this.serviceUrl = '';
        this.reportPath = '~/Resources/docs/sales-order-detail.rdl';

        this.token = JSON.parse(localStorage.getItem("numero") + '');
        if (this.token == 0) {
            console.log(this.activos);
            console.log("sii!");
            this._reporteService.reportes(new Conta123('', this.cedtra, '')).subscribe(response => {
                this.activos = response;

                for (let index = 0; index < this.activos.length; index++) {
                    if (this.activos[index]['estado'] == 'I') {
                        this.activosI.push(this.activos[index]);
                        console.log("Inventariados!!!");
                        console.log(this.activosI);
                    } else if (this.activos[index]['estado'] == 'F') {
                        this.activosF.push(this.activos[index]);
                    } else {
                        this.activosS.push(this.activos[index]);
                    }
                }

            });
        } else {
            console.log(this.activos);
            console.log("Noo!");
            this._reporteService.reportesH2(new Model0(this.token)).subscribe(response => {
                this.activos = response;

                for (let index = 0; index < this.activos.length; index++) {
                    if (this.activos[index]['estado'] == 'I') {
                        this.activosI.push(this.activos[index]);
                    } else if (this.activos[index]['estado'] == 'F') {
                        this.activosF.push(this.activos[index]);
                    } else {
                        this.activosS.push(this.activos[index]);
                    }
                }
            })
        }
    }
    boton() {
        this.generar();
    }

    estadofisico(variable: any) {
        if (variable == 'B') {
            return "BUENO";
        } if (variable == 'R') {
            return "REGULAR";
        } if (variable == 'D') {
            return "DAÑADO";
        } if (variable == 'O') {
            return "OBSOLETO";
        }
        if (variable == 'F') {
            return "FALTANTE";
        } else {
            return "";
        }
    }


    ngOnInit(): void { }

    setPdf() {
        setTimeout(() => {
            const data = this.myData.nativeElement;
            const doc = new jsPDF('p', 'pt', 'a4');
            html2canvas(data).then(canvas => {
                const imgWidth = 600;
                const imgHeight = canvas.height * imgWidth / canvas.width;
                const contentDataURL = canvas.toDataURL('image/png');
                doc.addImage(contentDataURL, 'PNG', 0, 0, imgWidth, imgHeight);
                doc.save('reporte_inv.pdf');
                doc.output('dataurlnewwindow');
            })
        }, 500);

    }

    getPDF() {
        setTimeout(() => {

            const data = this.myData.nativeElement;
            const doc = new jsPDF('p', 'pt', 'a4');

            html2canvas(data).then(canvas => {
                const data = this.myData.nativeElement;

                let HTML_Width = 600;
                let HTML_Height = canvas.height * HTML_Width / canvas.width;
                var top_left_margin = 15;
                var PDF_Width = HTML_Width + (top_left_margin * 2);
                var PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
                var canvas_image_width = HTML_Width;
                var canvas_image_height = HTML_Height;

                var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;


                html2canvas(data).then(function (canvas) {
                    canvas.getContext('2d');

                    console.log(canvas.height + "  " + canvas.width);


                    var imgData = canvas.toDataURL("image/jpeg", 1.0);
                    var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
                    pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);


                    for (var i = 1; i <= totalPDFPages; i++) {

                        pdf.addPage();
                        pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
                    }

                    pdf.save("reporte_inventario.pdf");
                });
            })
        })
    };

    generar() {
        let timerInterval
        Swal.fire({
            title: 'Generando PDF...',
            html: 'Espere!',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => { },
            willClose: () => { // this.setPdf();
                this.getPDF();

                clearInterval(timerInterval)
            }
        }).then((result) => { /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) { }
        })
    }


}
