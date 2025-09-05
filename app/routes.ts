import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  route("api/auth/*", "routes/auth_api.tsx"),
  index("routes/landing.tsx"),
  route("about", "routes/about.tsx"),
  route("login", "routes/login.tsx"),

  // community Routes
  ...prefix("community", [
    layout("routes/community/layout.tsx", [
      index("routes/community/home.tsx"),
      ...prefix("programs", [
        index("routes/community/programs.tsx"),
        ...prefix(":programId", [
          index("routes/community/program_details.tsx"),
          route(
            "apply",
            "routes/community/program_apply.tsx"
          ),
        ]),
      ]),
      route(
        "events/:eventId/reserve",
        "routes/community/request_reservation.tsx"
      ),
    ]),
    //  route("programs", ""),
  ]),
  // Admin Routes
  ...prefix("admin", [
    layout("routes/admin/layout.tsx", [
      index("routes/admin/admin_index.tsx"),
      ...prefix("programs", [
        index("routes/admin/programs/prog_index.tsx"),
        route(
          "create",
          "routes/admin/programs/add_program.tsx"
        ),
        route(
          ":programId",
          "routes/admin/programs/program_layout.tsx",
          { id: "programId" },
          [
            index(
              "routes/admin/programs/program_dashboard.tsx"
            ),
            route(
              "edit",
              "routes/admin/programs/program_edit.tsx"
            ),
            route(
              "enrollment",
              "routes/admin/programs/program_enrollment.tsx"
            ),
            ...prefix("applications", [
              index(
                "routes/admin/programs/program_applications.tsx"
              ),
              route(
                ":applId",
                "routes/admin/programs/application_approve.tsx"
              ),
            ]),
            route(
              "events",
              "routes/admin/programs/program_events.tsx"
            ),
            route(
              "events/create",
              "routes/admin/programs/program_event_create.tsx"
            ),
          ]
        ),
      ]),
      ...prefix("events", [
        index("routes/admin/events/events_index.tsx"),
        route(
          ":eventId",
          "routes/admin/events/event_layout.tsx",
          {
            id: "eventId",
          },
          [
            index(
              "routes/admin/events/event_dashboard.tsx"
            ),
            route(
              "reservations",
              "routes/admin/events/event_reservations.tsx"
            ),
          ]
        ),
      ]),
    ]),
  ]),
] satisfies RouteConfig;
