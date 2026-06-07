import { Component } from "@angular/core";
import { RouterModule, RouterOutlet } from "@angular/router";

@Component({
  selector: "div[app-auth-layout]",
  imports: [RouterModule, RouterOutlet],
  template: `
    <main class="min-h-screen">
      <div class="h-screen max-w-xl place-content-center justify-self-center md:max-w-5xl w-full space-y-6 p-4">
        <router-outlet/>
      </div>
    </main>
  `,
})
export class AuthLayout {}
