import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Gener02 } from "../models/gener02";
import { global } from "./global";


@Injectable()
export class TrasladoService {
    public url: string;
    constructor(public _http: HttpClient) {
        this.url = global.url;
    }
    updateConta19(user: any): Observable<any> {
        let json = JSON.stringify(user);
        let params = 'json=' + json;
        console.log("parametros a actualizar");
        console.log(params);
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url + 'traslado/updateConta19', params, { headers: headers });
    }
    saveConta65(user: any): Observable<any> {
        let json = JSON.stringify(user);
        let params = 'json=' + json;
        console.log("parametros")
        console.log(params);
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url + 'traslado/SaveConta65', params, { headers: headers });
    }

}