import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Gener02 } from "../models/gener02";
import { global } from "./global";

@Injectable()
export class Conta148Service {
    public url: string;
    constructor(public _http: HttpClient) {
        this.url = global.url;
    }


    saveConta148(user: any): Observable<any> {
        let json = JSON.stringify(user);
        let params = 'json=' + json;
        console.log(params);
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url + 'conta148/saveConta148', params, { headers: headers });
    }

    getConta148(user: any): Observable<any> {
        let json = JSON.stringify(user);
        let params = 'json=' + json;
        console.log(params);
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url + 'conta148/getConta148', params, { headers: headers });
    }
    getConta148_C(user: any): Observable<any> {
        let json = JSON.stringify(user);
        let params = 'json=' + json;
        console.log(params);
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url + 'conta148/getConta148_C', params, { headers: headers });
    }

    Cerrar_Periodo(user: any): Observable<any> {
        let json = JSON.stringify(user);
        let params = 'json=' + json;
        console.log(params);
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url + 'conta148/Cerrar_Periodo', params, { headers: headers });
    }


    getAllPeriodos(user: any): Observable<any> {
        let json = JSON.stringify(user);
        let params = 'json=' + json;
        console.log(params);
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url + 'conta148/getAllPeriodos', params, { headers: headers });
    }

    getConta28(user: any): Observable<any> {
        let json = JSON.stringify(user);
        let params = 'json=' + json;
        console.log(params);
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url + 'conta148/getConta28', params, { headers: headers });
    }






}