import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { TransportService } from '../transport.service';
import { Transport } from '../transport';

@Component({
   selector: 'app-transport',
   templateUrl: './transport.component.html',
   styleUrls: ['./transport.component.css']
})
export class TransportComponent implements OnInit { 
   //Component properties
   allTransports: Transport[];
   statusCode: number;
   requestProcessing = false;
   transportIdToUpdate = null;
   processValidation = false;
   files : FileList; 
   //Create form
   transportForm = new FormGroup({
    id:  new FormControl('', Validators.required),
    type:  new FormControl('', Validators.required),
   prix:  new FormControl('', Validators.required),
       nbre_place_dispo : new FormControl('', Validators.required),
    date_depart_dispo: new FormControl('', Validators.required),
        date_fin_dispo:  new FormControl('', Validators.required),
        heure_depart_dispo:  new FormControl('', Validators.required),
        heure_fin_dispo:  new FormControl('', Validators.required),
       ville:  new FormControl('', Validators.required),
	   
   });
   //Create constructor to get service instance
   constructor(private transportService: TransportService) {
   }
   //Create ngOnInit() and and load articles
   ngOnInit(): void {
	   this.getAllTransports();
   }   
   getFiles(event){ 
	this.files = event.target.files; 
} 
logForm(event) { 
	 console.log(this.files); 
} 
   //Fetch all articles
   getAllTransports() {
        this.transportService.getAllTransports()
		  .subscribe(
                data => this.allTransports = data,
                errorCode =>  this.statusCode = errorCode);   
   }
   //Handle create and update article
   onTransportFormSubmit() {
	  this.processValidation = true;   
	  if (this.transportForm.invalid) {
	       return; //Validation failed, exit from method.
	  }   
	  //Form is valid, now perform create or update
	  this.preProcessConfigurations();
	  let transport= this.transportForm.value;
	  if (this.transportIdToUpdate === null) {  
	    //Generate article id then create article
        this.transportService.getAllTransports()
	     .subscribe(transports => {
			 
		   //Generate article id	 
		   let maxIndex = transports.length - 1;
		   let issueWithMaxIndex = transports[maxIndex];
		   let transportId = issueWithMaxIndex.id + 1;
		   transport.id = transportId;
		
		   //Create article
     	   this.transportService.createTransport(transport)
			  .subscribe(successCode => {
					this.statusCode = successCode;
					this.getAllTransports();	
					this.backToCreateTransport();
				 },
				 errorCode => this.statusCode = errorCode
			   );
		 });		
	  } else {  
   	    //Handle update article
        transport.id = this.transportIdToUpdate; 		
	    this.transportService.updateTransport(transport)
	      .subscribe(successCode => {
		            this.statusCode = successCode;
				    this.getAllTransports();	
					this.backToCreateTransport();
			    },
		        errorCode => this.statusCode = errorCode);	  
	  }
   }
   //Load article by id to edit
   loadTransportToEdit(transportId: String) {
      this.preProcessConfigurations();
      this.transportService.getTransportById(transportId)
	      .subscribe(transport => {
		            this.transportIdToUpdate = transport.id;   
					this.transportForm.setValue({ type: transport.type,
            prix: transport.prix,
                nbre_place_dispo : transport.nbre_place_dispo,
             date_depart_dispo: transport.date_depart_dispo,
                 date_fin_dispo: transport.date_fin_dispo,
                 heure_depart_dispo: transport.heure_depart_dispo,
                 heure_fin_dispo: transport.heure_fin_dispo,
                ville: transport.ville });
					this.processValidation = true;
					this.requestProcessing = false;   
		        },
		        errorCode =>  this.statusCode = errorCode);   
   }
   //Delete article
   deleteTransport(issueId: String) {
      this.preProcessConfigurations();
      this.transportService.deleteTransportById(issueId)
	      .subscribe(successCode => {
		            //this.statusCode = successCode;
					//Expecting success code 204 from server
					this.statusCode = 204;
				    this.getAllTransports();	
				    this.backToCreateTransport();
			    },
		        errorCode => this.statusCode = errorCode);    
   }
   //Perform preliminary processing configurations
   preProcessConfigurations() {
      this.statusCode = null;
	  this.requestProcessing = true;   
   }
   //Go back from update to create
   backToCreateTransport() {
      this.transportIdToUpdate = null;
      this.transportForm.reset();	  
	  this.processValidation = false;
   }
}
    
