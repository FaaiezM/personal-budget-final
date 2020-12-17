import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AuthService }  from '../auth/auth.service';
import { MonthlySpending } from '../models/monthly-spending';


@Injectable({
  providedIn: 'root'
})
export class MonthlySpendingService {

  private userID = this.authService.getUid();
  private dbPath = '/data/' + this.userID + '/monthlySpending';

  monthlySpendingRef: AngularFireList<MonthlySpending> = null;

  constructor(private db: AngularFireDatabase, private authService: AuthService) {
    this.monthlySpendingRef = this.db.list(this.dbPath);
  }

  public getAll(): AngularFireList<MonthlySpending> {
    return this.monthlySpendingRef;
  }

  create(monthlySpending: MonthlySpending) {
    return this.monthlySpendingRef.push(monthlySpending).then(res => {
      res.key;
    });
  }

  update(key: string, value: any): Promise<void> {
    return this.monthlySpendingRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.monthlySpendingRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.monthlySpendingRef.remove();
  }
}
