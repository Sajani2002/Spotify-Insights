import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotifyService } from '../../services/spotify';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-card.html',
  styleUrls: ['./profile-card.scss']
})
export class ProfileCardComponent implements OnInit {
  profile: any;

  constructor(private spotify: SpotifyService) {}

  ngOnInit(): void {
    this.spotify.getProfile().subscribe(data => {
      this.profile = data;
    });
  }
}
