import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeautitionInfoComponent } from './beautition-info.component';

describe('BeautitionInfoComponent', () => {
  let component: BeautitionInfoComponent;
  let fixture: ComponentFixture<BeautitionInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeautitionInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeautitionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
