import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-player-create',
  templateUrl: './player-create.component.html',
  styleUrls: ['./player-create.component.css']
})
export class PlayerCreateComponent implements OnInit {
  @Output() createPlayer: EventEmitter<any> = new EventEmitter();
  name: string;

  constructor() {}

  ngOnInit() {}

  onSubmit() {
    this.createPlayer.emit({ name: this.name });
    this.name = '';
  }
}
