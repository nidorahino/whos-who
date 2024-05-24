import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardTagComponent } from './leaderboard-tag.component';

describe('LeaderboardTagComponent', () => {
  let component: LeaderboardTagComponent;
  let fixture: ComponentFixture<LeaderboardTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaderboardTagComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaderboardTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
