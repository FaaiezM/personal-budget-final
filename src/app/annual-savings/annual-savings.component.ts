import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { AnnualSavingsService } from '../services/annual-savings.service';
import AnnualSavings from '../models/annual-savings'
import { map } from 'rxjs/operators';

@Component({
  selector: 'pb-annual-savings',
  templateUrl: './annual-savings.component.html',
  styleUrls: ['./annual-savings.component.scss']
})
export class AnnualSavingsComponent implements OnInit {

  annualSavings: AnnualSavings[];

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
    this.annualSavingsService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      console.log(data);
      this.annualSavings = data;
    });
  }

}
