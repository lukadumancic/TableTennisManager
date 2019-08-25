import { Component, OnInit } from '@angular/core';
import { PlayersService } from '../../services/players.service';
import { MatchesService } from '../../services/matches.service';

const MAX_SETS = 5;

import Player from '../../models/Player';
import Match from '../../models/Match';

@Component({
  selector: 'app-match-create',
  templateUrl: './match-create.component.html',
  styleUrls: ['./match-create.component.css']
})
export class MatchCreateComponent implements OnInit {
  players: Player[];
  matches: Match[];
  displayMatches: Match[];
  playerId1: string;
  playerId2: string;
  gemsInSets: any = [new Array(MAX_SETS).fill(0), new Array(MAX_SETS).fill(0)];
  numbers: number[] = Array(MAX_SETS)
    .fill(0)
    .map((_x, i) => i);
  matchError: string = '';

  constructor(
    private playersService: PlayersService,
    private matchesService: MatchesService
  ) {}

  ngOnInit() {
    this.playersService.getPlayers().subscribe(players => {
      this.players = players;
    });
    this.matchesService.getMatches({}).subscribe(matches => {
      this.matches = matches;
      this.filterMatches();
    });
  }

  createPlayer(player: Player) {
    this.playersService.createPlayer(player).subscribe(player => {
      this.players.push(player);
      this.playersService.getPlayerRanks();
    });
  }

  selectPlayer1(playerId: string) {
    this.playerId1 = playerId;
    this.filterMatches();
  }

  selectPlayer2(playerId: string) {
    this.playerId2 = playerId;
    this.filterMatches();
  }

  filterMatches() {
    if (!this.playerId1 && !this.playerId2) {
      this.displayMatches = this.matches;
    } else {
      this.displayMatches = this.matches.filter(match => {
        if (this.playerId1 && this.playerId2) {
          if (
            (match.player1._id === this.playerId1 &&
              match.player2._id === this.playerId2) ||
            (match.player2._id === this.playerId1 &&
              match.player1._id === this.playerId2)
          ) {
            return true;
          }
        } else if (this.playerId1) {
          if (
            match.player1._id === this.playerId1 ||
            match.player2._id === this.playerId1
          ) {
            return true;
          }
        } else if (this.playerId2) {
          if (
            match.player1._id === this.playerId2 ||
            match.player2._id === this.playerId2
          ) {
            return true;
          }
        }
        return false;
      });
    }
  }

  gemsChange(event: any, i: number, j: number) {
    this.gemsInSets[i][j] = event.target.value;
  }

  onSubmit() {
    const score = [];
    for (let i = 0; i < MAX_SETS; i++) {
      if (this.gemsInSets[0][i] === 0 || this.gemsInSets[1][i] === 0) {
        break;
      }
      score.push([this.gemsInSets[0][i], this.gemsInSets[1][i]]);
    }
    if (
      score.length >= Math.ceil(MAX_SETS / 2) &&
      this.playerId1 &&
      this.playerId2
    ) {
      const match: any = {
        playerId1: this.playerId1,
        playerId2: this.playerId2,
        score
      };
      this.matchesService.createMatch(match).subscribe(response => {
        if (response.error) {
          this.matchError = response.error;
        } else {
          this.matches.push(response);
          this.filterMatches();
          this.matchError = '';
          this.playersService.getPlayerRanks();
        }
      });
    } else {
      this.matchError = 'Missing params';
    }
  }
}
