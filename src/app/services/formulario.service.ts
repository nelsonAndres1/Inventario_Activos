import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Gener02} from "../models/gener02";
import {global} from "./global";


@Injectable()

export class FormularioService{
    public url : string;
    constructor(public _http : HttpClient) {
        this.url = global.url;
    }
    searchGener02(pclave : any){
        const response = new Promise(
            resolve=>{
                this._http.get(global.url+`formulario/searchGener02?search=${pclave}`).subscribe(data =>{
                    resolve(data);
                }, err => {
                    console.log(err);
                });
            });
            return response;
    }
}