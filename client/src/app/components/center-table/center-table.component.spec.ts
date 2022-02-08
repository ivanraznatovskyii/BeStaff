import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterTableComponent } from './center-table.component';

describe('CenterTableComponent', () => {
  let component: CenterTableComponent;
  let fixture: ComponentFixture<CenterTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CenterTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
