import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Configs, defaultConfigs } from "../configs.model";

const CONFIGS_KEY = "whos-who-configs";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  constructor(private router: Router) { }

  genres: string[] = [
    "Rock",
    "Rap",
    "Pop",
    "Country",
    "Hip-hop",
    "Jazz",
    "Alternative",
    "J-pop",
    "K-pop",
    "Emo",
    "60's",
    "70's",
    "80's",
    "90's",
    "00's",
    "10's",
  ]
  gameModes: string[] = [
    "Guess the Artist",
    "Guess the Song",
  ]
  numQuestions: number[] = [5, 6, 7, 8, 9, 10];
  numAnswers: number[] = [2, 3, 4, 5];

  currentConfigs: Configs = defaultConfigs;
  selectedGenre: string = "Country";
  selectedGameMode: string = "Guess the Song";
  selectedNumQuestions: number = 5;
  selectedNumAnswers: number = 3;

  showPlayButton: boolean = false;

  ngOnInit(): void {
    const storedConfigsString = localStorage.getItem(CONFIGS_KEY);
    if (storedConfigsString) {
      this.currentConfigs = JSON.parse(storedConfigsString);
      this.selectedGenre = this.currentConfigs.selectedGenre;
      this.selectedGameMode = this.currentConfigs.selectedGameMode;
      this.selectedNumQuestions = this.currentConfigs.selectedNumQuestions;
      this.selectedNumAnswers = this.currentConfigs.selectedNumAnswers;
    }
  }

  async setGenre(selectedGenre: any) {
    this.selectedGenre = selectedGenre;
  }

  async setNumQuestions(selectedNumQuestions: number) {
    this.selectedNumQuestions = selectedNumQuestions;
  }

  async setNumAnswers(selectedNumAnswers: number) {
    this.selectedNumAnswers = selectedNumAnswers;
  }
  
  async setGameMode(selectedGameMode: string) {
    this.selectedGameMode = selectedGameMode;
  }

  async onSave() {
    this.showPlayButton = true;
    const newConfigs: Configs = {
      selectedGenre: this.selectedGenre,
      selectedNumQuestions: this.selectedNumQuestions,
      selectedNumAnswers: this.selectedNumAnswers,
      selectedGameMode: this.selectedGameMode,
    };

    localStorage.setItem(CONFIGS_KEY, JSON.stringify(newConfigs));
  };

  playGame() {
    this.router.navigateByUrl('/game');
  }
}
