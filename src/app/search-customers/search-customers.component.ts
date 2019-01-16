import { Component, OnInit } from '@angular/core';
import { Vol } from '/home/onsbouneb/Music/agence/src/app/vol';
import { VolService } from '../vol.service';

@Component({
  selector: 'app-search-customers',
  templateUrl: './search-customers.component.html',
  styleUrls: ['./search-customers.component.css']
})
export class SearchCustomersComponent implements OnInit {
 id: number;
  vols: Vol[];
  constructor(private dataService: VolService) { }

  ngOnInit() {
    this.id=0; }
    private searchVol() {
      this.dataService.getCustomersByid(this.id)
        .subscribe(vols => this.vols = vols);
    }
   
    onSubmit() {
      this.searchVol();
    }
  }



