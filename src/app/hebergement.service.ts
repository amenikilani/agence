import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { catchError } from 'rxjs/operators';
import { Hebergement } from './hebergement';
@Injectable()
export class HebergementService {
      //URL for CRUD operations
   hebergementUrl = "http://localhost:8063/hebergements";
    //Create constructor to get Http instance
    constructor(private http:Http) { 
    }
    //Fetch all articles
      getAllHebergements(): Observable<Hebergement[]> {
          return this.http.get(this.hebergementUrl)
             .pipe(map(this.extractData),
              catchError(this.handleError));
  
      }
    //Create article
      createHebergement(hebergement: Hebergement):Observable<any> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: cpHeaders });
          return this.http.post(this.hebergementUrl, hebergement, options)
                 .pipe(map(success => success.status),
                 catchError(this.handleError));
      }
    //Fetch article by id
      getHebergementById(volId: String): Observable<Hebergement> {
      let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: cpHeaders });
      console.log(this.hebergementUrl +"/"+ volId);
      return this.http.get(this.hebergementUrl +"/"+ volId)
           .pipe(map(this.extractData)
           ,catchError(this.handleError));
      }	
    //Update article
      updateHebergement(hebergement: Hebergement):Observable<any> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: cpHeaders });
          return this.http.put(this.hebergementUrl +"/"+ hebergement.id, hebergement, options)
                 .pipe(map(success => success.status),
                 catchError(this.handleError));
                

      }
      //Delete article	
      deleteHebergementById(volId: String): Observable<number> {
      let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: cpHeaders });
      return this.http.delete(this.hebergementUrl +"/"+ volId)
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
