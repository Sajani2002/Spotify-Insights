import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TopTracksChartComponent } from '../charts/top-tracks-chart/top-tracks-chart.component';
import { ProfileCardComponent } from '../profile-card/profile-card.component';
import { TopArtistsChartComponent } from '../charts/top-artists-chart/top-artists-chart.component';
import { TopGenresCardComponent } from '../charts/top-genres-card/top-genres-card.component';
import { MoodInsightCardComponent } from '../mood-insights-card/mood-insights-card.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TopTracksChartComponent,
    ProfileCardComponent,
    TopArtistsChartComponent,
    TopGenresCardComponent,
    MoodInsightCardComponent
  ]
})
export class DashboardComponent implements OnInit {
  profile: any = {};
  accessToken: string = '';
  topTracks: any[] = [];
  topArtists: any[] = [];
  topGenres: string[] = [];
  moodSummary: string = '';
  moodEmoji: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
  const token = localStorage.getItem('spotifyToken');
  if (!token) return;

  this.http.get<any>('http://127.0.0.1:3000/api/auth/profile', {
    headers: { Authorization: `Bearer ${token}` }
  }).subscribe(data => {
    this.profile = {
      name: data.display_name,
      email: data.email,
      image: data.images?.[0]?.url
    };
  });

  this.http.get<any>('http://127.0.0.1:3000/api/auth/top-tracks', {
    headers: { Authorization: `Bearer ${token}` }
  }).subscribe(tracks => {
    console.log('Top tracks:', tracks); // Add this line
    this.topTracks = tracks.slice(0, 5); // Limit to 5 tracks
  });

  this.http.get<any>('http://127.0.0.1:3000/api/auth/top-artists', {
    headers: { Authorization: `Bearer ${token}` }
  }).subscribe(artists => {
    console.log('Top artists:', artists); // Add this line
    this.topArtists = artists;
  });

  this.http.get<any>('http://127.0.0.1:3000/api/auth/top-genres', {
    headers: { Authorization: `Bearer ${token}` }
  }).subscribe(genres => {
    console.log('Top genres:', genres); // Debug log
    this.topGenres = genres;
  });

  this.http.get<any>('http://127.0.0.1:3000/api/auth/mood-insights', {
    headers: { Authorization: `Bearer ${token}` }
  }).subscribe(mood => {
    console.log('Mood insight:', mood); // Debug log
    this.moodSummary = mood.moodSummary;
    this.moodEmoji = mood.moodEmoji;
  });
}


  login() {
  const clientId = 'b797b53f95f64cc2b565390ea086f441';
  const redirectUri = encodeURIComponent('http://127.0.0.1:3000/api/auth/callback');
  const scope = 'user-top-read user-read-email user-read-private';

  window.location.href =
    `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}`;
}

logout() {
  localStorage.removeItem('spotifyToken');
  window.location.reload();
}
}
