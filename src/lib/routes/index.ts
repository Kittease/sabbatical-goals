import { Route } from "next";

export const Routes = {
  LOGIN: "/auth/login",
  LOGIN_ERROR: "/auth/login/error",
  LOGOUT: "/auth/logout",

  GOALS: "/",
  GOALS_EDITABLE: "/edit",

  API_AUTH_CALLBACK: "/auth/v1/callback",
} satisfies Record<string, Route>;

export const PROTECTED_ROUTES: Route[] = [
  Routes.LOGOUT,
  Routes.GOALS_EDITABLE,
];
