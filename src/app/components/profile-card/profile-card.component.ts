import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.html',
  styleUrls: ['./profile-card.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ProfileCardComponent implements OnChanges {
  @Input() profile: any;

  ngOnChanges() {
    console.log(this.profile);
  }
}
