import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {
  public navbarCollapse: boolean = true;
  @Input() activatedRoute: string;

  constructor() { 
  }

  ngOnInit(): void {
  }

}
