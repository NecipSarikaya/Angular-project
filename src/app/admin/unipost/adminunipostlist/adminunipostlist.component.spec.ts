import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminunipostlistComponent } from './adminunipostlist.component';

describe('AdminunipostlistComponent', () => {
  let component: AdminunipostlistComponent;
  let fixture: ComponentFixture<AdminunipostlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminunipostlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminunipostlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
