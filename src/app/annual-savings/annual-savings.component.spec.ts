import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualSavingsComponent } from './annual-savings.component';

describe('AnnualSavingsComponent', () => {
  let component: AnnualSavingsComponent;
  let fixture: ComponentFixture<AnnualSavingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnualSavingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnualSavingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
