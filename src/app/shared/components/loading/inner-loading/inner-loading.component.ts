import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-inner-loading',
  templateUrl: './inner-loading.component.html',
  styleUrls: ['./inner-loading.component.scss'],
})
export class InnerLoadingComponent {
  @Input() loading: boolean | null = false;
}
