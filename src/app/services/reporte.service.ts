import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {global} from "./global";

@Injectable()
export class ReporteService{
    public url : string;
    constructor(public _http : HttpClient){
        this.url = global.url;
    }
    
    reportes(user:any):Observable<any>{
        let json = JSON.stringify(user);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url+'reporte/reporte',params,{headers: headers});
    }

    reportesH(user:any):Observable<any>{
        let json = JSON.stringify(user);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url+'reporte/reporte2',params,{headers: headers});
    }

    reportesH2(user:any):Observable<any>{
        let json = JSON.stringify(user);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url+'reporte/reporteH2',params,{headers: headers});
    }
    

    searchGener02(pclave : any){
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        
        const response = new Promise(resolve =>{
            this._http.get(global.url+`reporte/searchGener02?search=${pclave}`,{headers: headers}).subscribe(data => {
                resolve(data);

            }, err => {
                console.log(err);
            });
        });
        return response;
    }

    searchGener02_sub(user:any):Observable<any>{
        let json = JSON.stringify(user);
        let params = 'search='+json;
        console.log("parametros!");
        console.log(params);
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url+'reporte/searchGener02_sub',params,{headers: headers});
    }

    reporte_general(user:any):Observable<any>{
        let json = JSON.stringify(user);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url+'reporte/reporte_general',params,{headers: headers});
    }

    

    
}

