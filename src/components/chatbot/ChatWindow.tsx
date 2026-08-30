import React, { useState } from 'react';
import { MessageSquare, Send, Sparkles, User, Bot, Volume2, HelpCircle, Camera, Image as ImageIcon, X } from 'lucide-react';
import { ChatMessage } from '../../types';
import { askAIChatbot } from '../../services/geminiService';
import { useSpeech } from '../../hooks/useSpeech';
import { DisclaimerBanner } from '../common/DisclaimerBanner';

export const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: 'Hello! I am your MEDISCAN AI Clinical Assistant. How can I assist you with your medications, food interactions, or missed doses today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { speak } = useSpeech();

  const presets = [
    'Can I take this medicine after food?',
    "I missed yesterday's dose.",
    'Can I take these two medicines together?',
    'What happens if I skip one dose?',
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() && !selectedImage) return;

    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: query || 'Analyze this medicine image.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      imageUrl: selectedImage || undefined,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    const currentImage = selectedImage;
    setSelectedImage(null);
    setLoading(true);

    try {
      const aiReplyText = await askAIChatbot(query || 'Analyze this medicine image.', messages, currentImage || undefined);
      const aiMsg: ChatMessage = {
        id: 'ai-' + Date.now(),
        sender: 'ai',
        text: aiReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-8 px-4 sm:px-6">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-wider">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Gemini AI Pharmacist</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          AI Clinical Assistant
        </h1>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Ask direct questions about dosages, food administration, side effects, or missed doses.
        </p>
      </div>

      <DisclaimerBanner compact />

      {/* Main Chat Container */}
      <div className="glass-card rounded-3xl p-6 border border-white/60 dark:border-slate-700/60 shadow-xl flex flex-col h-[540px]">
        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-9 h-9 rounded-2xl flex items-center justify-center font-bold text-white text-xs shadow-md ${
                  msg.sender === 'user' ? 'bg-brand-500' : 'bg-gradient-to-tr from-emeraldBrand-500 to-emerald-600'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[80%] p-4 rounded-2xl text-xs leading-relaxed space-y-1 ${
                  msg.sender === 'user'
                    ? 'bg-brand-500 text-white font-medium rounded-tr-none'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700/60 rounded-tl-none'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-bold text-[10px] uppercase opacity-75">
                    {msg.sender === 'user' ? 'You' : 'MEDISCAN AI'}
                  </span>
                  {msg.sender === 'ai' && (
                    <button
                      onClick={() => speak(msg.text)}
                      className="text-slate-400 hover:text-brand-500 transition-colors"
                      title="Read aloud"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                {msg.imageUrl && (
                  <img src={msg.imageUrl} alt="Uploaded medicine" className="max-w-full h-auto rounded-xl mb-2 border border-white/20" />
                )}
                <div className="whitespace-pre-line">{msg.text}</div>
                <span className="text-[9px] opacity-60 block text-right">{msg.timestamp}</span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3 text-xs text-brand-500 font-semibold animate-pulse">
              <Bot className="w-5 h-5" />
              <span>Consulting Gemini AI Pharmacist...</span>
            </div>
          )}
        </div>

        {/* Preset Prompt Suggestions */}
        <div className="pt-4 border-t border-slate-200/60 dark:border-slate-700/60 flex flex-wrap gap-2">
          {presets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(preset)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-brand-500/10 hover:text-brand-500 text-[11px] text-slate-600 dark:text-slate-300 font-medium transition-colors border border-slate-200/50 dark:border-slate-700/50"
            >
              💡 {preset}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="pt-3">
          {selectedImage && (
            <div className="mb-3 relative inline-block">
              <img src={selectedImage} alt="Preview" className="h-16 w-16 object-cover rounded-xl border-2 border-brand-500 shadow-md" />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-2 -right-2 bg-slate-900 text-white rounded-full p-1 shadow-lg hover:bg-rose-500 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
          <div className="flex gap-2 items-center">
            <input
              type="file"
              accept="image/*"
              id="chat-image-upload"
              className="hidden"
              onChange={handleImageUpload}
            />
            <label
              htmlFor="chat-image-upload"
              className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-brand-500 hover:bg-brand-50 cursor-pointer transition-colors"
              title="Upload medicine photo"
            >
              <Camera className="w-5 h-5" />
            </label>
            <input
              type="text"
              placeholder="Ask anything or upload a medicine photo..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-xs outline-none focus:ring-2 focus:ring-brand-500"
            />
            <button
              onClick={() => handleSend()}
              disabled={loading || (!input.trim() && !selectedImage)}
              className="px-5 py-3 rounded-2xl gradient-bg-primary text-xs font-bold flex items-center gap-1.5 shadow-md disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
