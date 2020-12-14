import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AuthService }  from '../auth/auth.service';
import { MonthlyBudget } from '../models/monthly-budget';


@Injectable({
  providedIn: 'root'
})
export class MonthlyBudgetService {

  private userID = this.authService.getUid();
  private dbPath = '/data/' + this.userID + '/monthlyBudget';

  monthlyBudgetRef: AngularFireList<MonthlyBudget> = null;

  constructor(private db: AngularFireDatabase, private authService: AuthService) {
    this.authService = authService;
    this.monthlyBudgetRef = this.db.list(this.dbPath);
    console.log(this.userID);
    this.db = db;
    console.log(this.dbPath);
  }

  public getAll(): AngularFireList<MonthlyBudget> {
    return this.monthlyBudgetRef;
  }

  create(monthlyBudget: MonthlyBudget) {
    return this.monthlyBudgetRef.push(monthlyBudget).then(res => {
      res.key;
    });
  }

  update(key: string, value: any): Promise<void> {
    return this.monthlyBudgetRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.monthlyBudgetRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.monthlyBudgetRef.remove();
  }
}
