import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-artists-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-artists-chart.html',
  styleUrls: ['./top-artists-chart.scss']
})
export class TopArtistsChartComponent {
  @Input() artists: any[] = [];
}