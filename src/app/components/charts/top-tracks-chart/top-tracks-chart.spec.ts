import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopTracksChart } from './top-tracks-chart';

describe('TopTracksChart', () => {
  let component: TopTracksChart;
  let fixture: ComponentFixture<TopTracksChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopTracksChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopTracksChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
