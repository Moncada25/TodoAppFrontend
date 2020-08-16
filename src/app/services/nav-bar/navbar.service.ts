import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class NavbarService {
  public showBar: boolean;
  public userLogged: string;

  constructor() {
    this.showBar = localStorage.length > 0;
  }
}
