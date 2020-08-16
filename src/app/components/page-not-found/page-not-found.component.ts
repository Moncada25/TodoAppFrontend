import { Component, OnInit } from "@angular/core";
import { NavbarService } from "../../services/nav-bar/navbar.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-page-not-found",
  templateUrl: "./page-not-found.component.html",
  styleUrls: ["./page-not-found.component.css"],
})
export class PageNotFoundComponent implements OnInit {
  constructor(
    private readonly navbarService: NavbarService,
    private readonly router: Router
  ) {
    localStorage.clear();
  }

  ngOnInit(): void {
    this.navbarService.showBar = false;
    this.navbarService.userLogged = "";
  }

  navigate(): void {
    this.router.navigate(["login"]);
  }
}
