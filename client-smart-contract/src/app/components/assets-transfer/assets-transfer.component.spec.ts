import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsTransferComponent } from './assets-transfer.component';

describe('AssetsTransferComponent', () => {
  let component: AssetsTransferComponent;
  let fixture: ComponentFixture<AssetsTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetsTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
