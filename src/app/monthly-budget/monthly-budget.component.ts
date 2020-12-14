import { Component, OnInit, Input } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { MonthlyBudgetService } from '../services/monthly-budget.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MonthlyBudget } from '../models/monthly-budget';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'pb-monthly-budget',
  templateUrl: './monthly-budget.component.html',
  styleUrls: ['./monthly-budget.component.scss']
})
export class MonthlyBudgetComponent implements OnInit {
  monthlyBudgetValueList: Observable<any[]>;
  monthlyBudgetSnapshotList: Observable<any[]>;
  pieChartIds: any[];

  monthlyBudgetForm: FormGroup;
  removeItemForm: FormGroup;


  pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    tooltips: {
      enabled: true,
      mode: 'single',
      callbacks: {
        label: function (tooltipItems, data) {
          return data.datasets[0].data[tooltipItems.index] + ' %';
        }
      }
    },
  };

  pieChartLabels: Label[] = [];

  pieChartData: number[] = [];

  pieChartType: ChartType = 'pie';

  pieChartLegend = true;

  pieChartPlugins = [];

  pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];

  constructor(private monthlyBudgetService: MonthlyBudgetService, private fb: FormBuilder) {
    this.monthlyBudgetService = monthlyBudgetService;
    this.monthlyBudgetSnapshotList = this.monthlyBudgetService
      .getAll()
      .snapshotChanges();
    this.monthlyBudgetValueList = this.monthlyBudgetService
      .getAll()
      .valueChanges();
  }

  ngOnInit(): any {
    this.retrieveUIDData();
    this.retrieveXData();
    this.retrieveYData();

    this.monthlyBudgetForm = this.fb.group({
      category: ['',[Validators.required, Validators.minLength(4),Validators.maxLength(4), Validators.pattern("^[0-9]*$")]],
      budget: [''],
    });

    this.removeItemForm = this.fb.group({
      category: '',
    });

  }

  retrieveUIDData(): any {
    return this.monthlyBudgetSnapshotList
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.key;
            console.log(a.key);
            return data;
          })
        )
      )
      .subscribe((data) => {
        console.log(data);
        this.pieChartIds = data;
      });
    }

  retrieveXData(): any {
    return this.monthlyBudgetValueList
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.category;
            console.log(a);
            return data;
          })
        )
      )
      .subscribe((data) => {
        console.log(data);
        this.pieChartLabels = data;
      });
    }

  retrieveYData(): any {
    return this.monthlyBudgetValueList
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.budget;
            return data;
          })
        )
      )
      .subscribe((data) => {
        console.log(data);
        this.pieChartData = data;

      });
  }

  submitForm() {
    const value = this.monthlyBudgetForm.getRawValue();
    console.log(value);
    this.monthlyBudgetService.create(value)
    .then((res) => {
      console.log(res);
    }
    )
  };

  removeItem() {
    const value = this.removeItemForm.getRawValue();
    if (value.category == '') return;
    var index = this.pieChartLabels.indexOf(value.category);
    var key = this.pieChartIds[index];
    this.monthlyBudgetService.delete(key);
  }
}
