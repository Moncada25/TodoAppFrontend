import { Component, OnInit, HostBinding } from "@angular/core";
import { GamesService } from "../../../services/games/game.service";
import { User } from "../../../models/user";
import { Router } from "@angular/router";
import { Alerts } from "../../../helpers/alerts";
import { Game } from "./../../../models/game";

@Component({
  selector: "app-game-list",
  templateUrl: "./game-list.component.html",
  styleUrls: ["./game-list.component.css"],
})
export class GameListComponent implements OnInit {
  @HostBinding("class") classes = "row";
  games: Game[] = [];
  user: User = {};
  readonly alerts = new Alerts();

  constructor(
    private readonly gamesService: GamesService,
    private readonly router: Router
  ) {
    this.user = JSON.parse(localStorage.getItem("userLogged"));
  }

  ngOnInit(): void {
    this.getUserGames();
  }

  private getUserGames(): void {
    this.gamesService
      .getUserGames(this.user.username, this.user.id)
      .subscribe((res) => {
        this.games = res;
      });
  }

  deleteGame(id: string): void {
    this.alerts
      .showAlertConfirm(
        "Are you sure?",
        "Once deleted, you will not be able to recover this game!",
        "warning"
      )
      .then((willDelete) => {
        if (willDelete.value) {
          this.gamesService.deleteGame(id).subscribe(
            () => {
              this.getUserGames();
            },
          );

          this.alerts.showAlert("Yeah!", "Game was deleted!", "success").then();
        }
      });
  }

  editGame(id: number): void {
    this.router.navigateByUrl("games/edit/" + id);
  }

  navigate(): void {
    this.router.navigate(["games/add"]);
  }
}
