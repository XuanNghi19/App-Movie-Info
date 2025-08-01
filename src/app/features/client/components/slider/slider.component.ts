import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit, AfterViewInit {
  @Input() bgImg: string = '';
  @Input() color: string = 'black';
  @Input() title: string = '';
  @Input() tabs: string[] = [];
  @Input() activeTab: string = '';
  @Input() items: any[] = [];
  @Input() onTabChange: (tab: string) => void = () => {};
  @Input() maxWidth: string = '100%';
  @Input() itemGap: string = '16px';
  @Input() itemMgnBt: string = '16px';
  @Input() mgnTop: string = '16px';

  @Input() alignItems: string = 'center';

  @HostBinding('style.align-items') get hostAlignItems() {
    return this.alignItems;
  }

  @ViewChild('slider') sliderRef!: ElementRef;
  @ContentChild('cardTemplate') cardTemplate!: TemplateRef<any>;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    if (this.bgImg) {
      this.renderer.setStyle(
        this.sliderRef.nativeElement,
        'background-image',
        `url(${this.bgImg})`
      );
      this.renderer.setStyle(
        this.sliderRef.nativeElement,
        'background-size',
        'cover'
      );
      this.renderer.setStyle(
        this.sliderRef.nativeElement,
        'background-position',
        'center'
      );
    }
  }

  ngOnInit(): void {}
}
