import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasteryPickerComponent } from './mastery-picker.component';

describe('MasteryPickerComponent', () => {
  let component: MasteryPickerComponent;
  let fixture: ComponentFixture<MasteryPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasteryPickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasteryPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
