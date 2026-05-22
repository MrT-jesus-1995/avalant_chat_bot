import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUp,
  BarChart3,
  Bot,
  ImagePlus,
  LayoutDashboard,
  Maximize2,
  MessageSquare,
  Minimize2,
  Sparkles,
  X,
} from 'lucide-react';

const THEME = {
  primary: '#22c55e',
  secondary: '#16a34a',
  success: '#22c55e',
  background: '#f3f8f5',
  panel: '#ffffff',
  border: '#e5e7eb',
  text: '#1f2937',
  muted: '#6b7280',
  hover: '#f3f4f6',
};

const SUGGESTIONS = [
  { label: 'About Avalant', prompt: 'What can you tell me about Avalant?', icon: Sparkles },
  { label: 'Dashboard insights', prompt: 'Show me dashboard insights', icon: BarChart3 },
  { label: 'Add an image', prompt: 'How do I add an image?', icon: ImagePlus },
];

const FALLBACK_RESPONSES = {
  'what can you tell me about avalant?':
    'Avalant is an enterprise technology company focused on digital platforms, AI, software solutions, and low-code workflows for modern organizations.',
  'show me dashboard insights':
    'Your dashboard is ready: assistant activity is online, image actions are synced, and local RAG can answer Avalant questions when the service is available.',
  'how do i add an image?':
    'Type an image name such as cat or dog. If the image exists in the local images folder, it will be added to the gallery.',
  'avalant ตั้งอยู่ที่ไหน':
    'Avalant ตั้งอยู่ที่ 20 อาคารบุปผจิต ชั้น 15 ถนนสาทรเหนือ แขวงสีลม เขตบางรัก กรุงเทพมหานคร 10500 ค่ะ',
};

const formatTime = () =>
  new Intl.DateTimeFormat([], {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date());

function resolveFallback(question, reply = '') {
  const exact = FALLBACK_RESPONSES[question.toLowerCase()];
  if (exact) return exact;

  const normalized = question.toLowerCase().replace(/\s+/g, '');
  const replyLooksEmpty = !reply || reply.includes('ไม่มีข้อมูล') || reply.toLowerCase().includes('no information');
  const isAvalantQuestion =
    normalized.includes('avalant') || normalized.includes('อวาลันท์') || normalized.includes('อวาแลนท์');

  if (!replyLooksEmpty || !isAvalantQuestion) return '';

  if (
    normalized.includes('อยู่ที่ไหน') ||
    normalized.includes('ที่อยู่') ||
    normalized.includes('location') ||
    normalized.includes('address') ||
    normalized.includes('office')
  ) {
    return FALLBACK_RESPONSES['avalant ตั้งอยู่ที่ไหน'];
  }

  return FALLBACK_RESPONSES['what can you tell me about avalant?'];
}

function AssistantAvatar() {
  return (
    <div className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full border border-[#e5e7eb] bg-white shadow-[0_1px_2px_rgba(15,23,42,.06)]">
      <img src="/images/avalant-logo-green.png" alt="" className="h-8 w-8 object-contain" />
    </div>
  );
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      className="flex justify-start"
    >
      <div className="flex items-center gap-1.5 rounded-[18px] bg-[#f3f4f6] px-4 py-3 shadow-[0_1px_2px_rgba(15,23,42,.04)]">
        {[0, 1, 2].map(index => (
          <motion.span
            key={index}
            className="h-2 w-2 rounded-full bg-[#9ca3af]"
            animate={{ y: [0, -4, 0], opacity: [0.45, 1, 0.45] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: index * 0.14 }}
          />
        ))}
      </div>
    </motion.div>
  );
}

function MessageBubble({ message }) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`max-w-[82%] ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
        <div
          className={`rounded-[18px] px-4 py-3 text-sm leading-6 shadow-[0_1px_2px_rgba(15,23,42,.04)] ${
            isUser ? 'bg-[#22c55e] text-white' : 'bg-[#f3f4f6] text-[#1f2937]'
          }`}
        >
          {message.text}
        </div>
        <span className="mt-1 px-1 text-[11px] text-[#9ca3af]">{message.time}</span>
      </div>
    </motion.div>
  );
}

function SuggestionChips({ onSelect, disabled }) {
  return (
    <div className="flex gap-2 overflow-x-auto px-5 pb-1 pt-4">
      {SUGGESTIONS.map(({ label, prompt, icon: Icon }) => (
        <motion.button
          key={label}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(prompt)}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex h-9 shrink-0 items-center gap-2 rounded-[30px] border border-[#e5e7eb] bg-white px-3 text-xs font-medium text-[#1f2937] transition hover:bg-[#f3f4f6] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Icon size={14} />
          {label}
        </motion.button>
      ))}
    </div>
  );
}

function ChatPanel({ apiEndpoint = '/chat', onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Hi, I am your AI Assistant. Ask me about Avalant, dashboard insights, or adding an image.',
      time: formatTime(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const canSend = useMemo(() => inputValue.trim().length > 0 && !isSending, [inputValue, isSending]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    const id = window.setTimeout(() => inputRef.current?.focus(), 180);
    return () => window.clearTimeout(id);
  }, []);

  const requestReply = async messageText => {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 7000);

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageText }),
        signal: controller.signal,
      });

      if (!response.ok) throw new Error('Chat request failed');

      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const json = await response.json();
        return json.response || json.text || json.message || json.output || '';
      }

      return response.text();
    } finally {
      window.clearTimeout(timeoutId);
    }
  };

  const sendMessage = async rawText => {
    const text = rawText.trim();
    if (!text || isSending) return;

    setMessages(current => [...current, { id: `user-${Date.now()}`, role: 'user', text, time: formatTime() }]);
    setInputValue('');
    setIsTyping(true);
    setIsSending(true);

    try {
      const reply = await requestReply(text);
      const fallback = resolveFallback(text, reply);
      setMessages(current => [
        ...current,
        {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          text: fallback || reply || 'I am ready to help with the next question.',
          time: formatTime(),
        },
      ]);
    } catch {
      setMessages(current => [
        ...current,
        {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          text: resolveFallback(text) || 'I could not reach the assistant service. Please try again.',
          time: formatTime(),
        },
      ]);
    } finally {
      setIsTyping(false);
      setIsSending(false);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (canSend) sendMessage(inputValue);
  };

  return (
    <motion.section
      layout
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 18, scale: 0.96 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      aria-label="AI Assistant chat window"
      className={`fixed bottom-24 right-6 z-50 flex max-h-[calc(100vh-112px)] flex-col overflow-hidden rounded-[24px] border border-[#e5e7eb] bg-white shadow-[0_20px_60px_rgba(15,23,42,.14),0_2px_10px_rgba(0,0,0,.08)] ${
        isExpanded
          ? 'left-6 top-6 h-auto w-auto'
          : 'h-[min(720px,calc(100vh-128px))] w-[380px] max-w-[calc(100vw-32px)]'
      }`}
    >
      <header className="flex h-[68px] shrink-0 items-center justify-between border-b border-[#e5e7eb] bg-white px-5">
        <div className="flex min-w-0 items-center gap-3">
          <AssistantAvatar />
          <div className="min-w-0">
            <h2 className="truncate text-[15px] font-medium text-[#1f2937]">AI Assistant</h2>
            <div className="mt-1 flex items-center gap-2 text-xs text-[#6b7280]">
              <span className="h-2 w-2 rounded-full bg-[#22c55e] shadow-[0_0_0_3px_rgba(34,197,94,.14)]" />
              <span>{isTyping ? 'Typing' : 'Online'}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIsExpanded(value => !value)}
            aria-label={isExpanded ? 'Restore chat size' : 'Expand chat'}
            className="grid h-9 w-9 place-items-center rounded-full text-[#6b7280] transition hover:bg-[#f3f4f6] hover:text-[#1f2937]"
          >
            {isExpanded ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close chat"
            className="grid h-9 w-9 place-items-center rounded-full text-[#6b7280] transition hover:bg-[#f3f4f6] hover:text-[#1f2937]"
          >
            <X size={18} />
          </button>
        </div>
      </header>

      <div ref={scrollRef} role="log" aria-live="polite" className="flex-1 space-y-4 overflow-y-auto bg-[#f3f8f5] px-5 py-5">
        {messages.map(message => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <AnimatePresence>{isTyping && <TypingIndicator />}</AnimatePresence>
      </div>

      <div className="shrink-0 bg-white">
        <SuggestionChips onSelect={sendMessage} disabled={isSending} />
        <form onSubmit={handleSubmit} className="flex items-center gap-2 px-5 pb-5 pt-3">
          <label htmlFor="ai-assistant-input" className="sr-only">
            Type your message
          </label>
          <div className="flex min-h-12 flex-1 items-center gap-2 rounded-[30px] border border-[#e5e7eb] bg-white px-4 shadow-[0_1px_2px_rgba(15,23,42,.04)] transition focus-within:border-[#16a34a] focus-within:ring-4 focus-within:ring-[#22c55e]/10">
            <input
              ref={inputRef}
              id="ai-assistant-input"
              value={inputValue}
              onChange={event => setInputValue(event.target.value)}
              placeholder="Type a question..."
              className="min-w-0 flex-1 bg-transparent text-sm text-[#1f2937] outline-none placeholder:text-[#9ca3af]"
            />
            <motion.button
              type="submit"
              disabled={!canSend}
              whileHover={canSend ? { scale: 1.04 } : undefined}
              whileTap={canSend ? { scale: 0.96 } : undefined}
              className="grid h-9 w-9 place-items-center rounded-full bg-[#22c55e] text-white transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-45"
              aria-label="Send message"
            >
              <ArrowUp size={17} strokeWidth={2.3} />
            </motion.button>
          </div>
        </form>
      </div>
    </motion.section>
  );
}

function DashboardShell({ children }) {
  return (
    <div className="min-h-screen bg-[#f3f8f5] font-['Roboto','Inter',sans-serif] text-[#1f2937]">
      <aside className="fixed left-0 top-0 hidden h-full w-64 border-r border-[#e5e7eb] bg-white px-5 py-6 lg:block">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl border border-[#e5e7eb] bg-white">
            <img src="/images/avalant-logo-green.png" alt="Avalant" className="h-7 w-7 object-contain" />
          </div>
          <div>
            <div className="text-sm font-semibold">AutomationX</div>
            <div className="text-xs text-[#6b7280]">AI Workspace</div>
          </div>
        </div>

        <nav className="mt-8 grid gap-1">
          {[
            ['Dashboard', LayoutDashboard],
            ['Assistant', MessageSquare],
            ['Insights', BarChart3],
          ].map(([label, Icon], index) => (
            <button
              key={label}
              type="button"
              className={`flex h-10 items-center gap-3 rounded-2xl px-3 text-sm transition ${
                index === 0 ? 'bg-[#dcfce7] text-[#22c55e]' : 'text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#1f2937]'
              }`}
            >
              <Icon size={17} />
              {label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="px-4 py-5 lg:ml-64 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-2xl font-semibold tracking-normal text-[#1f2937]">Enterprise AI Dashboard</h1>
              <p className="mt-1 text-sm text-[#6b7280]">A calm workspace for AI assistance, image actions, and operational insights.</p>
            </div>
            <div className="inline-flex h-10 items-center gap-2 rounded-[30px] border border-[#e5e7eb] bg-white px-4 text-sm text-[#1f2937]">
              <span className="h-2 w-2 rounded-full bg-[#22c55e]" />
              Assistant online
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              ['Images loaded', '0', 'Synced with chat commands'],
              ['RAG status', 'Ready', 'Local answers when available'],
              ['Workspace', 'AI', 'Embedded enterprise copilot'],
            ].map(([label, value, note]) => (
              <section key={label} className="rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,.04)]">
                <div className="text-sm text-[#6b7280]">{label}</div>
                <div className="mt-3 text-2xl font-semibold text-[#1f2937]">{value}</div>
                <div className="mt-2 text-xs text-[#22c55e]">{note}</div>
              </section>
            ))}
          </div>

          <section className="mt-5 rounded-2xl border border-[#e5e7eb] bg-white p-8 text-center shadow-[0_1px_2px_rgba(15,23,42,.04)]">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#dcfce7] text-[#22c55e]">
              <Bot size={24} />
            </div>
            <h2 className="mt-4 text-lg font-medium text-[#1f2937]">AI assistant is ready</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#6b7280]">
              Open the floating assistant to ask Avalant questions, inspect dashboard context, or add image assets.
            </p>
          </section>
        </div>
      </main>

      {children}
    </div>
  );
}

export function ChatWidget({ apiEndpoint = '/chat', withDashboard = false }) {
  const [isOpen, setIsOpen] = useState(false);

  const widget = (
    <>
      <AnimatePresence>
        {isOpen && <ChatPanel apiEndpoint={apiEndpoint} onClose={() => setIsOpen(false)} />}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-label={isOpen ? 'Close AI Assistant' : 'Open AI Assistant'}
        aria-expanded={isOpen}
        onClick={() => setIsOpen(open => !open)}
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.96 }}
        className="fixed bottom-6 right-6 z-50 grid h-[62px] w-[62px] place-items-center rounded-full border border-[#e5e7eb] bg-white text-[#22c55e] shadow-[0_18px_44px_rgba(34,197,94,.28),0_2px_10px_rgba(0,0,0,.14)] transition hover:brightness-95 focus:outline-none focus:ring-4 focus:ring-[#22c55e]/20"
      >
        {isOpen ? <X size={23} /> : <img src="/images/avalant-logo-green.png" alt="" className="h-9 w-9 object-contain" />}
      </motion.button>
    </>
  );

  if (withDashboard) {
    return <DashboardShell>{widget}</DashboardShell>;
  }

  return <div className="font-['Roboto','Inter',sans-serif]">{widget}</div>;
}

export default ChatWidget;

