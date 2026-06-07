import type { Routes } from "@angular/router";

import { AuthLayout } from "./layouts/auth-layout/auth-layout";
import { MainLayout } from "./layouts/main-layout/main-layout";

export const routes: Routes = [
  {
    path: "",
    component: MainLayout,
    children: [
      {
        path: "",
        loadComponent: () =>
          import("./pages/home-page/home-page").then((m) => m.HomePage),
      },
    ],
  },
  {
    path: "auth",
    component: AuthLayout,
    children: [
      {
        path: "signin",
        loadComponent: () =>
          import("./features/auth/pages/signin-page/signin-page").then(
            (m) => m.SigninPage
          ),
      },
    ],
  },
];
