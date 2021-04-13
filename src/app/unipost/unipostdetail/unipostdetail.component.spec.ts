import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnipostdetailComponent } from './unipostdetail.component';

describe('UnipostdetailComponent', () => {
  let component: UnipostdetailComponent;
  let fixture: ComponentFixture<UnipostdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnipostdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnipostdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
