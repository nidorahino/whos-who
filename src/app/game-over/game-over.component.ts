import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { defaultResult, Result } from '../results.model';
import { forEach } from 'lodash';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.css']
})
export class GameOverComponent implements OnInit {

  userInput: string = '';
  userScore: string = '';
  userResultsArray: Result[] = [];
  inputError: boolean = false;
  onePoint: boolean = false;

  // Set the user input value
  setUserInput(event: any) {
    this.userInput = event.target.value;
  }

  // Save user input to local storage 
  // and navigate to leaderboard page
  submitNameToLeaderboard() {
    // Confirm valid input
    if (this.userInput.length < 2) {
      this.inputError = true;
      return;
    } else {
      this.inputError = false;
    }

    // Initialize values
    const newScore = parseInt(localStorage.getItem('score') ?? '');
    const correctAnswerCount = parseInt(localStorage.getItem('correctAnswers') ?? '');
    const currentConfigs = localStorage.getItem('whos-who-configs') ?? '';
    const newUserResult: Result = {
      name: this.userInput,
      score: newScore,
      correctAnswers: correctAnswerCount,
      config: JSON.parse(currentConfigs)
    }

    // Add new User Result to the array
    if (this.userResultsArray.length > 0) {
      for (let i = 0; i < this.userResultsArray.length; i++) {
        if (newScore > this.userResultsArray[i].score) {
          this.userResultsArray.splice(i, 0, newUserResult);
          if (this.userResultsArray.length > 5) this.userResultsArray.pop();
          break;
        } else if (i + 1 === this.userResultsArray.length) {
          this.userResultsArray.push(newUserResult);
          if (this.userResultsArray.length > 5) this.userResultsArray.pop();
          break;
        }
      }
    } else {
      this.userResultsArray.push(newUserResult);
    }

    localStorage.removeItem('score');
    localStorage.setItem('User-Results', JSON.stringify(this.userResultsArray));
    this.router.navigateByUrl('/leaderboard');
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Get stored scores
    if (localStorage.getItem('User-Results')) {
      this.userResultsArray = JSON.parse(localStorage.getItem('User-Results') ?? '');
    }

    if (localStorage.getItem('score')) {
      this.userScore = localStorage.getItem('score') ?? '';
    } else {
      this.router.navigateByUrl('/');
    }

    if (parseInt(this.userScore) === 1) {
      this.onePoint = true;
    }
  }

}
