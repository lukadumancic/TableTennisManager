import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import Match from '../models/Match';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class MatchesService {
  matchesUrl: string = '/api/matches';

  constructor(private http: HttpClient) {}

  getMatches(params: {
    playerId1?: string;
    playerId2?: string;
    id?: string;
  }): Observable<Match[]> {
    const { playerId1, playerId2, id } = params;
    const httpParams = new HttpParams();
    if (id) {
      httpParams.append('id', id);
    } else if (playerId1 && playerId2) {
      httpParams.append('playerId1', playerId1);
      httpParams.append('playerId2', playerId2);
    }
    return this.http.get<Match[]>(this.matchesUrl, {
      params: httpParams
    });
  }

  createMatch(match: any): Observable<any> {
    return this.http.post<Match>(this.matchesUrl, match, httpOptions);
  }
}
