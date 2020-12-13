import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from "ng2-charts"
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { AnnualSavingsComponent } from './annual-savings/annual-savings.component';
import { MonthlyBudgetComponent } from './monthly-budget/monthly-budget.component';
import { MonthlySpendingComponent } from './monthly-spending/monthly-spending.component';

import { AuthService } from './auth/auth.service';
import { AnnualSavings } from './models/annual-savings';
import { environment } from '../environments/environment';
import { AnnualSavingsListComponent } from './annual-savings-list/annual-savings-list.component';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    AnnualSavingsComponent,
    MonthlyBudgetComponent,
    MonthlySpendingComponent,
    AnnualSavingsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})

export class AppModule { }

