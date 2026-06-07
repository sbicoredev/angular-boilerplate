import { Component, signal } from "@angular/core";
import {
  email,
  FormField,
  FormRoot,
  form,
  minLength,
  required,
} from "@angular/forms/signals";
import { RouterLink } from "@angular/router";
import { NgIcon, provideIcons } from "@ng-icons/core";
import { lucideGithub } from "@ng-icons/lucide";

import { HlmButtonImports } from "@/ui/button";
import { HlmFieldImports } from "@/ui/field";
import { HlmInputImports } from "@/ui/input";

@Component({
  selector: "app-signin-form",
  imports: [
    FormRoot,
    FormField,
    NgIcon,
    RouterLink,
    HlmFieldImports,
    HlmInputImports,
    HlmButtonImports,
  ],
  templateUrl: "./signin-form.html",
  viewProviders: provideIcons({ lucideGithub }),
})
export class SigninForm {
  protected readonly _model = signal({
    email: "",
    password: "",
  });

  public readonly form = form(
    this._model,
    (s) => {
      required(s.email, { message: "Email is required" });
      email(s.email, { message: "Email is invalid" });
      required(s.password, { message: "Password is required" });
      minLength(s.password, 6, {
        message: "Password must be at least 6 characters",
      });
    },
    { submission: { action: async () => this.handleSubmit() } }
  );

  public handleSubmit() {
    const model = this._model();
    console.log(model);
  }
}
