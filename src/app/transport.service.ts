import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { catchError } from 'rxjs/operators';
import { Transport } from './transport';
@Injectable()
export class TransportService {
      //URL for CRUD operations
   transportUrl = "http://localhost:8063/transports";
    //Create constructor to get Http instance
    constructor(private http:Http) { 
    }
    //Fetch all articles
      getAllTransports(): Observable<Transport[]> {
          return this.http.get(this.transportUrl)
             .pipe(map(this.extractData),
              catchError(this.handleError));
  
      }
    //Create article
      createTransport(transport: Transport):Observable<any> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: cpHeaders });
          return this.http.post(this.transportUrl, transport, options)
                 .pipe(map(success => success.status),
                 catchError(this.handleError));
      }
    //Fetch article by id
      getTransportById(transportId: String): Observable<Transport> {
      let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: cpHeaders });
      console.log(this.transportUrl +"/"+ transportId);
      return this.http.get(this.transportUrl +"/"+ transportId)
           .pipe(map(this.extractData)
           ,catchError(this.handleError));
      }	
    //Update article
      updateTransport(transport: Transport):Observable<any> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: cpHeaders });
          return this.http.put(this.transportUrl +"/"+ transport.id, transport, options)
                 .pipe(map(success => success.status),
                 catchError(this.handleError));
                

      }
      //Delete article	
      deleteTransportById(transportId: String): Observable<number> {
      let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: cpHeaders });
      return this.http.delete(this.transportUrl +"/"+ transportId)
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
