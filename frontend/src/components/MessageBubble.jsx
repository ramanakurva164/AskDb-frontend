import React from "react";
import ResultsTable from "./ResultsTable";

export default function MessageBubble({
  message,
  showQuery,
  onToggleQuery,
}) {
  const isUser = message.role === "user";
  const rows = Array.isArray(message.rows_json) ? message.rows_json : [];

  return (
    <div className={`bubble ${isUser ? "user" : "assistant"}`}>
      <div className="bubble-text">{message.text}</div>

      {!isUser && message.query_text && (
        <button className="query-toggle" onClick={onToggleQuery}>
          {showQuery ? "Hide Query" : "View Query"}
        </button>
      )}

      {showQuery && message.query_text && (
        <pre className="query-box">{message.query_text}</pre>
      )}

      {rows.length > 0 && <ResultsTable rows={rows} />}
    </div>
  );
}
