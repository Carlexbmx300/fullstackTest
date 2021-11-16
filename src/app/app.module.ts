import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MapComponent } from './components/map/map.component';
import { FindBoxComponent } from './components/find-box/find-box.component';
import { AddressesComponent } from './components/addresses/addresses.component';
import { AgmCoreModule } from '@agm/core';
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from "../environments/environment";
import { SharedModule } from "./components/shared/shared.module";
@NgModule({
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent
  ],
  imports: [  
    SharedModule,
    CommonModule, 
    BrowserModule,
    AppRoutingModule,
    MdbFormsModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyBBbR7eZX5AAbywYuDAKOP_AbHG8kA0bSI',
      libraries:['places']
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig)    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
