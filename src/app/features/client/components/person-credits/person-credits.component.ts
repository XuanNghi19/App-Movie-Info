import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-person-credits',
  templateUrl: './person-credits.component.html',
  styleUrls: ['./person-credits.component.scss'],
})
export class PersonCreditsComponent implements OnInit {
  
  @Input() year!: string;
  @Input() title!: string;
  @Input() character!: string;
  @Input() mediaType!: 'movie' | 'tv';
  @Input() episodeCount?: number;

  constructor() {}

  ngOnInit(): void {}
}
