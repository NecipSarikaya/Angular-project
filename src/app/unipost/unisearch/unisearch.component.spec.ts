import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnisearchComponent } from './unisearch.component';

describe('UnisearchComponent', () => {
  let component: UnisearchComponent;
  let fixture: ComponentFixture<UnisearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnisearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnisearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
