import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { catchError } from 'rxjs/operators';
import { Ville } from './ville';
@Injectable()
export class VilleService {
      //URL for CRUD operations
   villeUrl = "http://localhost:8063/villes";
    //Create constructor to get Http instance
    constructor(private http:Http) { 
    }
    //Fetch all articles
      getAllVilles(): Observable<Ville[]> {
          return this.http.get(this.villeUrl)
             .pipe(map(this.extractData),
              catchError(this.handleError));
  
      }
    //Create article
      createVille(Ville: Ville):Observable<any> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: cpHeaders });
          return this.http.post(this.villeUrl, Ville, options)
                 .pipe(map(success => success.status),
                 catchError(this.handleError));
      }
    //Fetch article by id
      getVilleById(VilleId: String): Observable<Ville> {
      let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: cpHeaders });
      console.log(this.villeUrl +"/"+ VilleId);
      return this.http.get(this.villeUrl +"/"+ VilleId)
           .pipe(map(this.extractData)
           ,catchError(this.handleError));
      }	
    //Update article
      updateVille(Ville: Ville):Observable<any> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: cpHeaders });
          return this.http.put(this.villeUrl +"/"+ Ville.id, Ville, options)
                 .pipe(map(success => success.status),
                 catchError(this.handleError));
                

      }
      //Delete article	
      deleteVilleById(VilleId: String): Observable<number> {
      let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: cpHeaders });
      return this.http.delete(this.villeUrl +"/"+ VilleId)
           .pipe(map(success => success.status)
           ,catchError(this.handleError));
      }	
    private extractData(res: Response) {
        let body = res.json();
          return body;
      }
      private handleError (error: Response | any) {
      console.error(error.message || error);
      return Observable.throw(error.status);
      }
  }
