import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapService } from 'src/app/services/map.service';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.test';
import { FindBoxComponent } from './find-box.component';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';

describe('FindBoxComponent', () => {
  let component: FindBoxComponent;
  let fixture: ComponentFixture<FindBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindBoxComponent ],
      providers:[{ provide: MapsAPILoader, useValue: { load: jasmine.createSpy('load').and.returnValue(new Promise(() => true)) }}, MapService],
      imports:[AngularFireModule.initializeApp(environment.firebaseConfig), AgmCoreModule, MdbFormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it(`Initializing lat and lng`,()=>{
    component.getCurrentAddress();
    expect(component.latitude).toBe(-17.393852353833072);
    expect(component.longitude).toBe(-66.15696927270388);
  })
});
