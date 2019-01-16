import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { VilleService } from '../ville.service';
import { Ville } from '../ville';

@Component({
  selector: 'app-ville',
  templateUrl: './ville.component.html',
  styleUrls: ['./ville.component.css']
})
export class VilleComponent implements OnInit {
   //Component properties
   allVilles: Ville[];
   statusCode: number;
   requestProcessing = false;
   villeIdToUpdate = null;
   processValidation = false;
   files : FileList; 
   //Create form
   villeForm = new FormGroup({
       id: new FormControl('', Validators.required),
	   	 nom_ville: new FormControl('', Validators.required)	   

	   
   });
   //Create constructor to get service instance
   constructor(private villeService: VilleService) {
   }
   //Create ngOnInit() and and load articles
   ngOnInit(): void {
	   this.getAllVilles();
   }   
   getFiles(event){ 
	this.files = event.target.files; 
} 
logForm(event) { 
	 console.log(this.files); 
} 
   //Fetch all articles
   getAllVilles() {
        this.villeService.getAllVilles()
		  .subscribe(
                data => this.allVilles = data,
                errorCode =>  this.statusCode = errorCode);   
   }
   //Handle create and update article
   onVilleFormSubmit() {
	  this.processValidation = true;   
	  if (this.villeForm.invalid) {
	       return; //Validation failed, exit from method.
	  }   
	  //Form is valid, now perform create or update
	  this.preProcessConfigurations();
	  let ville= this.villeForm.value;
	  if (this.villeIdToUpdate === null) {  
	    //Generate article id then create article
        this.villeService.getAllVilles()
	     .subscribe(villes => {
			 
		   //Generate article id	 
		   let maxIndex = villes.length - 1;
		   let issueWithMaxIndex = villes[maxIndex];
		   let villeId = issueWithMaxIndex.id + 1;
		   ville.id = villeId;
		
		   //Create article
     	   this.villeService.createVille(ville)
			  .subscribe(successCode => {
					this.statusCode = successCode;
					this.getAllVilles();	
					this.backToCreateVille();
				 },
				 errorCode => this.statusCode = errorCode
			   );
		 });		
	  } else {  
   	    //Handle update article
        ville.id = this.villeIdToUpdate; 		
      this.villeService.updateVille(ville)
	      .subscribe(successCode => {
		            this.statusCode = successCode;
				    this.getAllVilles();	
					this.backToCreateVille();
			    },
		        errorCode => this.statusCode = errorCode);	  
	  }
   }
   //Load article by id to edit
   loadVilleToEdit(villeId: String) {
      this.preProcessConfigurations();
      this.villeService.getVilleById(villeId)
	      .subscribe(ville => {
		            this.villeIdToUpdate = ville.id;   
					this.villeForm.setValue({nom_ville : ville.nom_ville});
					this.processValidation = true;
					this.requestProcessing = false;   
		        },
		        errorCode =>  this.statusCode = errorCode);   
   }
   //Delete article
   deleteVille(issueId: String) {
      this.preProcessConfigurations();
      this.villeService.deleteVilleById(issueId)
	      .subscribe(successCode => {
		            //this.statusCode = successCode;
					//Expecting success code 204 from server
					this.statusCode = 204;
				    this.getAllVilles();	
				    this.backToCreateVille();
			    },
		        errorCode => this.statusCode = errorCode);    
   }
   //Perform preliminary processing configurations
   preProcessConfigurations() {
      this.statusCode = null;
	  this.requestProcessing = true;   
   }
   //Go back from update to create
   backToCreateVille() {
      this.villeIdToUpdate = null;
      this.villeForm.reset();	  
	  this.processValidation = false;
   }
}
    
