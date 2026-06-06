import { MediaMatcher } from "@angular/cdk/layout";
import { DOCUMENT, isPlatformBrowser } from "@angular/common";
import {
  afterNextRender,
  computed,
  DestroyRef,
  effect,
  Injectable,
  inject,
  PLATFORM_ID,
  signal,
} from "@angular/core";

export const EDarkModes = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
} as const;
export type DarkModeOptions = keyof typeof EDarkModes;

@Injectable({
  providedIn: "root",
})
export class ZardDarkMode {
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private readonly mediaMatcher = inject(MediaMatcher);

  private static readonly STORAGE_KEY = "theme";
  private readonly handleThemeChange = (event: MediaQueryListEvent) =>
    this.systemDark.set(event.matches);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly themeSignal = signal<DarkModeOptions>("SYSTEM");
  private _query?: MediaQueryList;
  private readonly initialized = signal(false);
  private readonly systemDark = signal(false);
  readonly themeMode = computed<"LIGHT" | "DARK">(() => {
    const activeTheme = this.themeSignal();
    if (activeTheme === "SYSTEM") {
      return this.systemDark() ? "DARK" : "LIGHT";
    }
    return activeTheme;
  });

  constructor() {
    if (this.isBrowser) {
      effect(() => {
        if (!this.initialized()) {
          return;
        }
        const theme = this.themeSignal();
        const isDarkMode = this.isDarkModeActive(theme);
        this.updateThemeMode(isDarkMode, theme);
      });

      afterNextRender({
        write: () => {
          // Only initialize if init() wasn't already called synchronously (e.g., in tests)
          if (!this.initialized()) {
            this.ensureQueryInitialized();
            this.initializeTheme();
          }
        },
      });
    }
  }

  init() {
    if (!this.initialized() && this.isBrowser) {
      this.ensureQueryInitialized();
      this.initializeTheme();
    }
  }

  toggleTheme(targetMode?: DarkModeOptions): void {
    if (!this.isBrowser) {
      return;
    }

    if (targetMode) {
      this.applyTheme(targetMode);
    } else {
      const next = this.themeMode() === "DARK" ? "LIGHT" : "DARK";
      this.applyTheme(next);
    }
  }

  /**
   * Returns a ReadonlySignal<"light" | "dark" | "system"> that cannot be mutated externally.
   * Call currentTheme() to access the value or use it directly in templates where signals are supported.
   * @example service.currentTheme() // returns "light", "dark", or "system"
   */
  get currentTheme() {
    return this.themeSignal.asReadonly();
  }

  private ensureQueryInitialized(): void {
    if (!this._query) {
      this._query = this.mediaMatcher.matchMedia(
        "(prefers-color-scheme: dark)"
      );
      this.systemDark.set(this._query.matches);
      this.destroyRef.onDestroy(() => this.handleSystemChanges(false));
    }
  }

  private get query(): MediaQueryList {
    if (!(this.isBrowser && this._query)) {
      throw new Error(
        "MediaQueryList not available: either running on server or not initialized"
      );
    }
    return this._query;
  }

  private initializeTheme(): void {
    const storedTheme = this.getStoredTheme();
    if (storedTheme) {
      this.themeSignal.set(storedTheme);
    }

    if (!storedTheme || storedTheme === "SYSTEM") {
      this.handleSystemChanges();
    }
    this.initialized.set(true);

    const theme = this.themeSignal();
    this.updateThemeMode(this.isDarkModeActive(theme), theme);
  }

  private applyTheme(theme: DarkModeOptions): void {
    if (!this.isBrowser) {
      return;
    }

    try {
      localStorage.setItem(ZardDarkMode.STORAGE_KEY, theme);
    } catch (error) {
      console.warn("Failed to save theme to localStorage:", error);
    }
    this.themeSignal.set(theme);

    if (theme === "SYSTEM") {
      if (this.query) {
        this.systemDark.set(this.query.matches);
      } else {
        this.ensureQueryInitialized();
      }
      this.handleSystemChanges();
    } else {
      this.handleSystemChanges(false);
    }
  }

  private getStoredTheme(): DarkModeOptions | undefined {
    if (!this.isBrowser) {
      return;
    }

    try {
      const value = localStorage.getItem(ZardDarkMode.STORAGE_KEY);
      if (value === "LIGHT" || value === "DARK" || value === "SYSTEM") {
        return value;
      }
    } catch (error) {
      console.warn("Failed to read theme from localStorage:", error);
    }
    return;
  }

  private updateThemeMode(
    isDarkMode: boolean,
    themeMode: DarkModeOptions
  ): void {
    const html = this.document.documentElement;
    html.classList.toggle("dark", isDarkMode);
    html.setAttribute("data-theme", themeMode);
  }

  private isDarkModeActive(currentTheme: DarkModeOptions): boolean {
    if (!this.isBrowser) {
      return false;
    }

    return (
      currentTheme === "DARK" ||
      (currentTheme === "SYSTEM" && this.systemDark())
    );
  }

  private handleSystemChanges(addListener = true): void {
    if (!this._query) {
      return;
    }

    try {
      if (addListener) {
        this.query.addEventListener("change", this.handleThemeChange);
      } else {
        this.query.removeEventListener("change", this.handleThemeChange);
      }
    } catch (error) {
      console.warn("Failed to manage media query event listener:", error);
    }
  }
}
