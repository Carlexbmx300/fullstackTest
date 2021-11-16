import { Component, OnInit } from '@angular/core';
import { MapService } from 'src/app/services/map.service';
import { ADDRESS } from 'src/app/shared/address.interface';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit {
addresses:ADDRESS[];
  constructor(private mapService:MapService) { }

  ngOnInit(): void {
    this.getAddresses()
    
  }
  getAddresses(){
    this.mapService.getAddresses().subscribe(res=>{
      this.addresses = res ;
    })
  }
}
 