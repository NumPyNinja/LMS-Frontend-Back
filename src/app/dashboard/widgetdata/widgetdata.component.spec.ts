import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetdataComponent } from './widgetdata.component';

describe('WidgetdataComponent', () => {
  let component: WidgetdataComponent;
  let fixture: ComponentFixture<WidgetdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetdataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
