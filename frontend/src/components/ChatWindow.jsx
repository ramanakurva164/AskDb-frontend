import React, { useState, useRef, useEffect } from "react";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";
import { sendChatMessage } from "../api/chatApi";

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expandId, setExpandId] = useState(null);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text) => {
    if (!text.trim() || loading) return;

    setLoading(true);
    const tempId = "temp-" + Date.now();

    // Temporary bubble
    const userMsg = {
      id: tempId,
      role: "user",
      text,
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await sendChatMessage(text, conversationId);

      if (!conversationId) {
        setConversationId(res.conversation_id);
      }

      setMessages((prev) => [
        ...prev.filter((msg) => msg.id !== tempId),
        userMsg,
        res,
      ]);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        Student Assignment Chat
        <button
          className="new-chat-btn"
          onClick={() => {
            setMessages([]);
            setConversationId(null);
            setExpandId(null);
          }}
        >
          New Chat
        </button>
      </div>

      <div className="chat-messages">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            showQuery={expandId === msg.id}
            onToggleQuery={() =>
              setExpandId(expandId === msg.id ? null : msg.id)
            }
          />
        ))}
        <div ref={bottomRef} />
      </div>

      <ChatInput onSend={handleSend} disabled={loading} />
    </div>
  );
}
