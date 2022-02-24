import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiringFormComponent } from './hiring-form.component';

describe('HiringFormComponent', () => {
  let component: HiringFormComponent;
  let fixture: ComponentFixture<HiringFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HiringFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HiringFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
