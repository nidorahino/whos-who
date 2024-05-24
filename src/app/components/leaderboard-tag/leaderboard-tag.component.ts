import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-leaderboard-tag',
  templateUrl: './leaderboard-tag.component.html',
  styleUrls: ['./leaderboard-tag.component.css']
})
export class LeaderboardTagComponent implements OnInit {

  @Input() tagName: string = '';
  @Input() tagValue: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
