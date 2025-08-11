import { redirect } from "react-router";
import { auth } from "~/services/auth/auth.server";
import { db } from "~/services/db/db.server";

const requireAuth = async ({ request }: { request: Request }) => {
  const session = await auth.api.getSession(request);
  console.log("Protected Route Loader - Session:", session);
  if (!session?.user) {
    const url = new URL(request.url);
    const currentPath = url.pathname;
    const loginUrl = "/login";
    const redirectUrl = `${loginUrl}?redirectUrl=${encodeURIComponent(
      currentPath
    )}`;
    throw redirect(redirectUrl);
  }

  return {
    user: session.user,
  };
};

export { requireAuth };
