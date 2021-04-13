import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatpostlistComponent } from './catpostlist.component';

describe('CatpostlistComponent', () => {
  let component: CatpostlistComponent;
  let fixture: ComponentFixture<CatpostlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatpostlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatpostlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
