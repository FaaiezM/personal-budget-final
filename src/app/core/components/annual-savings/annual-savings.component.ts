import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { AnnualSavingsService } from './../../../services/annual-savings.service';
import { map, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'pb-annual-savings',
  templateUrl: './annual-savings.component.html',
  styleUrls: ['./annual-savings.component.scss'],
  providers: [AnnualSavingsService]
})
export class AnnualSavingsComponent implements OnInit, OnDestroy {
  annualSavingsValueList: Observable<any[]>;
  annualSavingsSnapshotList: Observable<any[]>;


  annualSavingsForm: FormGroup;
  removeItemForm: FormGroup;

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{ticks: {
      beginAtZero: true
    }}] },
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [{ data: [], label: 'Amount Saved' }];

  barChartIds: any[];

  private _$destroy: Subject<boolean> = new Subject();

  constructor(private annualSavingsService: AnnualSavingsService, private fb: FormBuilder) {
    this.annualSavingsService = annualSavingsService;
    this.annualSavingsSnapshotList = this.annualSavingsService
      .getAll()
      .snapshotChanges();
    this.annualSavingsValueList = this.annualSavingsService
      .getAll()
      .valueChanges();
  }

  ngOnInit(): any {
    this.retrieveUIDData();
    this.retrieveXData();
    this.retrieveYData();

    this.annualSavingsForm = this.fb.group({
      year: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(4), Validators.maxLength(4)])],
      savings: [''],
    });

    this.removeItemForm = this.fb.group({
      year: '',
    });


  }

  public ngOnDestroy(){
    this._$destroy.next();
    this._$destroy.complete();
  }

  retrieveUIDData(): any {
    return this.annualSavingsSnapshotList
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
        this.barChartIds = data;
      });
    }

  retrieveXData(): any {
    return this.annualSavingsValueList
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.year;
            return data;
          })
        ),
        takeUntil(this._$destroy)
      )
      .subscribe((data) => {
        console.log(data);
        this.barChartLabels = data;
      });
    }

  retrieveYData(): any {
    return this.annualSavingsValueList
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.savings;
            return data;
          })
        ),
        takeUntil(this._$destroy)
      )
      .subscribe((data) => {
        console.log(data);
        this.barChartData[0].data = data;

      });
  }

  submitForm() {
    const value = this.annualSavingsForm.getRawValue();
    if (this.annualSavingsForm.invalid) {
      return;
    }
    this.annualSavingsService.create(value)
    .then((res) => {
      console.log(res);
    }
    )
    this.annualSavingsForm.reset();
  };

  removeItem() {
    const value = this.removeItemForm.getRawValue();
    if (this.removeItemForm.invalid) {
      return;
    }
    var index = this.barChartLabels.indexOf(value.year);
    var key = this.barChartIds[index];
    this.annualSavingsService.delete(key);
    this.removeItemForm.reset();
  }

}
