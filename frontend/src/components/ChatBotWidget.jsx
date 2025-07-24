import { useState } from "react";
import { PaperPlaneIcon, Cross1Icon } from "@radix-ui/react-icons";
import botAvatar from "../assets/bot-avatar.png"; // <-- Add your custom avatar image here

const ChatBotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! I'm your financial assistant. How can I help?",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
  if (!input.trim()) return;

  const userMessage = { sender: "user", text: input };
  setMessages((prev) => [...prev, userMessage]);
  setInput("");
  setLoading(true);

  try {
    const response = await fetch("https://finmatrix-backend-556498664277.europe-west1.run.app/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
        user_id:"jayant",
      }),
    });

    const replyText = await response.text(); // because Flask returns plain text, not JSON
    const botReply = replyText || "Hmm, I couldn’t respond.";

    setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
  } catch (error) {
    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: "Error reaching assistant." },
    ]);
  } finally {
    setLoading(false);
  }
};


  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const lastBotMessage =
    messages
      .slice()
      .reverse()
      .find((m) => m.sender === "bot")?.text || "";

  return (
    <div className="fixed bottom-4 right-4 z-50 font-sans">
      {isOpen ? (
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg w-[28rem] h-[calc(100vh-2rem)] max-h-[calc(100vh-2rem)] flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="bg-blue-600 text-white px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={botAvatar} alt="Bot" className="w-6 h-6 rounded-full" />
              <span className="font-medium text-sm">Chat Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full bg-blue-700 hover:bg-red-600 transition"
              aria-label="Close chatbot">
              <Cross1Icon className="text-white" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50 dark:bg-gray-900 text-sm">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg max-w-xs ${
                  msg.sender === "user"
                    ? "ml-auto bg-blue-100 dark:bg-blue-700 text-gray-800 dark:text-white"
                    : "mr-auto bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                }`}>
                {msg.text}
              </div>
            ))}
            {loading && <div className="text-xs text-gray-400">Typing...</div>}
          </div>

          <div className="border-t border-gray-200 dark:border-gray-600 p-2 flex items-center gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              rows={1}
              className="flex-1 resize-none bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white p-2 rounded-md focus:outline-none text-sm"
              placeholder="Ask something..."
            />
            <button
              onClick={sendMessage}
              className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
              disabled={loading}>
              <PaperPlaneIcon />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="relative flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-full shadow-xl">
          <img src={botAvatar} alt="Chatbot" className="w-6 h-6 rounded-full" />
          <span className="hidden md:inline-block max-w-[150px] truncate text-sm">
            {lastBotMessage.length > 0
              ? lastBotMessage.slice(0, 30) + "..."
              : "Need help?"}
          </span>
        </button>
      )}
    </div>
  );
};

export default ChatBotWidget;
