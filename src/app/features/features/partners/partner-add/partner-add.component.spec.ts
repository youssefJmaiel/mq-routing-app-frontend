import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerAddComponent } from './partner-add.component';

describe('PartnerAddComponent', () => {
  let component: PartnerAddComponent;
  let fixture: ComponentFixture<PartnerAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnerAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartnerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
