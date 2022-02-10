import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeesComponent } from './bees.component';

describe('BeesComponent', () => {
  let component: BeesComponent;
  let fixture: ComponentFixture<BeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
