import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'pb-doughnut',
  templateUrl: './doughnut.component.html',
  styleUrls: ['./doughnut.component.scss']
})
export class DoughnutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  doughnutLabels: Label[] = ['BMW', 'Ford', 'Tesla'];
  doughnutData: MultiDataSet = [
    [55, 25, 20]
  ];
  doughnutType: ChartType = 'doughnut';

}
