import { Component, signal } from "@angular/core";
import {
  email,
  FormField,
  FormRoot,
  form,
  minLength,
  required,
  validate,
} from "@angular/forms/signals";
import { RouterLink } from "@angular/router";
import { NgIcon, provideIcons } from "@ng-icons/core";
import { lucideGithub } from "@ng-icons/lucide";

import { HlmButtonImports } from "@/ui/button";
import { HlmFieldImports } from "@/ui/field";
import { HlmInputImports } from "@/ui/input";

@Component({
  selector: "app-signup-form",
  imports: [
    FormRoot,
    FormField,
    NgIcon,
    RouterLink,
    HlmFieldImports,
    HlmInputImports,
    HlmButtonImports,
  ],
  templateUrl: "./signup-form.html",
  viewProviders: provideIcons({ lucideGithub }),
})
export class SignupForm {
  protected readonly _model = signal({
    name: "Test",
    email: "test@test.com",
    password: "123123",
    confirmPassword: "123123",
  });

  public readonly form = form(
    this._model,
    (s) => {
      required(s.name, { message: "Name is required" });
      minLength(s.password, 3, {
        message: "Name must be at least 3 characters",
      });

      required(s.email, { message: "Email is required" });
      email(s.email);

      required(s.password, { message: "Password is required" });
      minLength(s.password, 6, {
        message: "Password must be at least 6 characters",
      });

      required(s.confirmPassword, { message: "Confirm Password is required" });
      minLength(s.confirmPassword, 6, {
        message: "Confirm Password must be at least 6 characters",
      });
      // biome-ignore lint/suspicious/noShadowRestrictedNames: explanation
      validate(s.confirmPassword, ({ value, valueOf }) => {
        const confirmPassword = value();
        const password = valueOf(s.password);
        if (confirmPassword !== password) {
          return {
            kind: "passwordMismatch",
            message: "Passwords do not match",
          };
        }
        return null;
      });
    },
    { submission: { action: async () => this.handleSubmit() } }
  );

  public handleSubmit() {
    const model = this._model();
    console.log(model);
  }
}
