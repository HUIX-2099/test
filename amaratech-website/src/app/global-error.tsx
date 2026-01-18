"use client";

import * as React from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // NOTE: This component intentionally stays dependency-free to avoid
  // cascading failures when the app is already in an error state.
  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.error("Global error boundary caught:", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, "Noto Sans", "Liberation Sans", sans-serif',
          margin: 0,
          padding: "48px 20px",
          background: "#0b1020",
          color: "#e8eefc",
        }}
      >
        <div style={{ maxWidth: 920, margin: "0 auto" }}>
          <h1 style={{ fontSize: 28, margin: "0 0 12px" }}>
            Something went wrong
          </h1>
          <p style={{ opacity: 0.9, margin: "0 0 20px", lineHeight: 1.5 }}>
            An unexpected error occurred while rendering this page.
          </p>

          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              marginBottom: 20,
            }}
          >
            <button
              type="button"
              onClick={() => reset()}
              style={{
                border: "1px solid rgba(232,238,252,0.25)",
                background: "rgba(232,238,252,0.08)",
                color: "#e8eefc",
                padding: "10px 14px",
                borderRadius: 10,
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            <a
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                border: "1px solid rgba(232,238,252,0.25)",
                background: "transparent",
                color: "#e8eefc",
                padding: "10px 14px",
                borderRadius: 10,
                textDecoration: "none",
              }}
            >
              Go home
            </a>
          </div>

          <details
            style={{
              border: "1px solid rgba(232,238,252,0.18)",
              borderRadius: 12,
              padding: 14,
              background: "rgba(0,0,0,0.25)",
            }}
          >
            <summary style={{ cursor: "pointer" }}>Error details</summary>
            <pre
              style={{
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                marginTop: 12,
                marginBottom: 0,
                fontSize: 12,
                lineHeight: 1.45,
                color: "rgba(232,238,252,0.9)",
              }}
            >
              {String(error?.message || error)}
              {error?.digest ? `\n\nDigest: ${error.digest}` : ""}
              {error?.stack ? `\n\n${error.stack}` : ""}
            </pre>
          </details>
        </div>
      </body>
    </html>
  );
}

