import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { global } from "./global";
import { ImagePosition, Workbook } from 'exceljs';
import { LOGO } from "./logo";
import * as fs from 'file-saver';

@Injectable()
export class ReporteService {
    public url: string;
    private _worbook!: Workbook;
    constructor(public _http: HttpClient) {
        this.url = global.url;
    }

    reportes(user: any): Observable<any> {
        let json = JSON.stringify(user);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url + 'reporte/reporte', params, { headers: headers });
    }

    reportesH(user: any): Observable<any> {
        let json = JSON.stringify(user);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url + 'reporte/reporte2', params, { headers: headers });
    }

    reportesH2(user: any): Observable<any> {
        let json = JSON.stringify(user);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url + 'reporte/reporteH2', params, { headers: headers });
    }


    searchGener02(pclave: any) {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        const response = new Promise(resolve => {
            this._http.get(global.url + `reporte/searchGener02?search=${pclave}`, { headers: headers }).subscribe(data => {
                resolve(data);

            }, err => {
                console.log(err);
            });
        });
        return response;
    }

    searchGener02_sub(user: any): Observable<any> {
        let json = JSON.stringify(user);
        let params = 'search=' + json;
        console.log("parametros!");
        console.log(params);
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url + 'reporte/searchGener02_sub', params, { headers: headers });
    }

    reporte_general(user: any): Observable<any> {
        let json = JSON.stringify(user);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url + 'reporte/reporte_general', params, { headers: headers });
    }


    async dowloadExcel(dataExcel, titulo): Promise<void> {
        this._worbook = new Workbook();
        this._worbook.creator = 'Inventario Activos';
        await this._createHeroTable(dataExcel);

        this._worbook.xlsx.writeBuffer().then((data) => {
            const blod = new Blob([data]);
            fs.saveAs(blod, titulo + '.xlsx');
        })
    }

    private _createHeroTable(dataExcel): void {
        console.log("dataaa!!!!");
        var campos = Object.keys(dataExcel[0]);
        console.log(campos);
        const sheet = this._worbook.addWorksheet('hoja 1');
        sheet.getColumn("A").width = 21;
        sheet.getColumn("B").width = 35;
        sheet.getColumn("C").width = 21;
        sheet.getColumn("D").width = 21;
        sheet.getColumn("E").width = 21;
        sheet.getColumn("F").width = 21;
        sheet.getColumn("G").width = 21;
        sheet.getColumn("H").width = 21;
        sheet.getColumn("I").width = 21;
        sheet.columns.forEach((column) => {
            column.alignment = { vertical: 'middle', wrapText: true };
        });

        const logo = this._worbook.addImage({
            base64: LOGO,
            extension: 'png'
        });

        const position: ImagePosition = {
            tl: { col: 0.15, row: 1.3 },
            ext: { width: 128, height: 128 }
        }

        sheet.addImage(logo, position);
        const titleCell = sheet.getCell('B5');
        titleCell.value = 'REPORTE INVENTARIO DE ACTIVOS';
        titleCell.style.font = { bold: true, size: 13 }
        const headerRow = sheet.getRow(10);
        headerRow.values = campos;
        headerRow.font = { bold: true, size: 13 };
        const rowsToInsert = sheet.getRows(11, dataExcel.length)!;
        let values: any = [];
        for (let index = 0; index < rowsToInsert.length; index++) {
            const itemData = dataExcel[index];
            const row = rowsToInsert[index];
            for (let index = 0; index < campos.length; index++) {
                console.log("prueba!!");
                console.log(itemData[campos[index]]);
                values.push(itemData[campos[index]]);
            }
            row.values = values;
            values = [];
            console.log("values");
            console.log(row.values)
            console.log(row)
        }
    }




}

