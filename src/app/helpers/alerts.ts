import Swal from "sweetalert2";
import { ValueOrThunk } from "sweetalert2";

export class Alerts {
  readonly outsideClick: ValueOrThunk<false>;
  readonly escapeKey: ValueOrThunk<false>;

  showToastAlert(
    titleAlert: string,
    textAlert: string,
    iconAlert: "success" | "error" | "warning" | "info" | "question"
  ): void {
    Swal.fire({
      title: titleAlert,
      text: textAlert,
      icon: iconAlert,
      toast: true,
      timer: 2500,
      timerProgressBar: true,
    });
  }

  showAlert(
    titleAlert: string,
    textAlert: string,
    iconAlert: "success" | "error" | "warning" | "info" | "question"
  ): Promise<any> {
    return Swal.fire({
      title: titleAlert,
      text: textAlert,
      icon: iconAlert,
      timer: 2000,
      timerProgressBar: true,
      allowOutsideClick: this.outsideClick,
      allowEscapeKey: this.escapeKey,
    });
  }

  showAlertInput(
    titleAlert: string,
    textAlert: string,
    iconAlert: "success" | "error" | "warning" | "info" | "question",
    inputAlert:
      | "text"
      | "email"
      | "password"
      | "number"
      | "tel"
      | "range"
      | "textarea"
      | "select"
      | "radio"
      | "checkbox"
      | "file"
      | "url"
  ): Promise<any> {
    return Swal.fire({
      title: titleAlert,
      text: textAlert,
      icon: iconAlert,
      input: inputAlert,
      inputPlaceholder: "Password",
    });
  }

  showAlertConfirm(
    titleAlert: string,
    textAlert: string,
    iconAlert: "success" | "error" | "warning" | "info" | "question"
  ): Promise<any> {
    return Swal.fire({
      title: titleAlert,
      text: textAlert,
      icon: iconAlert,
      showCancelButton: true,
      confirmButtonText: "Yes, of course!",
      cancelButtonText: "No, cancel!",
      allowOutsideClick: this.outsideClick,
      allowEscapeKey: this.escapeKey,
      cancelButtonColor: "red",
      confirmButtonColor: "green",
    });
  }
}
