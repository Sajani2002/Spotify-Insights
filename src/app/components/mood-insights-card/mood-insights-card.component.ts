import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mood-insight-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mood-insights-card.html',
  styleUrls: ['./mood-insights-card.scss']
})
export class MoodInsightCardComponent {
  @Input() summary: string = '';
  @Input() emoji: string = '';
}