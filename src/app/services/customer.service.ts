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

  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgServiceService) {}
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(baseURL + 'customers')
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getCustomer(id: string): Observable<Customer> {
    return this.http.get<Customer>(baseURL + 'customers' + '/id')
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  putCustomer(customer: Customer): Observable<Customer> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.put<Customer>(baseURL + 'customers/' + customer.id, customer, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
