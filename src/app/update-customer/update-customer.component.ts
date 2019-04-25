import { CustomerService } from './../services/customer.service';
import { Customer } from './../shared/customer';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from '@angular/material';
@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {

  customerForm: FormGroup;
  @ViewChild('cform') customerFormDirective;
  customer: Customer;
  formErrors = {
    'firstname': '',
    'lastname': '',
    'email': ''
  };

  validationMessages = {
    'firstname': {
      'required': 'First Name is required.'
    },
    'lastname': {
      'required': 'Last Name is required.'
    },
    'email': {
      'required': 'Email is required.',
      'email': 'Email not in valid format.'
    },
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data, private fb: FormBuilder, private customerService: CustomerService,
    public dialogRef: MatDialogRef<UpdateCustomerComponent>, private snackBar: MatSnackBar) {
    this.createUpdateForm();
  }

  ngOnInit() {
    console.log(this.data.data);
  }
  createUpdateForm() {
    this.customerForm = this.fb.group({
      _id: new FormControl(this.data.data._id),
      firstname: new FormControl(this.data.data.firstname, Validators.required),
      lastname: new FormControl(this.data.data.lastname, Validators.required),
      gender: new FormControl(this.data.data.gender),
      email: new FormControl(this.data.data.email, [Validators.email, Validators.required]),
      address: new FormControl(this.data.data.address),
      city: new FormControl(this.data.data.city),
      state: new FormControl(this.data.data.state),
      ordertotal: new FormControl(this.data.data.ordertotal)
    });
    this.customerForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }
  onValueChanged(data?: any) {
    if (!this.customerForm) { return; }
    const form = this.customerForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.customer = this.customerForm.value;
    console.log(this.customer);
    this.customerService.updateCustomer(this.customer)
      .subscribe(data => {
        this.customer = data;
      });
    this.customerFormDirective.resetForm();
    this.customerForm.reset({
      firstname: '',
      lastname: '',
      email: '',
      gender: 'male',
      address: '',
      state: '',
      city: '',
      ordertotal: ''
    });
    this.snackBar.open('This customer has been edited successfully', '', {
      duration: 2000,
    });
  }
  onClear() {
    this.customerFormDirective.resetForm();
    this.customerForm.reset({
      firstname: '',
      lastname: '',
      email: '',
      gender: 'male',
      address: '',
      state: '',
      city: '',
      ordertotal: ''
    });
  }
  onClose() {
    this.customerFormDirective.resetForm();
    this.customerForm.reset({
      firstname: '',
      lastname: '',
      email: '',
      gender: 'male',
      address: '',
      state: '',
      city: '',
      ordertotal: ''
    });
    this.dialogRef.close();
  }
}
