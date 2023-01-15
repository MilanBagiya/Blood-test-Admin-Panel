import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsertestlistComponent } from './usertestlist.component';

describe('UsertestlistComponent', () => {
  let component: UsertestlistComponent;
  let fixture: ComponentFixture<UsertestlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsertestlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsertestlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
