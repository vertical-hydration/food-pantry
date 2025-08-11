import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route("api/auth/*", "routes/auth_api.tsx"),
  index("routes/home.tsx"),
  route("login", "routes/login.tsx"),
] satisfies RouteConfig;
