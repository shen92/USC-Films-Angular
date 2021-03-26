import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-swimming-pool',
  templateUrl: './swimming-pool.component.html',
  styleUrls: ['./swimming-pool.component.css']
})
export class SwimmingPoolComponent implements OnInit {
  @Input() title: string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
