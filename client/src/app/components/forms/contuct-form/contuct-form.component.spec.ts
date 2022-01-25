import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContuctFormComponent } from './contuct-form.component';

describe('ContuctFormComponent', () => {
  let component: ContuctFormComponent;
  let fixture: ComponentFixture<ContuctFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContuctFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContuctFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
