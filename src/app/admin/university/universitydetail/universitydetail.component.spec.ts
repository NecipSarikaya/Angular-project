import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversitydetailComponent } from './universitydetail.component';

describe('UniversitydetailComponent', () => {
  let component: UniversitydetailComponent;
  let fixture: ComponentFixture<UniversitydetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversitydetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversitydetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
