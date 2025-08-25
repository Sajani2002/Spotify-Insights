import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TopTracksChartComponent } from '../charts/top-tracks-chart/top-tracks-chart.component'; // <-- correct path

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
  standalone: true,
  imports: [TopTracksChartComponent] // import chart here
})
export class DashboardComponent implements OnInit {
  profile: { name?: string; email?: string; image?: string } = {};

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>('/api/auth/profile').subscribe(data => {
      this.profile = data;
    });
  }

  login() {
  window.location.href = '/api/auth/login';
}

}
