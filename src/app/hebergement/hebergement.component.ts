import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { HebergementService } from '../hebergement.service';
import { Hebergement } from '../hebergement';

@Component({
   selector: 'app-hebergement',
   templateUrl: './hebergement.component.html',
   styleUrls: ['./hebergement.component.css']
})
export class HebergementComponent implements OnInit { 
   //Component properties
   allHebergements: Hebergement[];
   statusCode: number;
   requestProcessing = false;
   hebergementIdToUpdate = null;
   processValidation = false;
   files : FileList; 
   //Create form

   hebergementForm = new FormGroup({
       id: new FormControl('', Validators.required),
	   ville: new FormControl('', Validators.required),	
	   date_depart_dispo: new FormControl('', Validators.required),	   
       date_fin_dispo: new FormControl('', Validators.required),	   
	   designation: new FormControl('', Validators.required),
	   prix: new FormControl('', Validators.required),	   
       nbre_chambre: new FormControl('', Validators.required)   
     	   
	   
   });
   //Create constructor to get service instance
   constructor(private hebergementService: HebergementService) {
   }
   //Create ngOnInit() and and load articles
   ngOnInit(): void {
	   this.getAllHebergements();
   }   
   getFiles(event){ 
	this.files = event.target.files; 
} 
logForm(event) { 
	 console.log(this.files); 
} 
   //Fetch all articles
   getAllHebergements() {
        this.hebergementService.getAllHebergements()
		  .subscribe(
                data => this.allHebergements = data,
                errorCode =>  this.statusCode = errorCode);   
   }
   //Handle create and update article
   onHebergementFormSubmit() {
	  this.processValidation = true;   
	  if (this.hebergementForm.invalid) {
	       return; //Validation failed, exit from method.
	  }   
	  //Form is valid, now perform create or update
	  this.preProcessConfigurations();
	  let hebergement= this.hebergementForm.value;
	  if (this.hebergementIdToUpdate === null) {  
	    //Generate article id then create article
        this.hebergementService.getAllHebergements()
	     .subscribe(hebergements => {
			 
		   //Generate article id	 
		   let maxIndex = hebergements.length - 1;
		   let issueWithMaxIndex = hebergements[maxIndex];
		   let hebergementId = issueWithMaxIndex.id + 1;
		   hebergement.id = hebergementId;
		
		   //Create article
     	   this.hebergementService.createHebergement(hebergement)
			  .subscribe(successCode => {
					this.statusCode = successCode;
					this.getAllHebergements();	
					this.backToCreateHebergement();
				 },
				 errorCode => this.statusCode = errorCode
			   );
		 });		
	  } else {  
   	    //Handle update article
        hebergement.id = this.hebergementIdToUpdate; 		
	    this.hebergementService.updateHebergement(hebergement)
	      .subscribe(successCode => {
		            this.statusCode = successCode;
				    this.getAllHebergements();	
					this.backToCreateHebergement();
			    },
		        errorCode => this.statusCode = errorCode);	  
	  }
   }
   //Load article by id to edit
   loadHebergementToEdit(hebergementId: String) {
      this.preProcessConfigurations();
      this.hebergementService.getHebergementById(hebergementId)
	      .subscribe(hebergement => {
		            this.hebergementIdToUpdate = hebergement.id;   
					this.hebergementForm.setValue({ ville: hebergement.ville,
						 date_depart_dispo : hebergement.date_depart_dispo, 
						date_fin_dispo : hebergement.date_fin_dispo , 
						 designation: hebergement.designation, 
						prix : hebergement.prix ,
						 nbre_chambre : hebergement.nbre_chambre});
					this.processValidation = true;
					this.requestProcessing = false;   
		        },
		        errorCode =>  this.statusCode = errorCode);   
   }
   //Delete article
   deleteHebergement(issueId: String) {
      this.preProcessConfigurations();
      this.hebergementService.deleteHebergementById(issueId)
	      .subscribe(successCode => {
		            //this.statusCode = successCode;
					//Expecting success code 204 from server
					this.statusCode = 204;
				    this.getAllHebergements();	
				    this.backToCreateHebergement();
			    },
		        errorCode => this.statusCode = errorCode);    
   }
   //Perform preliminary processing configurations
   preProcessConfigurations() {
      this.statusCode = null;
	  this.requestProcessing = true;   
   }
   //Go back from update to create
   backToCreateHebergement() {
      this.hebergementIdToUpdate = null;
      this.hebergementForm.reset();	  
	  this.processValidation = false;
   }
}