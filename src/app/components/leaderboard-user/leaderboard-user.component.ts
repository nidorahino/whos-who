import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Router } from '@angular/router';
import { Result, defaultResult } from 'src/app/results.model';

const CONFIGS_KEY = "whos-who-configs";

@Component({
  selector: 'app-leaderboard-user',
  templateUrl: './leaderboard-user.component.html',
  styleUrls: ['./leaderboard-user.component.css']
})
export class LeaderboardUserComponent implements OnInit {

  @Input() result: Result = defaultResult;
  @Input() place: number = 0;

  gameSettings: string = 'Show';
  className: string = '';
  name: string = '';
  score: string = '';

  getPlacement() {
    switch(this.place) {
      case 1:
        return '1st';
      case 2:
        return '2nd';
      case 3:
        return '3rd';
      case 4:
        return '4th';
      case 5:
        return '5th'; 
      default:
        return '';
    }
  }

  setClassName() {
    switch(this.place) {
      case 1:
        this.className = 'container1';
        break;
      case 2:
        this.className = 'container2';
        break;
      case 3:
        this.className = 'container3';
        break;
      default:
        this.className = 'container';
        break;
    }
  }

  toggleGameSettings() {
    if (this.gameSettings === 'Show') {
      this.gameSettings = 'Hide';
    } else {
      this.gameSettings = 'Show';
    }
  }

  playGame() {
    localStorage.setItem(CONFIGS_KEY, JSON.stringify(this.result.config)); 
    this.router.navigateByUrl('/game');
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.setClassName();
  }

}
