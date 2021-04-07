import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cast-modal',
  templateUrl: './cast-modal.component.html',
  styleUrls: ['./cast-modal.component.css']
})
export class CastModalComponent implements OnInit {
  @Input() id: number;
  
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
  }


}
