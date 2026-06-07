import { MediaMatcher } from "@angular/cdk/layout";
import { isPlatformBrowser } from "@angular/common";
import {
  afterNextRender,
  computed,
  DestroyRef,
  DOCUMENT,
  effect,
  inject,
  PLATFORM_ID,
  Service,
  signal,
} from "@angular/core";

export const ThemeModes = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
} as const;
export type ThemeModesOption = keyof typeof ThemeModes;

const STORAGE_KEY = "theme";

@Service()
export class Theme {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private readonly mediaMatcher = inject(MediaMatcher);

  private readonly _init = signal(false);
  private readonly _isSystemDark = signal(false);
  private readonly _theme = signal<ThemeModesOption>("SYSTEM");

  private _query?: MediaQueryList;

  readonly currentTheme = () => this._theme.asReadonly();

  readonly themeMode = computed<"LIGHT" | "DARK">(() => {
    const activeTheme = this._theme();
    if (activeTheme === "SYSTEM") {
      return this._isSystemDark() ? "DARK" : "LIGHT";
    }
    return activeTheme;
  });

  constructor() {
    if (this.isBrowser) {
      effect(() => {
        if (!this._init()) {
          return;
        }
        this.updateThemeMode(this.isDarkModeActive(this._theme()));
      });

      afterNextRender({
        write: () => {
          // Only initialize if init() wasn't already called synchronously (e.g., in tests)
          if (!this._init()) {
            this.ensureQueryInitialized();
            this.initializeTheme();
          }
        },
      });
    }
  }

  init() {
    if (!this._init() && this.isBrowser) {
      this.ensureQueryInitialized();
      this.initializeTheme();
    }
  }

  toggleTheme(targetMode?: ThemeModesOption): void {
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

  private ensureQueryInitialized(): void {
    if (!this._query) {
      this._query = this.mediaMatcher.matchMedia(
        "(prefers-color-scheme: dark)"
      );
      this._isSystemDark.set(this._query.matches);
      this.destroyRef.onDestroy(() => this.handleSystemChanges(false));
    }
  }

  private initializeTheme(): void {
    const storedTheme = this.getStoredTheme();
    if (storedTheme) {
      this._theme.set(storedTheme);
    }

    if (!storedTheme || storedTheme === "SYSTEM") {
      this.handleSystemChanges();
    }

    this._init.set(true);
    this.updateThemeMode(this.isDarkModeActive(this._theme()));
  }

  private updateThemeMode(isDarkMode: boolean): void {
    const html = this.document.documentElement;
    html.classList.toggle("dark", isDarkMode);
  }

  private isDarkModeActive(currentTheme: ThemeModesOption): boolean {
    if (!this.isBrowser) {
      return false;
    }

    return (
      currentTheme === "DARK" ||
      (currentTheme === "SYSTEM" && this._isSystemDark())
    );
  }

  private getStoredTheme(): ThemeModesOption | undefined {
    if (!this.isBrowser) {
      return;
    }

    try {
      const value = localStorage.getItem(STORAGE_KEY);
      if (value === "LIGHT" || value === "DARK" || value === "SYSTEM") {
        return value;
      }
    } catch (error) {
      console.warn("Failed to read theme from localStorage:", error);
    }
    return;
  }

  private get query(): MediaQueryList {
    if (!(this.isBrowser && this._query)) {
      throw new Error(
        "MediaQueryList not available: either running on server or not initialized"
      );
    }
    return this._query;
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

  private readonly handleThemeChange = (event: MediaQueryListEvent) =>
    this._isSystemDark.set(event.matches);

  private applyTheme(theme: ThemeModesOption): void {
    if (!this.isBrowser) {
      return;
    }

    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (error) {
      console.warn("Failed to save theme to localStorage:", error);
    }
    this._theme.set(theme);

    if (theme === "SYSTEM") {
      if (this.query) {
        this._isSystemDark.set(this.query.matches);
      } else {
        this.ensureQueryInitialized();
      }
      this.handleSystemChanges();
    } else {
      this.handleSystemChanges(false);
    }
  }
}
