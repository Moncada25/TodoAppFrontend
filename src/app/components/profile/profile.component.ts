import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
} from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { User } from "../../models/user";
import { UserService } from "../../services/users/user.service";
import { Alerts } from "../../helpers/alerts";
import { Crypto } from "../../helpers/crypto";
import { NavigationComponent } from "../navigation/navigation.component";
import { NavbarService } from "../../services/nav-bar/navbar.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  user: User = {};
  update: boolean;
  profileForm: FormGroup;
  readonly alerts = new Alerts();
  readonly crypto = new Crypto();
  navigator = new NavigationComponent(this.navbarService);
  skillsLength: number;

  constructor(
    private readonly usersService: UserService,
    private readonly navbarService: NavbarService,
    private readonly formBuilder: FormBuilder
  ) {
    this.user = JSON.parse(localStorage.getItem("userLogged"));
  }

  ngOnInit(): void {
    this.update = false;
    this.navigator.showBar();
    this.createProfileForm();
  }

  updateProfile(): void {
    this.usersService
      .getUsername(this.profileForm.get("username").value)
      .subscribe(
        (res) => {
          if (
            res.username === this.profileForm.get("username").value &&
            res.username !== this.user.username
          ) {
            this.alerts.showToastAlert(
              "Verify!",
              "Username already exist, please change it!",
              "error"
            );

            document.getElementById("username").classList.add("is-invalid");
          } else {
            this.updateUser();
          }
        },
        () => {
          this.updateUser();
        }
      );
  }

  private updateUser(): void {
    this.alerts
      .showAlertConfirm(
        "Are you sure?",
        "The update will be permanent!",
        "warning"
      )
      .then((willDelete) => {
        if (willDelete.value) {
          this.alerts
            .showAlertInput(
              "Update profile",
              "Enter your current password",
              "warning",
              "password"
            )
            .then((password) => {
              if (this.crypto.decrypt(this.user.password) === password.value) {
                const profileUpdated: User = {
                  ...this.user,
                  ...this.profileForm.value,
                };

                this.user = profileUpdated;
                this.user.password = this.crypto.encrypt(this.user.password);
                this.usersService
                  .updateUser(this.user.id, this.user)
                  .subscribe(() => {
                    localStorage.setItem(
                      "userLogged",
                      JSON.stringify(this.user)
                    );

                    this.alerts
                      .showAlert(
                        "Yeah!",
                        "Your profile has been successfully updated",
                        "success"
                      )
                      .then((result) => {
                        if (result.value || result.dismiss) {
                          document.getElementById("toggleUpdate").click();
                          this.navigator = new NavigationComponent(
                            this.navbarService
                          );
                        }
                      });
                  });
              } else {
                this.alerts.showAlert("Verify!", "Password incorrect", "error");
              }
            });
        }
      });
  }

  getLengthSkills(event: number): void {
    this.skillsLength = event;
  }

  updateCheck(input: HTMLButtonElement): void {
    this.update = !this.update;
    if (this.update) {
      this.profileForm.setValue(this.user);
      this.profileForm
        .get("password")
        .setValue(this.crypto.decrypt(this.user.password));
      input.classList.remove("btn-info");
      input.classList.add("btn-danger");
    } else {
      input.classList.remove("btn-danger");
      input.classList.add("btn-info");
    }
  }

  createProfileForm(): void {
    this.profileForm = this.formBuilder.group({
      id: new FormControl(this.user.id, []),
      name: new FormControl(this.user.name, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
      last_name: new FormControl(this.user.last_name, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
      username: new FormControl(this.user.username, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12),
      ]),
      email: new FormControl(this.user.email, [
        Validators.minLength(8),
        Validators.maxLength(40),
      ]),
      age: new FormControl(this.user.age, [
        Validators.min(10),
        Validators.max(100),
      ]),
      password: new FormControl(this.crypto.decrypt(this.user.password), [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
      description: new FormControl(this.user.description, [
        Validators.minLength(4),
        Validators.maxLength(1000),
      ]),
      registered_at: new FormControl(this.user.registered_at, []),
    });
  }
}
