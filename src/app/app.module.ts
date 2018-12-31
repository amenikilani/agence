import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';import { AppComponent } from './app.component';
import { VolComponent } from './vol/vol.component';
import {VolService} from './vol.service';
import { Routes,RouterModule } from '@angular/router';

const appRoutes: Routes = [
  { path: 'vols', component: VolComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    VolComponent
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
  providers: [VolService],
  bootstrap: [AppComponent]
})
export class AppModule { }
