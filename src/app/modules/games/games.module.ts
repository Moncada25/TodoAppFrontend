import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { GameFormComponent } from "./game-form/game-form.component";
import { GameListComponent } from "./game-list/game-list.component";
import { GamesRoutingModule } from "./games-routing.module";

@NgModule({
  declarations: [
    GameFormComponent,
    GameListComponent
  ],
  imports: [
    CommonModule,
    GamesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class GamesModule { }
