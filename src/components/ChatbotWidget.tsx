import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

const quickOptions = [
  "Get a price quote",
  "Track my shipment",
  "Services available",
  "Talk to support",
];

interface Message {
  from: "bot" | "user";
  text: string;
}

const botReplies: Record<string, string> = {
  "Get a price quote": "I'd love to help! Please use our Price Estimator above, or share your pickup city, drop city, and service type and I'll get you a range.",
  "Track my shipment": "Please share your tracking ID and I'll look it up for you right away! 📦",
  "Services available": "We offer House Shifting, Office Relocation, Vehicle Transport, Warehouse Storage, Packing & Moving, and International Moving. Which one interests you?",
  "Talk to support": "Connecting you to our support team... In the meantime, you can call us at 1800-123-456 (toll-free) or email hello@goshift.in 📞",
};

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Hi! 👋 I'm GoShift's assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = (text: string) => {
    const userMsg: Message = { from: "user", text };
    const reply = botReplies[text] || "Thanks for reaching out! Our team will get back to you shortly. Meanwhile, feel free to call us at 1800-123-456.";
    setMessages((prev) => [...prev, userMsg, { from: "bot", text: reply }]);
    setInput("");
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent-gradient shadow-glow transition-transform hover:scale-110 animate-pulse_glow"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-accent-foreground" />
        ) : (
          <MessageCircle className="h-6 w-6 text-accent-foreground" />
        )}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] rounded-2xl bg-card shadow-elevated border border-border/50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-hero p-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-gradient">
                <Bot className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm font-bold text-primary-foreground">GoShift Support</p>
                <p className="text-xs text-primary-foreground/50">Usually replies instantly</p>
              </div>
            </div>

            {/* Messages */}
            <div className="h-72 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2 ${msg.from === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div className={`h-7 w-7 shrink-0 rounded-full flex items-center justify-center ${
                    msg.from === "bot" ? "bg-accent/10" : "bg-secondary"
                  }`}>
                    {msg.from === "bot" ? (
                      <Bot className="h-3.5 w-3.5 text-accent" />
                    ) : (
                      <User className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                  </div>
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.from === "bot"
                        ? "bg-secondary text-foreground rounded-tl-md"
                        : "bg-accent-gradient text-accent-foreground rounded-tr-md"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick options */}
            {messages.length <= 2 && (
              <div className="px-4 pb-3 flex flex-wrap gap-2">
                {quickOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => sendMessage(opt)}
                    className="rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="border-t border-border p-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (input.trim()) sendMessage(input.trim());
                }}
                className="flex gap-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 rounded-xl border border-border bg-secondary/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/30"
                />
                <button
                  type="submit"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-gradient text-accent-foreground transition-transform hover:scale-105"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
