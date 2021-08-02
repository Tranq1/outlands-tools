import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AspectPickerComponent } from './aspect-picker.component';

describe('AspectPickerComponent', () => {
  let component: AspectPickerComponent;
  let fixture: ComponentFixture<AspectPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AspectPickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AspectPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
