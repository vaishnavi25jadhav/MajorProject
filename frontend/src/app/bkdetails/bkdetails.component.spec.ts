import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BkdetailsComponent } from './bkdetails.component';

describe('BkdetailsComponent', () => {
  let component: BkdetailsComponent;
  let fixture: ComponentFixture<BkdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BkdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BkdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
