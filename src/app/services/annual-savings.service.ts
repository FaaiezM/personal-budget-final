import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AuthService }  from '../auth/auth.service';
import { AnnualSavings } from '../models/annual-savings';

@Injectable({
  providedIn: 'root'
})
export class AnnualSavingsService {

  private userID = this.authService.getUid();
  private dbPath = '/data/' + this.userID + '/annualSavings';

  annualSavingsRef: AngularFireList<AnnualSavings> = null;

  constructor(private db: AngularFireDatabase, private authService: AuthService) {
    this.authService = authService;
    this.annualSavingsRef = this.db.list(this.dbPath);
    console.log(this.userID);
    this.db = db;
    console.log(this.dbPath);
  }

  public getAll(): AngularFireList<AnnualSavings> {
    return this.annualSavingsRef;
  }

  create(annualSavings: AnnualSavings): any {
    return this.annualSavingsRef.push(annualSavings);
  }

  update(uid: string, value: any): Promise<void> {
    return this.annualSavingsRef.update(uid, value);
  }

  delete(uid: string): Promise<void> {
    return this.annualSavingsRef.remove(uid);
  }

  deleteAll(): Promise<void> {
    return this.annualSavingsRef.remove();
  }
}
