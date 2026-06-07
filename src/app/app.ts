import { Component, inject, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { Theme } from "./core/services/theme";

@Component({
  selector: "app-root",
  imports: [RouterOutlet],
  template: `
    <router-outlet />
  `,
})
export class App {
  protected readonly title = signal("angular-boilerplate");
  private readonly _themeService = inject(Theme);
}
