import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincatcommentlistComponent } from './admincatcommentlist.component';

describe('AdmincatcommentlistComponent', () => {
  let component: AdmincatcommentlistComponent;
  let fixture: ComponentFixture<AdmincatcommentlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmincatcommentlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmincatcommentlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
