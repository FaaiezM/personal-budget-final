import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { ChartsModule } from "ng2-charts"

import { AnnualSavingsComponent } from './components/annual-savings/annual-savings.component';
import { MonthlyBudgetComponent } from './components/monthly-budget/monthly-budget.component';
import { MonthlySpendingComponent } from './components/monthly-spending/monthly-spending.component';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatCardModule, MatTabsModule, ReactiveFormsModule, ChartsModule],
  declarations: [AnnualSavingsComponent, MonthlyBudgetComponent, MonthlySpendingComponent],
  exports: [AnnualSavingsComponent, MonthlyBudgetComponent, MonthlySpendingComponent]
})
export class CoreModule {}
