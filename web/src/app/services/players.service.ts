import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Player from '../models/Player';
import { Observable, BehaviorSubject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  playersUrl: string = '/api/players';

  playerRanksSource: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  currentPlayerRanks = this.playerRanksSource.asObservable();

  constructor(private http: HttpClient) {}

  getPlayerRanks(): void {
    this.http
      .get<Player[]>(this.playersUrl + '/rank')
      .subscribe((playerRanks: any) => {
        this.playerRanksSource.next(playerRanks);
      });
  }

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.playersUrl);
  }

  createPlayer(player: Player): Observable<any> {
    return this.http.post<Player>(this.playersUrl, player, httpOptions);
  }
}
