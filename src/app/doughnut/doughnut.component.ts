import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'pb-doughnut',
  templateUrl: './doughnut.component.html',
  styleUrls: ['./doughnut.component.scss']
})
export class DoughnutComponent implements OnInit {

  // doughnutLabels: Label[] = ['BMW', 'Ford', 'Tesla'];
  // doughnutData: MultiDataSet = [
  //   [55, 25, 20]
  // ];
  public dataSource = {
  datasets: [
    {
      data: [],
      backgroundColor: [
        'yellow',
        'orange',
        'magenta',
        'red',
        'green',
        'blue',
        'purple',
      ],
    },
  ],
  labels: [],
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('http://localhost:3000/budget').subscribe((res: any) => {
      for (var i = 0; i < res.myBudget.length; i++) {
        this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
        this.dataSource.labels[i] = res.myBudget[i].title;
        this.createChart();
      }
    });
  }

  createChart() {
    var canvas = <HTMLCanvasElement>document.getElementById('myChart');
    const ctx = canvas.getContext('2d');
    var myDoughnutChart = new Chart(ctx, {
      type: 'doughnut',
      data: this.dataSource,
    });
  }
}


// <div class="chart-wrapper">
//     <canvas baseChart
//     [data]="doughnutData"
//     [labels]="doughnutLabels"
//     [chartType]="doughnutType">
//   </canvas>
// </div>



