import { request } from "http";
import { redirect } from "react-router";
import { auth } from "~/services/auth/auth.server";
import { db } from "~/services/db/db.server";

const requireAuth = async ({ request }: { request: Request }) => {
  const data = await auth.api.getSession(request);

  if (!data?.user) {
    const url = new URL(request.url);
    const currentPath = url.pathname;
    const loginUrl = "/login";
    const redirectUrl = `${loginUrl}?redirectUrl=${encodeURIComponent(
      currentPath
    )}`;
    throw redirect(redirectUrl);
  }

  return { ...data };
};

const requireSettingsView = async ({ request }: { request: Request }) => {
  const { user, session } = await requireAuth({ request });

  const data = await auth.api.userHasPermission({
    body: {
      userId: user.id,
      permission: {
        settings: ["view"],
      },
    },
  });

  if (!data.success) {
    throw redirect("/");
  }

  return { user, session, data };
};

export { requireAuth, requireSettingsView };
