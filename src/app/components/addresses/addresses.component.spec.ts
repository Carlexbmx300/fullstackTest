import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MapService } from 'src/app/services/map.service';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.test';
import { AddressesComponent } from './addresses.component';
import { of } from 'rxjs';

describe('AddressesComponent', () => {
  let component: AddressesComponent;
  let fixture: ComponentFixture<AddressesComponent>;
  beforeEach(waitForAsync (() => {
    let mapServiceMock = {
      getAddresses: () => of([
        {id:'1', name:'test name',lat:0.123, lng:0.321, date:new Date(2021,11,15)},
        {id:'2', name:'test name 2',lat:0.1234, lng:0.4321, date:new Date(2021,11,15)}
      ])
    };
    TestBed.configureTestingModule({
      declarations: [ AddressesComponent ],
      providers:[{provide:MapService, useValue:mapServiceMock}],
      imports:[AngularFireModule.initializeApp(environment.firebaseConfig)]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component).toBeDefined();
    expect(component).toBeInstanceOf(AddressesComponent);
  });
  it(`the method getAddresses() must initialize the attribute addresses`,()=>{
    component.getAddresses();
    expect(component.addresses.length).toBe(2);
  })
});
