import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from "ng2-charts"
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { DoughnutComponent } from './doughnut/doughnut.component';

import { AuthService } from './auth/auth.service';

var firebaseConfig = {
  apiKey: "AIzaSyBc7umr1Uiu7dxpgLAZwLgghianL92-XGQ",
  authDomain: "personal-budget-final-1deff.firebaseapp.com",
  projectId: "personal-budget-final-1deff",
  storageBucket: "personal-budget-final-1deff.appspot.com",
  messagingSenderId: "691091947321",
  appId: "1:691091947321:web:fc78d8ef444172f93232e8",
  measurementId: "G-TJPDL74G2Q"
};

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    DoughnutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})

export class AppModule { }

