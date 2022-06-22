import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {ReporteService} from '../services/reporte.service';
import {Conta123} from '../models/conta123';
import Swal from 'sweetalert2';
import {ActivatedRoute} from '@angular/router';
import {Model0} from '../models/model0';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({selector: 'app-reportes', templateUrl: './reportes.component.html', styleUrls: ['./reportes.component.css'], providers: [ReporteService]})
export class ReportesComponent implements OnInit {
    @ViewChild('myData')myData ! : ElementRef;
    public serviceUrl : string;
    public reportPath : string;
    public activos : any = [];
    public activosF : any = [];
    public activosS : any = [];
    public activosI : any = [];
    public token : any;
    public encargado : any;
    public usuario : any;
    public cedtra : any;
    public mes : any;
    public ano : any;
    public data : any;
    public itemDetail : any;
    constructor(private _reporteService : ReporteService, private route : ActivatedRoute) {

        this.token = JSON.parse(localStorage.getItem("tokenConsultado2") + '');
        this.encargado = this.token['nombre'];
        this.usuario = this.token['usuario'];
        this.cedtra = this.token['cedtra'];
        let date: Date = new Date();
        this.ano = date.getFullYear();

        this.mes = date.getMonth();
        this.serviceUrl = '';
        this.reportPath = '~/Resources/docs/sales-order-detail.rdl';

        this.token = JSON.parse(localStorage.getItem("numero") + '');
        if (this.token == 0) {
            console.log("sii!");
            this._reporteService.reportes(new Conta123('', this.cedtra, '')).subscribe(response => {
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

            });
        } else {
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

    ngOnInit(): void {}

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
                        pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height * i) + (top_left_margin * 4), canvas_image_width, canvas_image_height);
                    }

                    pdf.save("HTML-Document.pdf");
                });
            })
        })
    };

    generar() {
        let timerInterval
        Swal.fire({
            title: 'Generando PDF...',
            html: 'El proceso terminara en <b></b> milisegundos.',
            timer: 3000,
            timerProgressBar: true,
            didOpen: () => {},
            willClose: () => { // this.setPdf();
                this.getPDF();

                clearInterval(timerInterval)
            }
        }).then((result) => { /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {}
        })
    }


}
