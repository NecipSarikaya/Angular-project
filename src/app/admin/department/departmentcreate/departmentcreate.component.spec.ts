import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentcreateComponent } from './departmentcreate.component';

describe('DepartmentcreateComponent', () => {
  let component: DepartmentcreateComponent;
  let fixture: ComponentFixture<DepartmentcreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentcreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
