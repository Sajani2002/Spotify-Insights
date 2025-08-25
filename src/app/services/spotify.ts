import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private API_URL = 'http://localhost:3000/api/auth'; // backend base URL

  constructor(private http: HttpClient) {}

  getProfile(): Observable<any> {
    return this.http.get(`${this.API_URL}/profile`, { withCredentials: true });
  }

  getTopTracks(): Observable<any> {
    return this.http.get(`${this.API_URL}/top-tracks`, { withCredentials: true });
  }
}
