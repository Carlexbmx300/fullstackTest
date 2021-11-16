import { Component, OnInit, ViewChild, ElementRef, NgZone, Output, EventEmitter } from '@angular/core';
import { MapsAPILoader} from '@agm/core';
import { ADDRESS } from 'src/app/shared/address.interface';
import { MapService } from 'src/app/services/map.service';
@Component({
  selector: 'app-find-box',
  templateUrl: './find-box.component.html',
  styleUrls: ['./find-box.component.scss']
})
export class FindBoxComponent implements OnInit {
latitude: number;
longitude: number;
addressData:ADDRESS;
save:boolean=false;
@ViewChild('search')
  public searchElementRef: ElementRef;
@Output() sendCoords = new EventEmitter();
  constructor(private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private mapService:MapService) {
      this.getCurrentAddress();
     }
 
  ngOnInit(): void {
    this.loadAddress();
  } 
  loadAddress(){
    this.mapsAPILoader.load().then(() => {
      let defaultBounds = this.mapService.setBounds(this.latitude, this.longitude).latLngBounds;
      let options = this.mapService.setAutocompletOptions(defaultBounds);
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, options);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          let data:ADDRESS = {
            lat:place.geometry.location.lat(),
            lng:place.geometry.location.lng(),
            name:place.formatted_address,
            date:new Date()
          };
          this.addressData = data;
          this.sendCoord();
        });
      });
    });
  }
  sendCoord(){
    this.mapService.verifyAddress(this.addressData.name, data=>{
      if(data){
        this.save = true ;
        this.sendCoords.emit(this.addressData);
      }
    })
  
  }
  saveAddress(){
    this.mapService.addAddress(this.addressData);
    this.searchElementRef.nativeElement.value = ''
    this.save = false;
  }
  getCurrentAddress(){
    this.latitude = this.mapService.lat;
    this.longitude = this.mapService.lng;
  }
  finding(e){
    this.save = false;
  }
}
