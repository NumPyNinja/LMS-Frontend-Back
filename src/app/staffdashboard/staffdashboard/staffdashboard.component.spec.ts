import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffdashboardComponent } from './staffdashboard.component';

describe('StaffdashboardComponent', () => {
  let component: StaffdashboardComponent;
  let fixture: ComponentFixture<StaffdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffdashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
