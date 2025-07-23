import { Component, Input, OnInit, Output, EventEmitter, Host, HostListener } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  @Input() items: Array<{ label: string, link: string }> = [];
  @Input() position: { top: number; left: number } = { top: 0, left: 0 };
  @Input() visible: boolean = false;

  @Output() dropdownLeave = new EventEmitter<void>(); 

  @HostListener('mouseleave') onLeave() {
    this.dropdownLeave.emit();
  }

  constructor() { }

  ngOnInit(): void {
  }

}
