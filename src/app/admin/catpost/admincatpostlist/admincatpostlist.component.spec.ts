import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincatpostlistComponent } from './admincatpostlist.component';

describe('AdmincatpostlistComponent', () => {
  let component: AdmincatpostlistComponent;
  let fixture: ComponentFixture<AdmincatpostlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmincatpostlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmincatpostlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
