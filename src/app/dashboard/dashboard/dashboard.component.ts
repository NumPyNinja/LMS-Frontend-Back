import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets, ChartColor } from 'chart.js';
import { Label } from 'ng2-charts';
import { DashboardService } from '../dashboard.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  data: number[] = [];
  label: string[] = [];

  public barChartOptions1: ChartOptions = {
    //responsive: true, 
    aspectRatio: 1.5,
  }
  public barChartOptions: ChartOptions = {
    aspectRatio: 1.5,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true, // Set y-axis to begin at zero
          },
        },
      ],
    },
  };

  public barChartLabels: Label[] = ['2023'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [], label: '' },
    { data: [], label: '' }
  ];

  constructor(private dashService: DashboardService) { }

  ngOnInit(): void {
    this.dashService.getActiveInActiveUsers().
      subscribe(((res) => {
        for (let key in res) {
          this.data[key] = res[key].count;
          this.label[key] = res[key].status;
        }
        for (let key = 0; key < 2; key++) {
          this.barChartData[key].label = this.label[key];
          this.barChartData[key].data.push(this.data[key]);
        }

      }))
  }
}
