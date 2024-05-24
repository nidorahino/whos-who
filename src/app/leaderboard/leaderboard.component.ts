import { Component, OnInit } from '@angular/core';
import { Result } from '../results.model';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  userResultsArray: Result[] = []

  constructor() { }

  ngOnInit(): void {
    // Get stored scores
    if (localStorage.getItem('User-Results')) {
      this.userResultsArray = JSON.parse(localStorage.getItem('User-Results') ?? '');
    }
  }

}
