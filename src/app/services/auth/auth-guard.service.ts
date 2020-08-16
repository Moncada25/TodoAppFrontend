import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AuthService } from "./auth.service";
import { Alerts } from "../../helpers/alerts";

@Injectable({
  providedIn: "root",
})
export class AuthGuardService implements CanActivate {
  alerts = new Alerts();

  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(["login"]);
      this.alerts.showAlert(
        "Restricted access!",
        "Please login with your profile",
        "warning"
      );
      return false;
    }
    return true;
  }
}
