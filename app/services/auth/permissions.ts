import { createAccessControl } from "better-auth/plugins/access";

/**
 * make sure to use `as const` so typescript can infer the type correctly
 */
const statement = {
  event: ["create", "update", "delete"],
  program: ["create", "update", "delete"],
} as const;

export const ac = createAccessControl(statement);

export const staff = ac.newRole({
  event: ["create", "update", "delete"],
  program: ["create", "update", "delete"],
});
