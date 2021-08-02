import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsPickerComponent } from './stats-picker.component';

describe('StatsPickerComponent', () => {
  let component: StatsPickerComponent;
  let fixture: ComponentFixture<StatsPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsPickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
