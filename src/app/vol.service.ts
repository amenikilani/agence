import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Vol } from './vol';
@Injectable()
export class VolService {
      //URL for CRUD operations
   volUrl = "http://localhost:8063/vols";
    //Create constructor to get Http instance
    constructor(private http:Http) { 
    }
    //Fetch all articles
      getAllVols(): Observable<Vol[]> {
          return this.http.get(this.volUrl)
             .map(this.extractData)
              .catch(this.handleError);
  
      }
    //Create article
      createVol(vol: Vol):Observable<any> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: cpHeaders });
          return this.http.post(this.volUrl, vol, options)
                 .map(success => success.status)
                 .catch(this.handleError);
      }
    //Fetch article by id
      getVolById(volId: String): Observable<Vol> {
      let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: cpHeaders });
      console.log(this.volUrl +"/"+ volId);
      return this.http.get(this.volUrl +"/"+ volId)
           .map(this.extractData)
           .catch(this.handleError);
      }	
    //Update article
      updateVol(vol: Vol):Observable<any> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: cpHeaders });
          return this.http.put(this.volUrl +"/"+ vol.id, vol, options)
                 .map(success => success.status)
                 .catch(this.handleError);
                

      }
      //Delete article	
      deleteVolById(volId: String): Observable<number> {
      let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: cpHeaders });
      return this.http.delete(this.volUrl +"/"+ volId)
           .map(success => success.status)
           .catch(this.handleError);
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