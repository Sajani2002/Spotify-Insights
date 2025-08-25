import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { SpotifyService } from '../../../services/spotify';

@Component({
  selector: 'app-top-tracks-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './top-tracks-chart.html'
})
export class TopTracksChartComponent implements OnInit {
  chartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [{ data: [], label: 'Popularity', backgroundColor: '#1DB954' }]
  };

  constructor(private spotify: SpotifyService) {}

  ngOnInit(): void {
    this.spotify.getTopTracks().subscribe(data => {
      this.chartData.labels = data.items.map((track: any) => track.name);
      this.chartData.datasets[0].data = data.items.map((track: any) => track.popularity);
    });
  }
}
