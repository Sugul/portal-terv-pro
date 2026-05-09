import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Message = {
  id: string;
  text: string;
  sender: 'bot' | 'user';
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "Hi there! I'm your TERV PRO assistant. I can help you with event registrations, cancellations, and general queries.", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  
  // 0: IDLE, 1: WAITING_FOR_EVENT_NAME, 2: WAITING_FOR_REASON, 3: DONE
  const [cancellationStep, setCancellationStep] = useState(0); 
  const [eventToCancel, setEventToCancel] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue.trim();
    const newUserMsg: Message = { id: Date.now().toString(), text: userText, sender: 'user' };
    
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');

    // Process Bot Response after a small delay
    setTimeout(() => {
      processBotResponse(userText);
    }, 600);
  };

  const processBotResponse = (userText: string) => {
    const textLower = userText.toLowerCase();
    let botResponse = "I'm sorry, I didn't quite catch that. You can ask me to 'cancel an event' if you need help with that.";

    if (cancellationStep === 0) {
      if (textLower.includes('cancel')) {
        botResponse = "Sure, I can help you cancel your event registration. Which event would you like to cancel? Please provide the name.";
        setCancellationStep(1);
      } else if (textLower.includes('hello') || textLower.includes('hi')) {
        botResponse = "Hello! How can I assist you today?";
      }
    } 
    else if (cancellationStep === 1) {
      setEventToCancel(userText);
      botResponse = `Got it. Could you please provide a brief reason for cancelling your registration for "${userText}"?`;
      setCancellationStep(2);
    }
    else if (cancellationStep === 2) {
      botResponse = `Thank you for letting us know. Your cancellation request for "${eventToCancel}" due to "${userText}" has been officially approved. Is there anything else I can assist you with?`;
      setCancellationStep(3);
    }
    else if (cancellationStep === 3) {
      if (textLower.includes('no') || textLower.includes('thanks')) {
        botResponse = "You're welcome! Have a great day.";
        setCancellationStep(0); // Reset
      } else {
        botResponse = "I'm currently focused on cancellations, but you can always reach out to support for more help!";
      }
    }

    setMessages(prev => [...prev, { id: Date.now().toString(), text: botResponse, sender: 'bot' }]);
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-[100] w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-primary/90 transition-colors ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageCircle size={28} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-[100] w-full max-w-[380px] h-[550px] max-h-[80vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-outline-variant"
          >
            {/* Header */}
            <div className="bg-primary p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-bold">TERV PRO Support</h3>
                  <p className="text-xs text-white/80 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full inline-block"></span> Online
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface-container-lowest">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex items-end gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'bg-secondary text-white' : 'bg-surface-container-high text-primary'}`}>
                    {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div 
                    className={`max-w-[75%] p-3 rounded-2xl text-sm ${
                      msg.sender === 'user' 
                        ? 'bg-secondary text-white rounded-br-none' 
                        : 'bg-surface-container-low border border-outline-variant text-on-surface rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 bg-white border-t border-outline-variant flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-3 rounded-xl border border-outline-variant focus:ring-2 focus:ring-primary outline-none bg-surface-container-lowest text-sm"
              />
              <button 
                type="submit"
                disabled={!inputValue.trim()}
                className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
