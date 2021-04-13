import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatpostdetailComponent } from './catpostdetail.component';

describe('CatpostdetailComponent', () => {
  let component: CatpostdetailComponent;
  let fixture: ComponentFixture<CatpostdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatpostdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatpostdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
