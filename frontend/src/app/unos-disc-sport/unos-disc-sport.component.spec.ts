import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnosDiscSportComponent } from './unos-disc-sport.component';

describe('UnosDiscSportComponent', () => {
  let component: UnosDiscSportComponent;
  let fixture: ComponentFixture<UnosDiscSportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnosDiscSportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnosDiscSportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
