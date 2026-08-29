import { createRouter } from "@tanstack/react-router";
import { AppNotFound } from "@/components/layout/app-not-found";
import { AppPendingComponent } from "@/components/layout/app-pending";
import { AppErrorComponent } from "@/lib/error-component";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
  return createRouter({
    routeTree,
    defaultErrorComponent: AppErrorComponent,
    defaultPendingComponent: AppPendingComponent,
    defaultNotFoundComponent: AppNotFound,
    defaultPreload: "intent",
    scrollRestoration: true,
  });
}
