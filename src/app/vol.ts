
    export class Vol {
        id: number;
        date_depart: Date ;
        date_arrive : Date ;
        heure_depart : number ;
        heure_arrive : number ;
        prix : number;
        place_dispo: number;
        ville_depart : string;
        ville_arrive : string;
    
	
          
    constructor(id: number , date_depart: Date ,date_arrive : Date ,heure_depart : Date ,heure_arrive : Date , prix : number,place_dispo: number,  ville_depart : string, ville_arrive : string){
        date_depart: this.date_depart;
         date_arrive: this.date_arrive; 
         heure_depart: this.heure_depart;
          heure_arrive: this.heure_arrive;
           prix: this.prix;
            place_dispo: this.place_dispo;
             ville_depart: this.ville_depart;
             ville_arrive: this.ville_arrive;

    }
    }