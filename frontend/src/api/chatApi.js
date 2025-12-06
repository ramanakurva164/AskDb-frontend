export const sendChatMessage = async (message, conversationId = null) => {
  const API_URL = "https://askdb-backend-0rdb.onrender.com";
  const res = await fetch(`${API_URL}/api/chat/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      conversation_id: conversationId,
    }),
  });

  if (!res.ok) throw new Error("Failed API request");

  return res.json();
};
