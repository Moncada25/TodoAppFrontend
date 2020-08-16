import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AuthService } from "./auth.service";
import { Alerts } from "../../helpers/alerts";

@Injectable({
  providedIn: "root",
})
export class UserGuardService implements CanActivate {
  alerts = new Alerts();

  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): boolean {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(["profile"]);
      this.alerts.showAlert(
        "Already logged in!",
        "Please logout to continue",
        "warning"
      );
      return false;
    }
    return true;
  }
}
