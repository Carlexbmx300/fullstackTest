import { NgModule,CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressesComponent } from "../addresses/addresses.component";
import { FindBoxComponent } from "../find-box/find-box.component"
import { MapComponent } from "../map/map.component";
import { AgmCoreModule } from '@agm/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
@NgModule({
  declarations: [AddressesComponent, FindBoxComponent, MapComponent],
  imports: [
    CommonModule,
    AgmCoreModule,
    MdbFormsModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  exports:[AddressesComponent, FindBoxComponent, MapComponent]
})
export class SharedModule { }
