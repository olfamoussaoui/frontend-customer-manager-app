import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { CustomerService } from './../services/customer.service';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Customer } from '../shared/customer';
import { CreateComponent } from '../create/create.component';
import { UpdateCustomerComponent } from '../update-customer/update-customer.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  errMess; string;
  public dataSource = new MatTableDataSource<Customer>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['gender', 'firstname', 'lastname', 'address', 'city', 'state', 'ordertotal', 'update', 'delete'];
  femaleCustomer = '../../assets/images/female.png';
  maleCustomer = '../../assets/images/male.png';
  constructor(
    private customerService: CustomerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    @Inject('BaseURL') public baseURL) { }

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

  onCreate() {
    const dialogConf = new MatDialogConfig();
    dialogConf.disableClose = true;
    dialogConf.autoFocus = true;
    dialogConf.width = '60%';
    const dialogRef = this.dialog.open(CreateComponent, dialogConf);
    dialogRef.afterClosed().subscribe(
      data => {
        this.customerService.getCustomers().subscribe(response => {
          this.dataSource.data = response;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
          errmess => this.errMess = errmess);
      },
      error => { }
    );

  }
  onEdit(c: Customer) {
    const dialogRef = this.dialog.open(UpdateCustomerComponent, {
      width: '60%',
      data: { data: c }
    });
    dialogRef.afterClosed().subscribe(
      data => {
        this.customerService.getCustomers().subscribe(response => {
          this.dataSource.data = response;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
          errmess => this.errMess = errmess);
      },
      error => { }
    );
  }

  ondelete(row) {
    this.customerService.deleteCustomer(row._id).subscribe(
      data => {
        this.customerService.getCustomers().subscribe(response => {
          this.dataSource.data = response;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
          errmess => this.errMess = errmess);
      },
      error => { }
    );
    this.snackBar.open('Deleted successfully', '', {
      duration: 2000,
      panelClass: ['success-snackbar']
    });
  }
}
