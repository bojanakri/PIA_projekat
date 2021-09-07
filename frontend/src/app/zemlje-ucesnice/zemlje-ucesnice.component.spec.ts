import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZemljeUcesniceComponent } from './zemlje-ucesnice.component';

describe('ZemljeUcesniceComponent', () => {
  let component: ZemljeUcesniceComponent;
  let fixture: ComponentFixture<ZemljeUcesniceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZemljeUcesniceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZemljeUcesniceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
