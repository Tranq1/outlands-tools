import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManaCalculatorComponent } from './mana-calculator.component';

describe('ManaCalculatorComponent', () => {
  let component: ManaCalculatorComponent;
  let fixture: ComponentFixture<ManaCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManaCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManaCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
