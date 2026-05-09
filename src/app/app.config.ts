import {
  type ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from "@angular/core";
import {
  provideClientHydration,
  withEventReplay,
} from "@angular/platform-browser";
import { provideRouter } from "@angular/router";

import { provideZard } from "@/core/provider/providezard";

import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),

    provideZard(),
  ],
};
