import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import AnnualSavings from '../models/annual-savings';
import { AuthService }  from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AnnualSavingsService {

  private userID = this.authService.currentUserID;
  private dbPath = '/data/' + this.userID + '/annualSavings';

  annualSavingsRef: AngularFireList<AnnualSavings> = null;

  constructor(private db: AngularFireDatabase, private authService: AuthService) {
    this.annualSavingsRef = db.list(this.dbPath);
    this.authService = authService;
    console.log(this.userID);
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
