import { Component, computed, Injectable, inject, signal } from "@angular/core";
import { RouterModule, RouterOutlet } from "@angular/router";

import { Footer } from "@/shared/components/layout/footer/footer";
import { Header } from "@/shared/components/layout/header/header";

@Injectable({ providedIn: "root" })
class CartService {
  items = signal<unknown[]>([]); // CartItem = { id, name, price, qty }
}

interface User {
  email: string;
  id: string;
  name: string;
}

@Injectable({ providedIn: "root" })
class AuthService {
  currentUser = signal<User | null>(null);
}

@Injectable({ providedIn: "root" })
class NotificationService {
  success(msg: string): void {
    console.log("[Toast]", msg);
  }
}

@Component({
  selector: "div[app-main-layout]",
  imports: [RouterModule, RouterOutlet, Header, Footer],
  template: `
    <header app-header> </header>
    <main>
      <router-outlet/>
    </main>
    <footer app-footer> </footer>
  `,
})
export class MainLayout {
  private readonly cartService = inject(CartService);
  private readonly authService = inject(AuthService);
  private readonly notificationService = inject(NotificationService);

  // Reactive signals from core services
  protected readonly cartCount = computed(
    () => this.cartService.items().length
  );
  protected readonly user = this.authService.currentUser;
  protected readonly currentYear = new Date().getFullYear();

  // Local UI state
  protected readonly mobileMenuOpen = signal<boolean>(false);

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }
  handleNewsletterSubmit(event: SubmitEvent): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const emailInput = form.querySelector(
      'input[type="email"]'
    ) as HTMLInputElement;
    const email = emailInput.value.trim();

    if (!email) {
      return;
    }

    // In production: this.newsletterService.subscribe(email).subscribe(...)
    this.notificationService.success(`Successfully subscribed ${email}`);
    form.reset();
  }
}
