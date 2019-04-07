import { OnInit } from '@angular/core';
import { CustomerService } from './../services/customer.service';
import { Customer } from './../shared/customer';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { Observable } from 'rxjs';

export class DataTableDataSource extends DataSource<any> {
  constructor(private paginator: MatPaginator, private sort: MatSort, private customerService: CustomerService) {
    super();
  }
  connect(): Observable<Customer[]> {
    return this.customerService.getCustomers();
  }
  disconnect() {}
}
