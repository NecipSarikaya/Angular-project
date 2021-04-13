import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminunicommentlistComponent } from './adminunicommentlist.component';

describe('AdminunicommentlistComponent', () => {
  let component: AdminunicommentlistComponent;
  let fixture: ComponentFixture<AdminunicommentlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminunicommentlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminunicommentlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
