import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { leaderboardUser } from 'src/app/core/utils/mockData';

@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeaderBoardComponent implements OnInit {
  users = leaderboardUser;

  constructor() {}

  ngOnInit(): void {}

  maxAllTimeEdits = Math.max(...this.users.map((u) => u.allTimeEdits));
  maxWeeklyEdits = Math.max(...this.users.map((u) => u.weeklyEdits));
}
