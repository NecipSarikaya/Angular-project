import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentdetailComponent } from './departmentdetail.component';

describe('DepartmentdetailComponent', () => {
  let component: DepartmentdetailComponent;
  let fixture: ComponentFixture<DepartmentdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
