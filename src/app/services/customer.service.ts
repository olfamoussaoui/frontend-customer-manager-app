import { Customer } from './../shared/customer';
import { baseURL } from './../shared/baseurl';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProcessHTTPMsgServiceService } from './process-httpmsg-service.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgServiceService) { }

  // Get all the Customers
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(baseURL + 'customers')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  // Add new Customer
  postCustomer(customer: Customer): Observable<Customer> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Customer>(baseURL + 'customers' , customer, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  // Update a Customer
  updateCustomer(customer: Customer): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put(baseURL + 'customers' + '/' + customer._id , customer,  httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  // Delete a Customer

  deleteCustomer(id: string) {
    return this.http.delete(baseURL + 'customers/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

}
