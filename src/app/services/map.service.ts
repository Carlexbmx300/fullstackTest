import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ADDRESS } from "../shared/address.interface"
@Injectable({
  providedIn: 'root'
})
export class MapService {
private addressCollection: AngularFirestoreCollection<ADDRESS>;
private addressList:Observable<ADDRESS[]>;
lat:number =-17.393852353833072;
lng:number =-66.15696927270388;
  constructor(private db:AngularFirestore, private afs:AngularFirestore,) { 
    this.addressCollection =  db.collection<ADDRESS>(`address`, ref => ref.orderBy("date"));
    this.addressList = this.addressCollection.snapshotChanges().pipe(map(
      actions =>{
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      }
    ));
  }

  getAddresses(){
    return this.addressList;
  }
  addAddress(data){
    return this.addressCollection.add(data);
  }
  setBounds(lat, ln){
    let defaultBounds = {
      latLngBounds: {
      north: lat+ 0.1,
      south: lat - 0.1,
      east: ln + 0.1,
      west: ln - 0.1
      },
      strictBounds: true
    };
    return defaultBounds;
  }
  setAutocompletOptions(bounds){
    let options = {
      bounds: bounds,
      componentRestrictions: { country: "bo" },
      strictBounds: true,
      types: ["address"],
    };
    return options
  }
  verifyAddress(address, callback){
    var adr = this.afs.collection(`address`, ref=>ref.where("name","==",address))
    return adr.get().subscribe(a=>{
      if(a.empty){
        callback(true);
      }else{
        callback(false);       
      }
    })
    
  }
}
