import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsCreateDivComponent } from './assets-create-div.component';

describe('AssetsCreateDivComponent', () => {
  let component: AssetsCreateDivComponent;
  let fixture: ComponentFixture<AssetsCreateDivComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetsCreateDivComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsCreateDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
