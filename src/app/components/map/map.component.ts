import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MapService } from 'src/app/services/map.service';
import { ADDRESS } from 'src/app/shared/address.interface';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnChanges {
  latitude:number ;
  longitude:number;
  zoom:number = 15;
  addresses:ADDRESS[];
  fitBound:boolean =false;
  defaultBounds:any;
  @Input() coordsInMap:any;
  constructor(private mapService:MapService) { }

  ngOnChanges(changes:SimpleChanges):void{
    this.showCoord(changes.coordsInMap.currentValue);
  }
  ngOnInit(): void {
    this.setCurrentLocation();
    this.getAddresses();
  }
  getAddresses(){
    this.mapService.getAddresses().subscribe(res=>{
      this.addresses = res;
      if(this.addresses.length>0){
        this.fitBound = true;
      }
    });
  }
  setCurrentLocation() {
    this.latitude = this.mapService.lat;
    this.longitude = this.mapService.lng;
    this.defaultBounds = this.mapService.setBounds(this.latitude, this.longitude);
  }
  showCoord(data){
    if(this.addresses && this.addresses.length>0 && this.addresses[this.addresses.length-1].id == undefined){
      this.addresses.pop();
    }
    if(data){
      this.addresses.push(data);
    } 
  }
} 
     