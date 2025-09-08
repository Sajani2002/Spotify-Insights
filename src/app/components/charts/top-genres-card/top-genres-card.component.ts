import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-genres-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-genres-card.html',
  styleUrls: ['./top-genres-card.scss']
})
export class TopGenresCardComponent {
  @Input() genres: string[] = [];
}