import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversitycreateComponent } from './universitycreate.component';

describe('UniversitycreateComponent', () => {
  let component: UniversitycreateComponent;
  let fixture: ComponentFixture<UniversitycreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversitycreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversitycreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
