import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Game } from "../../models/game";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class GamesService {
  constructor(private readonly http: HttpClient) { }

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(environment.API_URL + "/games");
  }

  getUserGames(user: string, id: string | number): Observable<Game[]> {
    return this.http.get<Game[]>(environment.API_URL + "/games/" + user + "/" + id);
  }

  getGame(id: number): Observable<Game> {
    return this.http.get<Game>(environment.API_URL + "/games/" + id);
  }

  deleteGame(id: string): Observable<Game> {
    return this.http.delete<Game>(environment.API_URL + "/games/" + id);
  }

  saveGame(game: Game): Observable<Game> {
    return this.http.post<Game>(environment.API_URL + "/games/", game);
  }

  updateGame(id: string | number, updatedGame: Game): Observable<Game> {
    return this.http.put<Game>(environment.API_URL + "/games/" + id, updatedGame);
  }
}
