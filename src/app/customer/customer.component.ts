import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { CustomerService } from './../services/customer.service';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Customer } from '../shared/customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  errMess; string;
  i = 0;
  public dataSource = new MatTableDataSource<Customer>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['firstname', 'lastname', 'address', 'city', 'state', 'ordertotal', 'update', 'delete'];
  constructor(private customerService: CustomerService, @Inject('BaseURL') public baseURL) { }

  ngOnInit() {
    this.customerService.getCustomers().subscribe(response => {
      this.dataSource.data = response;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },
      errmess => this.errMess = errmess);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
