import { Component } from '@angular/core';
import { TopTracksChartComponent } from '../charts/top-tracks-chart/top-tracks-chart.component';
import { T } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TopTracksChartComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent {}
