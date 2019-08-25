import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Player from '../../models/Player';

@Component({
  selector: 'app-player-select',
  templateUrl: './player-select.component.html',
  styleUrls: ['./player-select.component.css']
})
export class PlayerSelectComponent implements OnInit {
  @Input() players: Player[];
  @Output() selectedPlayerEvent: EventEmitter<Player> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onChange(player: Player) {
    this.selectedPlayerEvent.emit(player);
  }
}
