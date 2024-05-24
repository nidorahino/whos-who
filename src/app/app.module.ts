import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { GameComponent } from './game/game.component';
import { TrackComponent } from './components/track/track.component';
import { SettingsComponent } from './settings/settings.component';
import { GameOverComponent } from './game-over/game-over.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { LeaderboardUserComponent } from './components/leaderboard-user/leaderboard-user.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LeaderboardTagComponent } from './components/leaderboard-tag/leaderboard-tag.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "game", component: GameComponent },
  { path: "settings", component: SettingsComponent },
  { path: "game-over", component: GameOverComponent },
  { path: "leaderboard", component: LeaderboardComponent }
];

@NgModule({
  declarations: [AppComponent, HomeComponent, GameComponent, TrackComponent, SettingsComponent, GameOverComponent, LeaderboardComponent, LeaderboardUserComponent, SidebarComponent, LeaderboardTagComponent],
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
