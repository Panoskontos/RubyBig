import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketChartLayoutComponent } from './ticket-chart-layout.component';

describe('TicketChartLayoutComponent', () => {
  let component: TicketChartLayoutComponent;
  let fixture: ComponentFixture<TicketChartLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketChartLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketChartLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
