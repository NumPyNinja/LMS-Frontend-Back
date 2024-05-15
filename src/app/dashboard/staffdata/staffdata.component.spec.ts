import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffdataComponent } from './staffdata.component';

describe('StaffdataComponent', () => {
  let component: StaffdataComponent;
  let fixture: ComponentFixture<StaffdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffdataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
