import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnipostdepComponent } from './unipostdep.component';

describe('UnipostdepComponent', () => {
  let component: UnipostdepComponent;
  let fixture: ComponentFixture<UnipostdepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnipostdepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnipostdepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
