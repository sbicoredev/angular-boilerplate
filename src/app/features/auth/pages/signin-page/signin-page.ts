import { Component } from "@angular/core";

import { HlmCardImports } from "@/ui/card";

import { SigninForm } from "../../components/signin-form/signin-form";

@Component({
  selector: "app-signin-page",
  imports: [HlmCardImports, SigninForm],
  template: `
    <div class="max-w-md mx-auto">
      <div hlmCard>
        <div hlmCardHeader>
          <h3 hlmCardTitle>Login to your account</h3>
          <p hlmCardDescription>Enter your email below to login to your account</p>
        </div>
        <div hlmCardContent>
          <app-signin-form/>
        </div>
      </div>
    </div>
  `,
})
export class SigninPage {}
