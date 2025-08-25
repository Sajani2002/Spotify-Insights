import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TopTracksChartComponent } from '../charts/top-tracks-chart/top-tracks-chart.component';
import { ProfileCardComponent } from '../profile-card/profile-card.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
  standalone: true,
  imports: [TopTracksChartComponent, ProfileCardComponent]
})
export class DashboardComponent implements OnInit {
  profile: any = {};
  accessToken: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
  const token = localStorage.getItem('spotifyToken'); // read token

  this.http.get<any>('/api/auth/profile', {
    headers: { Authorization: `Bearer ${token}` }
  }).subscribe(data => {
    this.profile = {
      name: data.display_name,
      email: data.email,
      image: data.images?.[0]?.url
    };
  });

  this.http.get<any>('/api/auth/top-tracks', {
    headers: { Authorization: `Bearer ${token}` }
  }).subscribe(tracks => {
    console.log(tracks); // pass to chart component
  });
}


  login() {
    const clientId = 'b797b53f95f64cc2b565390ea086f441';
    const redirectUri = encodeURIComponent('http://127.0.0.1:4200/callback');
    const scope = 'user-top-read user-read-email user-read-private';

    window.location.href =
      `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}`;
  }
}
