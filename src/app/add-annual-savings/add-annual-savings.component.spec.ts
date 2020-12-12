import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnnualSavingsComponent } from './add-annual-savings.component';

describe('AddAnnualSavingsComponent', () => {
  let component: AddAnnualSavingsComponent;
  let fixture: ComponentFixture<AddAnnualSavingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAnnualSavingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAnnualSavingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
