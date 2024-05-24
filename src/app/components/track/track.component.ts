import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Howl } from 'howler';
import { Track, defaultTrack } from 'src/app/track.model';

const CONFIGS_KEY = "whos-who-configs";

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {

  @Input() track: Track = defaultTrack;
  @Input() gameMode: string = '';
  @Output() nextTrack = new EventEmitter<boolean>();
  
  songPlaying: boolean = false;
  listened: boolean = false;
  sound = <Howl>({});

  //play/pause functionality
  togglePlay() {
    if (!this.listened) {
      this.sound = new Howl({
        src: [this.track.preview_url],
        format: ['mp3'],
        loop: false,
      });
      this.listened = true;
    }
    if (this.songPlaying) {
      this.sound.pause();
      this.songPlaying = false;
    } else {
      this.sound.play();
      this.songPlaying = true;
    }
  }

  //handles multiple choice selection for song game
  selectSong(songOption: string): void {
    if (this.songPlaying) {
      this.sound.stop();
    }

    this.songPlaying = false;
    const isCorrect = songOption === this.track.songName;
    this.nextTrack.emit(isCorrect);
    this.listened = false;
  }

  //handles multiple choice selection for artist game
  selectArtist(artistOption: string): void {
    if (this.songPlaying) {
      this.sound.stop();
    }

    this.songPlaying = false;
    const isCorrect = artistOption === this.track.artists;
    this.nextTrack.emit(isCorrect);
    this.listened = false;
  }

  constructor() { }

  ngOnInit(): void {
  }
}
