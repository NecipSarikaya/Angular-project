import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnipostlistComponent } from './unipostlist.component';

describe('UnipostlistComponent', () => {
  let component: UnipostlistComponent;
  let fixture: ComponentFixture<UnipostlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnipostlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnipostlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
