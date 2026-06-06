import { Component, computed, inject, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { NgIcon, provideIcons } from "@ng-icons/core";
import { lucideMenu, lucideSunMoon, lucideX } from "@ng-icons/lucide";

import { ZardDarkMode } from "@/core/services";
import { mergeClasses } from "@/shared/utils/merge-classes";

import { ZardButtonComponent } from "../../ui/button";

@Component({
  selector: "header[app-header]",
  imports: [NgIcon, RouterLink, ZardButtonComponent],
  templateUrl: "./header.html",
  viewProviders: [provideIcons({ lucideSunMoon, lucideMenu, lucideX })],
  host: {
    "(window:scroll)": "onScroll()",
  },
})
export class Header {
  private readonly darkModeService = inject(ZardDarkMode);

  private readonly _menuState = signal(false);
  private readonly _scrolled = signal(false);

  readonly menuState = this._menuState.asReadonly();
  readonly isScrolled = this._scrolled.asReadonly();

  protected readonly scrollEffectClasses = computed(() =>
    mergeClasses(
      "mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12",
      this.isScrolled() &&
        "max-w-4xl rounded-2xl border bg-background/50 backdrop-blur-lg lg:px-5"
    )
  );

  protected readonly menuItems = [
    { name: "Features", href: "#link" },
    { name: "Solution", href: "#link" },
    { name: "Pricing", href: "#link" },
    { name: "About", href: "#link" },
  ];

  toggleMenu(): void {
    this._menuState.set(!this._menuState());
  }

  toggleTheme(): void {
    this.darkModeService.toggleTheme();
  }

  onScroll() {
    console.log("scrolled", window.scrollY);
    this._scrolled.set(window.scrollY > 50);
  }
}
