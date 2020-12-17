import { Component, OnDestroy, OnInit} from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { MonthlyBudgetService } from './../../../services/monthly-budget.service';
import { map, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'pb-monthly-budget',
  templateUrl: './monthly-budget.component.html',
  styleUrls: ['./monthly-budget.component.scss'],
  providers: [MonthlyBudgetService]
})
export class MonthlyBudgetComponent implements OnInit, OnDestroy {
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
      backgroundColor: ['green'],
    },
  ];

  private _$destroy: Subject<boolean> = new Subject();

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
    this.retrieveColorData();

    this.monthlyBudgetForm = this.fb.group({
      category: ['',[Validators.required, Validators.minLength(1), Validators.pattern("^[a-zA-Z]+$")]],
      budget: [''],
      color: ['']
    });

    this.removeItemForm = this.fb.group({
      category: '',
    });
  }

  public ngOnDestroy(){
    this._$destroy.next();
    this._$destroy.complete();
  }

  retrieveUIDData(): any {
    return this.monthlyBudgetSnapshotList
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.key;
            return data;
          })
        ),
        takeUntil(this._$destroy)
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
            return data;
          })
        ),
        takeUntil(this._$destroy)
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
        ),
        takeUntil(this._$destroy)
      )
      .subscribe((data) => {
        console.log(data);
        this.pieChartData = data;
      });
  }

  retrieveColorData(): any {
    return this.monthlyBudgetValueList
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.color;
            return data;
          })
        ),
        takeUntil(this._$destroy)
      )
      .subscribe((data) => {
        this.pieChartColors[0].backgroundColor = data;
      });
  }

  submitForm() {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    this.monthlyBudgetForm.patchValue({
      color: randomColor
    })

    const value = this.monthlyBudgetForm.getRawValue();
    if (this.monthlyBudgetForm.invalid) {
      return;
    }

    this.monthlyBudgetService.create(value)
    .then((res) => {
      console.log(res);
    }
    )
    this.monthlyBudgetForm.reset();
  };

  removeItem() {
    const value = this.removeItemForm.getRawValue();
    if (this.removeItemForm.invalid) {
      return;
    }
    const index = this.pieChartLabels.indexOf(value.category);
    const key = this.pieChartIds[index];
    this.monthlyBudgetService.delete(key);
    this.removeItemForm.reset();

  }
}
