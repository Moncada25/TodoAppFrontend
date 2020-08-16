import { Component } from "@angular/core";
import { User } from "../../models/user";
import { NavbarService } from "../../services/nav-bar/navbar.service";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.css"],
})
export class NavigationComponent {
  user: User = {};
  constructor(public navbarService: NavbarService) {
    if (this.navbarService.showBar) {
      this.user = JSON.parse(localStorage.getItem("userLogged"));
      this.navbarService.userLogged = this.user.username;
    }
  }

  showBar(): void {
    this.navbarService.showBar = true;
    this.user = JSON.parse(localStorage.getItem("userLogged"));
    this.navbarService.userLogged = this.user.username;
  }

  logOut(): void {
    this.navbarService.showBar = false;
    localStorage.clear();
  }
}
