import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';

import { Router } from '@angular/router';
import { BASE_IMG_URL_220_330 } from 'src/app/core/utils/constants';

@Component({
  selector: 'app-white-card',
  templateUrl: './white-card.component.html',
  styleUrls: ['./white-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhiteCardComponent implements OnInit {
  public readonly defaultImg = '/assets/icons/unknow_img.svg';

  @Input() item!: any;
  @Input() imgBaseUrl = BASE_IMG_URL_220_330;
  @Input() hasPopularity: boolean = false;
  @Input() hasCharater: boolean = false;
  @Input() hasKnow: boolean = false;
  @Input() knowFor: string = '';
  @Input() action!: string;
  @Input() wImg: string = '220px';
  @Input() hImg: string = '330px';
  @Input() color: string = '#333';
  @Input() titleSize: string = '18px';
  @Input() fontSize: string = '16px';
  @Input() imgFlex: number = 1;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onPosterClick(): void {
    if (!this.item?.id) return;

    switch (this.action) {
      case 'people-detail':
        this.goToPepleDetails(this.item.id);
        break;
      default:
        break;
    }
  }

  goToPepleDetails(id: number): void {
    this.router.navigate([`/people/details/${id}`]);
  }

  getImageSrc(): string {
    if (!this.item) return this.defaultImg;
    return this.item?.profile_path
      ? this.imgBaseUrl + this.item?.profile_path
      : this.defaultImg;
  }

  getAltText(): string {
    if (!this.item) return 'Unknown Name';
    return this.item?.name || 'Unknown Title';
  }

  getName(): string {
    if (!this.item) return '--';
    return this.item.name;
  }

  get popularity(): number {
    if (!this.item) return 0;
    return this.item.popularity;
  }

  get character(): string {
    if (!this.item) return '--';
    return this.item.character;
  }
}
