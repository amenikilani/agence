import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { VolService } from '../vol.service';
import { Vol } from '../vol';

@Component({
   selector: 'app-vol',
   templateUrl: './vol.component.html',
   styleUrls: ['./vol.component.css']
})
export class VolComponent implements OnInit { 
   //Component properties
   allVols: Vol[];
   statusCode: number;
   requestProcessing = false;
   volIdToUpdate = null;
   processValidation = false;
   files : FileList; 
   //Create form
   volForm = new FormGroup({
       id: new FormControl('', Validators.required),
	   date_depart: new FormControl('', Validators.required),	
	   date_arrive: new FormControl('', Validators.required),	   
       heure_depart: new FormControl('', Validators.required),	   
	   heure_arrive: new FormControl('', Validators.required),
	   prix: new FormControl('', Validators.required),	   
       place_dispo: new FormControl('', Validators.required),	   
       ville_depart: new FormControl('', Validators.required),	   
       ville_arrive: new FormControl('', Validators.required)	   

	   
   });
   //Create constructor to get service instance
   constructor(private volService: VolService) {
   }
   //Create ngOnInit() and and load articles
   ngOnInit(): void {
	   this.getAllVols();
   }   
   getFiles(event){ 
	this.files = event.target.files; 
} 
logForm(event) { 
	 console.log(this.files); 
} 
   //Fetch all articles
   getAllVols() {
        this.volService.getAllVols()
		  .subscribe(
                data => this.allVols = data,
                errorCode =>  this.statusCode = errorCode);   
   }
   //Handle create and update article
   onVolFormSubmit() {
	  this.processValidation = true;   
	  if (this.volForm.invalid) {
	       return; //Validation failed, exit from method.
	  }   
	  //Form is valid, now perform create or update
	  this.preProcessConfigurations();
	  let vol= this.volForm.value;
	  if (this.volIdToUpdate === null) {  
	    //Generate article id then create article
        this.volService.getAllVols()
	     .subscribe(vols => {
			 
		   //Generate article id	 
		   let maxIndex = vols.length - 1;
		   let issueWithMaxIndex = vols[maxIndex];
		   let volId = issueWithMaxIndex.id + 1;
		   vol.id = volId;
		
		   //Create article
     	   this.volService.createVol(vol)
			  .subscribe(successCode => {
					this.statusCode = successCode;
					this.getAllVols();	
					this.backToCreateVol();
				 },
				 errorCode => this.statusCode = errorCode
			   );
		 });		
	  } else {  
   	    //Handle update article
        vol.id = this.volIdToUpdate; 		
	    this.volService.updateVol(vol)
	      .subscribe(successCode => {
		            this.statusCode = successCode;
				    this.getAllVols();	
					this.backToCreateVol();
			    },
		        errorCode => this.statusCode = errorCode);	  
	  }
   }
   //Load article by id to edit
   loadVolToEdit(volId: String) {
      this.preProcessConfigurations();
      this.volService.getVolById(volId)
	      .subscribe(vol => {
		            this.volIdToUpdate = vol.id;   
					this.volForm.setValue({ date_depart : vol.date_depart, 
						date_arrive: vol.date_arrive, 
						heure_depart : vol.heure_depart,
						 heure_arrive : vol.heure_arrive , 
						 prix : vol.prix , 
						 place_dispo : vol.place_dispo ,
						  ville_depart : vol.ville_depart ,
						   ville_arrive : vol.ville_arrive });
					this.processValidation = true;
					this.requestProcessing = false;   
		        },
		        errorCode =>  this.statusCode = errorCode);   
   }
   //Delete article
   deleteVol(issueId: String) {
      this.preProcessConfigurations();
      this.volService.deleteVolById(issueId)
	      .subscribe(successCode => {
		            //this.statusCode = successCode;
					//Expecting success code 204 from server
					this.statusCode = 204;
				    this.getAllVols();	
				    this.backToCreateVol();
			    },
		        errorCode => this.statusCode = errorCode);    
   }
   //Perform preliminary processing configurations
   preProcessConfigurations() {
      this.statusCode = null;
	  this.requestProcessing = true;   
   }
   //Go back from update to create
   backToCreateVol() {
      this.volIdToUpdate = null;
      this.volForm.reset();	  
	  this.processValidation = false;
   }
}
    
