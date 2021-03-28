import { Component, OnChanges, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-swimming-pool',
  templateUrl: './swimming-pool.component.html',
  styleUrls: ['./swimming-pool.component.css']
})
export class SwimmingPoolComponent implements OnChanges {
  @Input() title: string;
  @Input() data: any[];

  public groups = [];
  public elements = 6;
  public page = 0;

  constructor(private router: Router) { }

  ngOnChanges(): void {
    this.getElements()
  }

  getElements(): void {
    if(this.data == null || this.data.length === 0)
      return;
    let result = [];
    for (let i = 0; i < this.data.length; i += this.elements){
      result.push(this.data.slice(i, i + this.elements));
    }
    if(result[result.length - 1].length !== this.elements){
      const diff = this.elements - result[result.length - 1].length;
      for(let i = 0; i < diff; i++){
        result[result.length - 1].push({placeholder: true})
      }
    }
    this.groups = result;
  }

  onClick(id: number, mediaType: string): void {
    this.router.navigate( ['watch', mediaType, id]);
  }
}
