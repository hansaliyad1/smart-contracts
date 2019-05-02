import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsCreateComponent } from './assets-create.component';

describe('AssetsCreateComponent', () => {
  let component: AssetsCreateComponent;
  let fixture: ComponentFixture<AssetsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
