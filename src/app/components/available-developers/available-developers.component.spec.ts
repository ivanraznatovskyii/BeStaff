import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableDevelopersComponent } from './available-developers.component';

describe('AvailableDevelopersComponent', () => {
  let component: AvailableDevelopersComponent;
  let fixture: ComponentFixture<AvailableDevelopersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableDevelopersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableDevelopersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
