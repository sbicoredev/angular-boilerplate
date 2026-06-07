import { Component } from "@angular/core";

import { HlmCardImports } from "@/ui/card";

import { SignupForm } from "../../components/signup-form/signup-form";

@Component({
  selector: "app-signup-page",
  imports: [HlmCardImports, SignupForm],
  template: `
    <div class="max-w-md mx-auto">
      <div hlmCard>
        <div hlmCardHeader>
          <h3 hlmCardTitle> Create your account </h3>
          <p hlmCardDescription>Fill in the form below to create your account</p>
        </div>
        <div hlmCardContent>
          <app-signup-form/>
        </div>
      </div>
    </div>
  `,
})
export class SignupPage {}
