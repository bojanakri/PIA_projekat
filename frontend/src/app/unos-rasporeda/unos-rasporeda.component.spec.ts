import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnosRasporedaComponent } from './unos-rasporeda.component';

describe('UnosRasporedaComponent', () => {
  let component: UnosRasporedaComponent;
  let fixture: ComponentFixture<UnosRasporedaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnosRasporedaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnosRasporedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
