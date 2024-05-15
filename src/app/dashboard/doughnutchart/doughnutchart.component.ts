import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-doughnutchart',
  templateUrl: './doughnutchart.component.html',
  styleUrls: ['./doughnutchart.component.scss']
})
export class DoughnutchartComponent implements OnInit {

  labelProgram: string[] = [];
  dataUserInProgram: number[] = [];


  public donutColors = [
    {
      backgroundColor: [
        'rgba(110, 114, 20, 1)',
        'rgba(118, 183, 172, 1)',
        'rgba(0, 148, 97, 1)',
        'rgba(129, 78, 40, 1)',
        'rgba(129, 199, 111, 1)'
      ]
    }
  ];

  public doughnutChartLabels: string[] = [];
  public demodoughnutChartData: number[] = [];
  public doughnutChartType: string = 'doughnut';

  constructor(private dashService: DashboardService) { }

  ngOnInit(): void {

    this.dashService.getAllProgramsWithUsers().
      subscribe(((res) => {
        for (let key in res) {
          this.labelProgram[key] = res[key].programName;
          this.dataUserInProgram[key] = res[key].programUsers.length
        }
        this.doughnutChartLabels = this.labelProgram;
        this.demodoughnutChartData = this.dataUserInProgram
      }
      )
      )
  }


  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
