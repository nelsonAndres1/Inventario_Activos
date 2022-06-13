import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Gener02 } from "../models/gener02";
import { global } from "./global";


@Injectable()
export class Conta19Service{
    public url: string;
    constructor(
        public _http: HttpClient
    ){
        this.url = global.url;
    }

    getConta19(user:any): Observable<any>{
        let json = JSON.stringify(user);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url+'user/getConta19',params, {headers: headers});
    }
    searchConta19(pclave : any){
        const response = new Promise(resolve =>{
            this._http.get(global.url+`conta19/buscar?search=${pclave}`).subscribe(
                data => {
                    resolve(data);
                }, err =>{
                    console.log(err);
                });
        });
        return response;
    }


}