import { Component, OnInit } from '@angular/core';
import { PlayersService } from '../../services/players.service';

@Component({
  selector: 'app-player-rank',
  templateUrl: './player-rank.component.html',
  styleUrls: ['./player-rank.component.css']
})
export class PlayerRankComponent implements OnInit {
  players: any[];

  constructor(private playersService: PlayersService) {}

  ngOnInit() {
    this.playersService.getPlayerRanks();
    this.playersService.currentPlayerRanks.subscribe(players => this.players = players);
  }
}
