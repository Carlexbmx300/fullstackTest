import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapService } from 'src/app/services/map.service';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.test';
import { MapComponent } from './map.component';
describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapComponent ],
      providers:[MapService],
      imports:[AngularFireModule.initializeApp(environment.firebaseConfig)]
    })
    .compileComponents();
    
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it(`Initializing lat and lng`,()=>{
    component.setCurrentLocation();
    expect(component.latitude).toBe(-17.393852353833072);
    expect(component.longitude).toBe(-66.15696927270388);
  });
});
