import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';

import { CoreModule } from '../core/core.module';
import { ChartsComponent } from './charts.component';

const routes: Routes = [
  {
    path: '',
    component: ChartsComponent,
  },
];

@NgModule({
  declarations: [ChartsComponent],
  imports: [
    CommonModule,
    CoreModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ChartsModule { }
