import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  Host,
  HostListener,
} from '@angular/core';
import { Router } from '@angular/router';
import { DropdownService } from 'src/app/core/services/dropdown.service';
import { DropdownItem } from '../../types/dropdown';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit {
  ngOnInit(): void {}

  state$ = this.dropdownService.state$;

  constructor(
    private dropdownService: DropdownService,
    private router: Router
  ) {}

  onItemClick(item: DropdownItem) {
    this.router.navigate([item.route]);
    this.dropdownService.hide();
  }
}
