import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/users/user.service";
import { Router } from "@angular/router";
import { User } from "../../models/user";
import { Crypto } from "../../helpers/crypto";
import { Alerts } from "../../helpers/alerts";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  user: User = {};
  loginForm: FormGroup;

  readonly crypto = new Crypto();
  readonly alerts = new Alerts();

  constructor(
    private readonly usersService: UserService,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  login(): void {
    this.usersService
      .getUsername(this.loginForm.get("username").value)
      .subscribe(
        (res) => {
          this.user = res;

          if (
            this.crypto.decrypt(this.user.password) ===
            this.loginForm.get("password").value
          ) {
            localStorage.setItem("userLogged", JSON.stringify(this.user));
            this.router.navigate(["profile"], { state: this.user });
          } else {
            this.loginForm.get("password").setValue("");
            document.getElementById("password").classList.add("is-invalid");
            this.alerts.showToastAlert(
              "Verify!",
              "Password incorrect",
              "error"
            );
          }
        },
        () => {
          this.alerts.showAlert(
            "Verify!",
            "The user is not registered",
            "error"
          );

          this.loginForm.get("password").setValue("");
          this.loginForm.get("username").setValue("");
        }
      );
  }

  createLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      username: new FormControl(this.username, [
        Validators.minLength(4),
        Validators.maxLength(12),
      ]),
      password: new FormControl(this.password, [
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
    });
  }
}
