import { Component } from "@angular/core";
import { NgIcon, provideIcons } from "@ng-icons/core";
import { lucideArrowRight, lucideUser } from "@ng-icons/lucide";

import { Container } from "@/shared/components/container/container";
import { ZardButtonComponent } from "@/shared/components/ui/button";

@Component({
  selector: "app-home-page",
  imports: [NgIcon, Container, ZardButtonComponent],
  templateUrl: "./home-page.html",
  viewProviders: provideIcons({
    lucideUser,
    lucideArrowRight,
  }),
})
export class HomePage {}
