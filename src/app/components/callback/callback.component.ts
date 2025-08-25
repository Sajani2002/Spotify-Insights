import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  template: `<p>Authenticating...</p>`
})
export class CallbackComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('access_token');
    if (token) {
      localStorage.setItem('spotifyToken', token);
      this.router.navigate(['/dashboard']);
    } else {
      // handle error
      this.router.navigate(['/']);
    }
  }
}