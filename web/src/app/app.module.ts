import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { PlayerSelectComponent } from './components/player-select/player-select.component';
import { PlayerComponent } from './components/player/player.component';
import { MatchCreateComponent } from './components/match-create/match-create.component';
import { PlayerCreateComponent } from './components/player-create/player-create.component';
import { MatchDisplayComponent } from './components/match-display/match-display.component';
import { PlayerRankComponent } from './components/player-rank/player-rank.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PlayerSelectComponent,
    PlayerComponent,
    MatchCreateComponent,
    PlayerCreateComponent,
    MatchDisplayComponent,
    PlayerRankComponent
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
