import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopTracksChartComponent } from './top-tracks-chart.component';

describe('TopTracksChartComponent', () => {
  let component: TopTracksChartComponent;
  let fixture: ComponentFixture<TopTracksChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopTracksChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopTracksChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
