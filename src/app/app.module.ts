import { HttpClientModule } from '@angular/common/http';
import { ProcessHTTPMsgServiceService } from './services/process-httpmsg-service.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule,
  MatListModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { CustomerComponent } from './customer/customer.component';
import { CustomerService } from './services/customer.service';
import 'hammerjs';
import { baseURL } from './shared/baseurl';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CustomerComponent
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule
  ],
  providers: [
    CustomerService,
    ProcessHTTPMsgServiceService,
    {provide: 'BaseURL', useValue: baseURL}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
