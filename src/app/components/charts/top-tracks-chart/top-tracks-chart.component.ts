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
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#282828',
        titleColor: '#FFFFFF',
        bodyColor: '#B3B3B3'
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: '#B3B3B3',
          font: { size: 10 }
        },
        title: {
          display: true,
          text: 'Track Name',
          color: '#B3B3B3',
          font: { size: 12 }
        }
      },
      y: {
        display: true, // Show Y-axis now
        grid: { display: false },
        title: {
          display: true,
          text: 'Popularity',
          color: '#B3B3B3',
          font: { size: 12 }
        },
        ticks: {
          color: '#B3B3B3',
          font: { size: 10 }
        },
        beginAtZero: true
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