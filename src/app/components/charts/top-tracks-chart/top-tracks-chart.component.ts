// src/app/components/charts/top-tracks-chart/top-tracks-chart.component.ts

import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { SpotifyService } from '../../../services/spotify';

@Component({
  selector: 'app-top-tracks-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './top-tracks-chart.html',
  styleUrls: ['./top-tracks-chart.scss'] // Make sure to add this line
})
export class TopTracksChartComponent implements OnChanges {
  @Input() tracks: any[] = [];

  // --- CHART DATA CONFIGURATION ---
  public chartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [{
      data: [],
      label: 'Popularity',
      backgroundColor: '#1DB954', // Bar color
      borderColor: '#1DB954',
      borderRadius: 4, // Rounded bars
      barThickness: 12 // Fixed bar thickness
    }]
  };

  // --- CHART OPTIONS CONFIGURATION (FOR STYLING) ---
  public chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false, // Allows chart to fill container height
    plugins: {
      legend: {
        display: false // Hide the legend (e.g., "Popularity")
      },
      tooltip: {
        backgroundColor: '#282828', // Dark tooltip background
        titleColor: '#FFFFFF',
        bodyColor: '#B3B3B3'
      }
    },
    scales: {
      x: { // X-axis (track names)
        grid: {
          display: false // Hide vertical grid lines
        },
        ticks: {
          color: '#B3B3B3', // Muted color for track names
          font: {
            size: 10
          }
        }
      },
      y: { // Y-axis (popularity)
        display: false, // Hide the entire Y-axis (numbers and line)
        grid: {
          display: false // Hide horizontal grid lines
        }
      }
    }
  };

  constructor(private spotify: SpotifyService) {}

  ngOnChanges(): void {
    // Limit to top 10 for a cleaner chart
    const topTenTracks = this.tracks.slice(0, 10);
    
    this.chartData.labels = topTenTracks.map((track: any) => this.truncateLabel(track.name, 10));
    this.chartData.datasets[0].data = topTenTracks.map((track: any) => track.popularity);
  }

  // Helper function to prevent long track names from cluttering the chart
  private truncateLabel(str: string, num: number): string {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + '...';
  }
}