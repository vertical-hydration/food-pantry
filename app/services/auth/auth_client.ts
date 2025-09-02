import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";
import { staff, ac } from "./permissions";

export const authClient = createAuthClient({
  plugins: [
    adminClient({
      ac,
      roles: {
        staff,
      },
    }),
  ],
});

export const { signIn, signUp, signOut, useSession } = authClient;
