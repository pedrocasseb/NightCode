import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import * as Sentry from "@sentry/hono/bun";
import sessions from "./routes/sessions";
import { sentry } from "@sentry/hono/bun";

const app = new Hono();

app.use(
    sentry(app, {
        dsn: "https://bcd8da7c6bd6b27e0eb98c690de4d96c@o4511535451078656.ingest.us.sentry.io/4511535455797248",
        tracesSampleRate: 1.0,
        enableLogs: true,
        // To disable sending user data, uncomment the line below. For more info visit:
        // https://docs.sentry.io/platforms/javascript/guides/hono/configuration/options/#dataCollection
        // dataCollection: { userInfo: false },
    }),
);

app.get("/debug-sentry", () => {
    // Send a log before throwing the error
    Sentry.logger.info("User triggered test error", {
        action: "test_error_endpoint",
    });
    // Send a test metric before throwing the error
    Sentry.metrics.count("test_counter", 1);
    throw new Error("My first Sentry error!");
});

app.onError((error, c) => {
    if (error instanceof HTTPException) {
        Sentry.logger.warn("HTTP error occurred", {
            status: error.status,
            message: error.message || "Request failed",
            path: c.req.url,
            method: c.req.method,
        });
        return c.json(
            {
                error: error.message || "Request failed",
            },
            error.status,
        );
    }

    Sentry.logger.error("Unexpected error occurred", {
        path: c.req.url,
        method: c.req.method,
        error: error instanceof Error ? error.stack : "Unknown error",
    });

    return c.json({ error: "Internal server error" }, 500);
});

const routes = app.route("/sessions", sessions);

export type AppType = typeof routes;
// idleTimeout must be high, otherwise LLM tool calls might not complete
export default { port: 3000, fetch: app.fetch, idleTimeout: 255 };
