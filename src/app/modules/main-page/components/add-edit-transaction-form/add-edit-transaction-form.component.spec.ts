import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTransactionFormComponent } from './add-edit-transaction-form.component';

describe('AddEditTransactionFormComponent', () => {
  let component: AddEditTransactionFormComponent;
  let fixture: ComponentFixture<AddEditTransactionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditTransactionFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditTransactionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
