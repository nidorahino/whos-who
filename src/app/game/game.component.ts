import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Track } from '../track.model';
import fetchFromSpotify, { request } from "../../services/api";
import { Configs, defaultConfigs } from '../configs.model';

const AUTH_ENDPOINT =
  "https://nuod0t2zoe.execute-api.us-east-2.amazonaws.com/FT-Classroom/spotify-auth-token";
const TOKEN_KEY = "whos-who-access-token";

const CONFIGS_KEY = "whos-who-configs";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  tracks: Track[] = [];
  currentConfigs: Configs = defaultConfigs;
  currentTrackIndex: number = 0;
  correctAnswerCount: number = 0;
  score: number = 0;
  authLoading: boolean = false;
  configLoading: boolean = false;
  token: String = "";

  constructor(private router: Router) { }

  ngOnInit(): void {
    //getting a token
    this.authLoading = true;
    const storedConfigsString = localStorage.getItem(CONFIGS_KEY);
    if (storedConfigsString) this.currentConfigs = JSON.parse(storedConfigsString);

    const storedTokenString = localStorage.getItem(TOKEN_KEY);
    if (storedTokenString) {
      const storedToken = JSON.parse(storedTokenString);
      if (storedToken.expiration > Date.now()) {
        this.authLoading = false;
        this.token = storedToken.value;
      }
    }
    request(AUTH_ENDPOINT).then(({ access_token, expires_in }) => {
      const newToken = {
        value: access_token,
        expiration: Date.now() + (expires_in - 20) * 1000,
      };
      localStorage.setItem(TOKEN_KEY, JSON.stringify(newToken));
      this.authLoading = false;
      this.token = newToken.value;
      this.loadConfigsAndTracks();
    });
  }

  //loads all tracks based on our configs
  loadConfigsAndTracks(): void {
    this.configLoading = true;
    this.getPlaylistIds()
      .then(response => this.getTracksFromPlaylist(response))
      .then(tracks => {
        this.tracks = tracks.map((storedTrack: any) => {
          const { name, artists, preview_url, album: { images } } = storedTrack.track;
          const albumImageUrl = images[0].url;

          const songOptions = this.getRandomOptions(tracks, name, this.currentConfigs.selectedNumAnswers);
          const artistOptions = this.getRandomOptions(tracks, artists.map((artist: any) => artist.name).join(', '), this.currentConfigs.selectedNumAnswers);

          return {
            albumImageUrl,
            preview_url,
            songName: name,
            artists: artists.map((artist: any) => artist.name).join(', '),
            songOptions,
            artistOptions,
          };
        });
        this.configLoading = false;
      });
  }

  //randomizes and loads in choice options for each track
  getRandomOptions(tracks: any[], correctOption: string, numOptions: number): string[] {
    const options: string[] = [correctOption];
    let availableOptions: string[] = [];

    if (this.currentConfigs.selectedGameMode === 'Guess the Artist') {
      availableOptions = tracks.reduce((accumulator: string[], track: any) => {
        if (track.track.artists.map((artist: any) => artist.name).join(', ') !== correctOption) {
          accumulator.push(track.track.artists.map((artist: any) => artist.name).join(', '));
        }
        return accumulator;
      }, []);
    } else {
      availableOptions = tracks.reduce((accumulator: string[], track: any) => {
        if (track.track.name !== correctOption) {
          accumulator.push(track.track.name);
        }
        return accumulator;
      }, []);
    }

    while (options.length < numOptions) {
      const randomIndex = Math.floor(Math.random() * availableOptions.length);
      options.push(availableOptions[randomIndex]);
      availableOptions.splice(randomIndex, 1);
    }

    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }

    return options;
  }

  //get playlist ids based on type of genre selected
  getPlaylistIds = async () => {
    const response = await fetchFromSpotify({
      token: this.token,
      endpoint: "search",
      params: {
        q: this.currentConfigs.selectedGenre,
        type: "playlist",
        limit: 3
      },
    });
    return response.playlists.items.map((item: { id: string }) => item.id);
  }

  //uses playlist ids and returns numQuestions amount of tracks for the game
  getTracksFromPlaylist = async (playlistIds: any) => {
    let allArtists: Set<string> = new Set();
    let allSongNames: Set<string> = new Set();
    let allTracks: any[] = [];

    for (let playlistId of playlistIds) {
      const response = await fetchFromSpotify({
        token: this.token,
        endpoint: `playlists/${playlistId}`,
        params: {
          fields: "tracks.items.track",
          limit: 3,
        },
      });
      const filteredTracks = response.tracks.items.filter((item: any) => item.track.preview_url !== null);

      filteredTracks.forEach((track: any) => {
        if (allTracks.length < this.currentConfigs.selectedNumQuestions) {
          const artists = track.track.artists;
          if (!allArtists.has(artists.map((artist: any) => artist.name).join(', ')) && !allSongNames.has(track.track.name)) {
            allArtists.add(artists.map((artist: any) => artist.name).join(', '));
            allSongNames.add(track.track.name);
            allTracks.push(track);
          }
        }
      });
    }

    return allTracks;
  }

  //handles multiple choice logic
  checkForCorrectTrack(isCorrect: boolean): void {
    const scoreboard = document.getElementById('scoreboard');

    if (isCorrect) {
      this.correctAnswerCount++;
      this.score = Math.round((this.correctAnswerCount / (this.currentTrackIndex + 1)) * 100);
      scoreboard?.classList.remove('flash-color-correct');
      scoreboard?.classList.remove('flash-color-wrong');
      void scoreboard?.offsetWidth;
      scoreboard?.classList.add('flash-color-correct');
    } else {
      this.score = Math.round((this.correctAnswerCount / (this.currentTrackIndex + 1)) * 100);
      scoreboard?.classList.remove('flash-color-wrong');
      scoreboard?.classList.remove('flash-color-correct');
      void scoreboard?.offsetWidth;
      scoreboard?.classList.add('flash-color-wrong');
    }
    this.nextTrack();
  }

  //moves the game forward
  nextTrack(): void {
    this.currentTrackIndex++;
    if (this.currentTrackIndex >= this.tracks.length) {
      localStorage.setItem('score', this.score.toString());
      localStorage.setItem('correctAnswers', this.correctAnswerCount.toString());
      this.router.navigateByUrl('/game-over');
    }
  }
}