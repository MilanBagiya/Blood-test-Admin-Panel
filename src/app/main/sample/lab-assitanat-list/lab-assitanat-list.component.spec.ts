import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabAssitanatListComponent } from './lab-assitanat-list.component';

describe('LabAssitanatListComponent', () => {
  let component: LabAssitanatListComponent;
  let fixture: ComponentFixture<LabAssitanatListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabAssitanatListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabAssitanatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
