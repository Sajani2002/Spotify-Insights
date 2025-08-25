import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-top-tracks-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './top-tracks-chart.html',
  styleUrls: ['./top-tracks-chart.scss']
})
export class TopTracksChartComponent {

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };

  public barChartLabels: string[] = ['Track 1', 'Track 2', 'Track 3', 'Track 4', 'Track 5'];

  public barChartType: ChartType = 'bar';

  public barChartData: ChartConfiguration['data'] = {
    labels: this.barChartLabels,
    datasets: [
      { data: [65, 59, 80, 81, 56], label: 'Popularity' }
    ]
  };
}
