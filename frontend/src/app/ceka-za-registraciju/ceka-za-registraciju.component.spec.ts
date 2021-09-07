import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CekaZaRegistracijuComponent } from './ceka-za-registraciju.component';

describe('CekaZaRegistracijuComponent', () => {
  let component: CekaZaRegistracijuComponent;
  let fixture: ComponentFixture<CekaZaRegistracijuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CekaZaRegistracijuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CekaZaRegistracijuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
