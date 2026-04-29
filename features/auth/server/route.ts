import { Context, Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { loginSchema, registerSchema } from "../schemas";
import { createAdminClient } from "@/lib/appwrite";
import { ID } from "node-appwrite";
import { deleteCookie, setCookie } from "hono/cookie";
import { AUTH_COOKIE } from "../constants";
import { sessionMiddleware } from "@/lib/session-middleware";

function handleAuthError(c: Context, error: unknown) {
  const appwriteError = error as { type?: string; message?: string };
  if (appwriteError?.type === "project_paused") {
    return c.json(
      {
        success: false,
        error:
          "Authentication is temporarily unavailable because the Appwrite project is paused. Unpause it in the Appwrite Console and try again.",
      },
      503
    );
  }

  return c.json(
    {
      success: false,
      error: "Authentication request failed. Please try again.",
    },
    500
  );
}

const app = new Hono()
  .get(
    "/current",
    sessionMiddleware,
    async (c) => {
      const user = c.get("user");

      return c.json({ data: user });
    })
  .post("/login",
    zValidator("json", loginSchema),
    async (c) => {
      try {
        const { email, password } = c.req.valid("json");

        const { account } = await createAdminClient();
        const session = await account.createEmailPasswordSession({
          email,
          password,
        });

        setCookie(c, AUTH_COOKIE, session.secret, {
          path: "/",
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 60 * 60 * 24 * 30,
        });

        return c.json({ success: true });
      } catch (error) {
        return handleAuthError(c, error);
      }
    })
  .post("/register",
    zValidator("json", registerSchema),
    async (c) => {
      try {
        const { name, email, password } = c.req.valid("json");

        const { account } = await createAdminClient();
        await account.create(
          ID.unique(),
          email,
          password,
          name
        );

        const session = await account.createEmailPasswordSession({
          email,
          password,
        });

        setCookie(c, AUTH_COOKIE, session.secret, {
          path: "/",
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 60 * 60 * 24 * 30,
        });

        return c.json({ success: true });
      } catch (error) {
        return handleAuthError(c, error);
      }
    })
  .post("/logout", sessionMiddleware, async (c) => {
    const account = c.get("account");

    deleteCookie(c, AUTH_COOKIE);
    await account.deleteSession("current");

    return c.json({ success: true });
  });

export default app;