import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { AnnualSavingsService } from '../services/annual-savings.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AnnualSavings } from '../models/annual-savings';

@Component({
  selector: 'pb-annual-savings',
  templateUrl: './annual-savings.component.html',
  styleUrls: ['./annual-savings.component.scss']
})
export class AnnualSavingsComponent implements OnInit {

  annualSavings: Observable<AnnualSavings[]>;
  data = [];
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
  };
  barChartLabels: Label[] = ['2013', '2014', '2015', '2016', '2017', '2018'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [2500, 5900, 6000, 8100, 8600, 8050, 1200], label: 'Company A' },
    { data: [2800, 4800, 4000, 7900, 9600, 8870, 1400], label: 'Company B' }
  ];


  constructor(private annualSavingsService: AnnualSavingsService) {
    this.annualSavingsService = annualSavingsService;
  }

  ngOnInit(): void {
    this.retrieveAnnualSavings();
  }

  retrieveAnnualSavings(): void {
    this.annualSavingsService.initDBPath();
    this.annualSavingsService.getAll().valueChanges()
    .subscribe((data) => { this.data = data; });
    console.log(this.data);
    // .pipe(
    //   map(changes =>
    //     changes.map(year =>
    //       ({ key: year.payload.key, ...year.payload.val() })
    //     )
    //   )
    // )
    // .subscribe(data => {
    //   this.annualSavings = data;
    // });
  }

}
