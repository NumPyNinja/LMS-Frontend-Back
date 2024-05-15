import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesforstaffComponent } from './classesforstaff.component';

describe('ClassesforstaffComponent', () => {
  let component: ClassesforstaffComponent;
  let fixture: ComponentFixture<ClassesforstaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassesforstaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassesforstaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
