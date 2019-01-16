export class Hebergement {
    id: number;
    ville: number ;
    date_depart_dispo: Date ;
    date_fin_dispo: number ;
    designation : string ;
    prix : number;
    nbre_chambre: number;
 

      
constructor(id: number ,ville : number, date_depart_dispo: Date ,date_fin_dispo : Date ,designation : String , prix : number, nbre_chambre: number){
    ville : this.ville;
    date_depart_dispo: this.date_depart_dispo;
     date_fin_dispo: this.date_fin_dispo; 
     designation: this.designation;
       prix: this.prix;
        nbre_chambre: this.nbre_chambre;
    
}
}