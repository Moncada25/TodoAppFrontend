import { Component, OnInit } from "@angular/core";
import { Game } from "../../../models/game";
import { GamesService } from "../../../services/games/game.service";
import { Router, ActivatedRoute } from "@angular/router";
import { User } from "../../../models/user";
import { Alerts } from "../../../helpers/alerts";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-game-form",
  templateUrl: "./game-form.component.html",
  styleUrls: ["./game-form.component.css"],
})
export class GameFormComponent implements OnInit {
  readonly alerts = new Alerts();
  edit: boolean;
  game: Game = {};
  user: User = {};
  gameForm: FormGroup;

  constructor(
    private readonly gamesServices: GamesService,
    private readonly activatedRouted: ActivatedRoute,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder
  ) {
    this.user = JSON.parse(localStorage.getItem("userLogged"));
  }

  ngOnInit(): void {
    const params = this.activatedRouted.snapshot.params;

    if (params.id) {
      this.gamesServices.getGame(Number(params.id)).subscribe(
        (res) => {
          this.game = res;
          this.gameForm.setValue(this.game);
          this.edit = true;
        },
        () =>
          this.alerts
            .showAlert("Error", "Game not found!", "error")
            .then((result) => {
              if (result.value || result.dismiss) {
                this.router.navigate(["games"]);
              }
            })
      );
    }
    this.createGameForm();
  }

  updateGame(): void {
    delete this.game.createdAt;

    this.gamesServices
      .updateGame(this.game.id, this.gameForm.value)
      .subscribe(() => {
        this.alerts
          .showAlert("Yeah!", "The game was updated successfully!", "success")
          .then((result) => {
            if (result.value || result.dismiss) {
              this.router.navigate(["games"]);
            }
          });
      });
  }

  saveNewGame(): void {
    delete this.game.id;
    delete this.game.createdAt;

    const newGame: Game = {
      ...this.game,
      ...this.gameForm.value,
    };

    newGame.id_user = this.user.id;

    this.gamesServices.saveGame(newGame).subscribe(() => {
      this.alerts
        .showAlert("Yeah!", "The game was added successfully!", "success")
        .then((result) => {
          if (result.value || result.dismiss) {
            this.router.navigate(["games"]);
          }
        });
    });
  }

  createGameForm(): void {
    this.gameForm = this.formBuilder.group({
      id: new FormControl(this.game.id, []),
      title: new FormControl(this.game.title, [
        Validators.minLength(4),
        Validators.maxLength(15),
      ]),
      description: new FormControl(this.game.description, [
        Validators.minLength(4),
        Validators.maxLength(50),
      ]),
      image: new FormControl(this.game.image, [
        Validators.minLength(4),
        Validators.maxLength(200),
      ]),
      createdAt: new FormControl(this.game.createdAt, []),
      id_user: new FormControl(this.game.id_user, []),
    });
  }
}
