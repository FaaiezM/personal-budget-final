import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualSavingsListComponent } from './annual-savings-list.component';

describe('AnnualSavingsListComponent', () => {
  let component: AnnualSavingsListComponent;
  let fixture: ComponentFixture<AnnualSavingsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnualSavingsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnualSavingsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
