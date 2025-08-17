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
      ...prefix("programs", [
        index("routes/admin/programs/prog_index.tsx"),
        route("create", "routes/admin/programs/add_program.tsx"),
        ...prefix(":programId", [
          layout("routes/admin/programs/program_layout.tsx", [
            index("routes/admin/programs/program_dashboard.tsx"),
            route(
              "applications",
              "routes/admin/programs/program_applications.tsx"
            ),
          ]),
        ]),
      ]),
      ...prefix("events", [index("routes/admin/events/events_index.tsx")]),
    ]),
  ]),
] satisfies RouteConfig;
