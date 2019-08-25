import { Component, OnInit, Input } from '@angular/core';

import Match from '../../models/Match';

@Component({
  selector: 'app-match-display',
  templateUrl: './match-display.component.html',
  styleUrls: ['./match-display.component.css']
})
export class MatchDisplayComponent implements OnInit {
  @Input() matches: Match[];

  constructor() {}

  ngOnInit() {
    
  }
}
