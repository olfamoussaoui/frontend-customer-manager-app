import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  @ViewChild('cform') customerFormDirective;
  constructor() { }

  ngOnInit() {
  }

}
