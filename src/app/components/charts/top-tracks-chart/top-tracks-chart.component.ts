import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-top-tracks-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './top-tracks-chart.html',
  styleUrls: ['./top-tracks-chart.scss']
})
export class TopTracksChartComponent implements OnInit {
  public barChartOptions: ChartConfiguration['options'] = { responsive: true };
  public barChartLabels: string[] = [];
  public barChartType: ChartType = 'bar';
  public barChartData: ChartConfiguration['data'] = { labels: [], datasets: [{ data: [], label: 'Popularity' }] };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('/api/auth/top-tracks').subscribe(tracks => {
      this.barChartLabels = tracks.map(t => t.name);
      this.barChartData.datasets[0].data = tracks.map(t => t.popularity);
    });
  }
}
