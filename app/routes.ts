import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  route("api/auth/*", "routes/auth_api.tsx"),
  index("routes/home.tsx"),
  route("login", "routes/login.tsx"),
  ...prefix("admin", [
    layout("routes/admin/layout.tsx", [
      index("routes/admin/admin_index.tsx"),
      ...prefix("programs", [index("routes/admin/programs/prog_index.tsx")]),
      ...prefix("events", [index("routes/admin/events/events_index.tsx")]),
    ]),
  ]),
] satisfies RouteConfig;
