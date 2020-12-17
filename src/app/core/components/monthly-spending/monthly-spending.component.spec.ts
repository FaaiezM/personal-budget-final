import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlySpendingComponent } from './monthly-spending.component';

describe('MonthlySpendingComponent', () => {
  let component: MonthlySpendingComponent;
  let fixture: ComponentFixture<MonthlySpendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlySpendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlySpendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
