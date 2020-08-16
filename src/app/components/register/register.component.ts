import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/users/user.service";
import { Router } from "@angular/router";
import { User } from "../../models/user";
import { Crypto } from "../../helpers/crypto";
import { Alerts } from "../../helpers/alerts";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent {
  user: User = {};
  registerForm: FormGroup;
  readonly crypto = new Crypto();
  readonly alerts = new Alerts();

  constructor(
    private readonly usersService: UserService,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder
  ) {
    this.createRegisterForm();
  }

  register(): void {
    this.usersService
      .getUsername(this.registerForm.get("username").value)
      .subscribe(
        () => {
          this.alerts.showToastAlert(
            "Try again!",
            "The username '" +
              this.registerForm.get("username").value +
              "' already used",
            "error"
          );
          document.getElementById("username").classList.add("is-invalid");
          this.registerForm.get("username").setValue("");
        },
        () => {
          const newUser: User = {
            ...this.user,
            ...this.registerForm.value,
          };

          newUser.password = this.crypto.encrypt(newUser.password);

          this.usersService.registerUser(newUser).subscribe(() => {
            this.alerts
              .showAlert(
                "Yeah!",
                "The user was registered successfully",
                "success"
              )
              .then((result) => {
                if (result.value || result.dismiss) {
                  this.router.navigate(["login"]);
                }
              });
          });
        }
      );
  }

  createRegisterForm(): void {
    this.registerForm = this.formBuilder.group({
      name: new FormControl(this.user.name, [
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
      last_name: new FormControl(this.user.last_name, [
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
      username: new FormControl(this.user.username, [
        Validators.minLength(4),
        Validators.maxLength(12),
      ]),
      password: new FormControl(this.user.password, [
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
    });
  }
}
