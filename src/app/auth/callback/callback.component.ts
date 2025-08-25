import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-callback',
  template: `<p>Logging in...</p>`,
  standalone: true
})
export class CallbackComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
  this.route.queryParams.subscribe(params => {
    const accessToken = params['access_token']; // get token from query string
    if (accessToken) {
      localStorage.setItem('spotifyToken', accessToken); // save token
      this.router.navigate(['/dashboard']); // redirect to dashboard
    } else {
      console.error('No access token found in query params');
      this.router.navigate(['/dashboard']);
    }
  });
}

}
