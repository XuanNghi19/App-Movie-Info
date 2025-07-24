import { Component, Input, OnInit } from '@angular/core';
import { BASE_IMG_URL_220_330 } from 'src/app/core/utils/constants';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  
  public readonly imgBaseUrl = BASE_IMG_URL_220_330; 

  @Input() title: string = 'Slider Title';
  @Input() tabs: string[] = [];
  @Input() activeTab: string = '';
  @Input() items: any[] = [];
  @Input() onTabChange: (tab: string) => void = () => {};

  constructor() { }

  ngOnInit(): void {
  }

  
}
