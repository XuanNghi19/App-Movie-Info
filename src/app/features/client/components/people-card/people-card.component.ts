import { Component, Input, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { Router } from '@angular/router';
import { BASE_IMG_URL_220_330 } from 'src/app/core/utils/constants';

@Component({
  selector: 'app-people-card',
  templateUrl: './people-card.component.html',
  styleUrls: ['./people-card.component.scss'],
})
export class PeopleCardComponent implements OnInit {
  public readonly defaultImg = '../../../../../assets/icons/unknow_img.svg';

  @Input() item!: any;
  @Input() imgBaseUrl = BASE_IMG_URL_220_330;
  @Input() hasPopularity: boolean = false;
  @Input() hasCharater: boolean = false;
  @Input() action!: string;
  @Input() wImg: string = '220px';
  @Input() hImg: string = '330px';
  @Input() color: string = '#333';
  @Input() titleSize: string = '18px';
  @Input() fontSize: string = '16px';
  @Input() imgFlex: number = 1;

  selectedTrailerKey: string | null = null;

  constructor(private homeService: HomeService, private router: Router) {}

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
    this.router.navigate([`/`]);
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
