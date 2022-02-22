import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdCalculationComponent } from './ad-calculation.component';

describe('AdCalculationComponent', () => {
  let component: AdCalculationComponent;
  let fixture: ComponentFixture<AdCalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdCalculationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
