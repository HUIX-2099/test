"use client";

import * as React from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.error("Route error boundary caught:", error);
  }, [error]);

  return (
    <div
      style={{
        maxWidth: 920,
        margin: "0 auto",
        padding: "48px 20px",
      }}
    >
      <h2 style={{ marginTop: 0 }}>We hit a snag.</h2>
      <p style={{ opacity: 0.85, lineHeight: 1.5 }}>
        Please retry. If it keeps happening, the details below can help us
        diagnose it.
      </p>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={() => reset()}
          style={{
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.08)",
            color: "inherit",
            padding: "10px 14px",
            borderRadius: 10,
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </div>

      <details style={{ marginTop: 18 }}>
        <summary style={{ cursor: "pointer" }}>Error details</summary>
        <pre
          style={{
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            marginTop: 12,
            fontSize: 12,
            lineHeight: 1.45,
            opacity: 0.9,
          }}
        >
          {String(error?.message || error)}
          {error?.digest ? `\n\nDigest: ${error.digest}` : ""}
          {error?.stack ? `\n\n${error.stack}` : ""}
        </pre>
      </details>
    </div>
  );
}

