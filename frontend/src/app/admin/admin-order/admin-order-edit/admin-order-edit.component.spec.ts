import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderEditComponent } from './admin-order-edit.component';

describe('AdminOrderEditComponent', () => {
  let component: AdminOrderEditComponent;
  let fixture: ComponentFixture<AdminOrderEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminOrderEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminOrderEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
