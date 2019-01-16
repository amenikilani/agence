import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';import { AppComponent } from './app.component';
import { VolComponent } from './vol/vol.component';
import {VolService} from './vol.service';
import {HebergementService}from './hebergement.service';
import { Routes,RouterModule } from '@angular/router';
import { HebergementComponent } from './hebergement/hebergement.component';
import { VilleComponent } from './ville/ville.component';
import{VilleService} from './ville.service';
import { TransportComponent } from './transport/transport.component';
import {TransportService} from './transport.service';
import { from } from 'rxjs';
import { SearchCustomersComponent } from './search-customers/search-customers.component';


const appRoutes: Routes = [
  { path: 'vols', component: VolComponent },
  { path: 'hebergements', component: HebergementComponent },
  { path: 'villes', component: VilleComponent },
  { path: 'transports', component: TransportComponent },
  { path: 'findbyid', component: SearchCustomersComponent },


];

@NgModule({
  declarations: [
    AppComponent,
    VolComponent,
    HebergementComponent,
    VilleComponent,
    TransportComponent,
    SearchCustomersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [VolService,HebergementService,VilleService,TransportService],
  bootstrap: [AppComponent]
})
export class AppModule { }
