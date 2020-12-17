import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { MonthlySpendingService } from './../../../services/monthly-spending.service';
import { map, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'pb-monthly-spending',
  templateUrl: './monthly-spending.component.html',
  styleUrls: ['./monthly-spending.component.scss'],
  providers: [MonthlySpendingService]
})
export class MonthlySpendingComponent implements OnInit, OnDestroy {
  monthlySpendingValueList: Observable<any[]>;
  monthlySpendingSnapshotList: Observable<any[]>;
  pieChartIds: any[];

  monthlySpendingForm: FormGroup;
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
      backgroundColor: [],
    },
  ];

  private _$destroy: Subject<boolean> = new Subject();

  constructor(private monthlySpendingService: MonthlySpendingService, private fb: FormBuilder) {
    this.monthlySpendingService = monthlySpendingService;
    this.monthlySpendingSnapshotList = this.monthlySpendingService
      .getAll()
      .snapshotChanges();
    this.monthlySpendingValueList = this.monthlySpendingService
      .getAll()
      .valueChanges();
  }

  ngOnInit(): any {
    this.retrieveUIDData();
    this.retrieveXData();
    this.retrieveYData();
    this.retrieveColorData();

    this.monthlySpendingForm = this.fb.group({
      category: ['',[Validators.required, Validators.minLength(1), Validators.pattern("^[a-zA-Z]+$")]],
      spending: [''],
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
    return this.monthlySpendingSnapshotList
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
    return this.monthlySpendingValueList
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
    return this.monthlySpendingValueList
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.spending;
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
    return this.monthlySpendingValueList
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
        console.log(data);
        this.pieChartColors[0].backgroundColor = data;
      });
  }

  submitForm() {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    this.monthlySpendingForm.patchValue({
      color: randomColor
    })

    const value = this.monthlySpendingForm.getRawValue();
    if (this.monthlySpendingForm.invalid) {
      return;
    }

    this.monthlySpendingService.create(value)
    .then((res) => {
      console.log(res);
    }
    )
    this.monthlySpendingForm.reset();
  };

  removeItem() {
    const value = this.removeItemForm.getRawValue();
    if (this.removeItemForm.invalid) {
      return;
    }
    const index = this.pieChartLabels.indexOf(value.category);
    const key = this.pieChartIds[index];
    this.monthlySpendingService.delete(key);
    this.removeItemForm.reset();
  }
}
