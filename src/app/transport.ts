export class Transport {
   
    id: number;
    type: String;
   prix: number;
       nbre_place_dispo : number;
    date_depart_dispo: Date;
        date_fin_dispo: Date;
        heure_depart_dispo: Date;
        heure_fin_dispo: Date;
       ville: number;
  
      
      
constructor(id: number ,
    type: String ,
   prix: number ,
       nbre_place_dispo : number ,
    date_depart_dispo: Date ,
        date_fin_dispo: Date ,
        heure_depart_dispo: Date ,
        heure_fin_dispo: Date ,
       ville: number){

        id: this.id;
        type: this.type;
       prix: this.prix;
           nbre_place_dispo : this.nbre_place_dispo;
        date_depart_dispo: this.date_depart_dispo;
            date_fin_dispo: this.date_fin_dispo;
            heure_depart_dispo: this.heure_depart_dispo;
            heure_fin_dispo: this.heure_fin_dispo;
           ville: this.ville;
      

       
}
}