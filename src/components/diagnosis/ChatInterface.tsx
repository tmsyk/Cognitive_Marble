'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, ArrowRight } from 'lucide-react';
import { useStore, CognitiveType } from '@/store/useStore';
import { questions } from '@/data/questions';

type Message = {
    id: string;
    text: string;
    sender: 'bot' | 'user';
    options?: { label: string; scores: Partial<Record<CognitiveType, number>> }[];
};

export default function ChatInterface() {
    const { setSelfScore, setPhase } = useStore();
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'intro',
            text: 'こんにちは。Cognitive Marbleへようこそ。まずはあなたの「思い込み（セルフイメージ）」を探るために、いくつか質問をさせてください。',
            sender: 'bot',
        },
        {
            id: 'q1',
            text: questions[0].text,
            sender: 'bot',
            options: questions[0].options,
        },
    ]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleOptionClick = async (option: { label: string; scores: Partial<Record<CognitiveType, number>> }) => {
        // 1. Add User Answer
        const userMsg: Message = {
            id: `ans-${Date.now()}`,
            text: option.label,
            sender: 'user',
        };
        setMessages((prev) => [...prev, userMsg]);

        // 2. Update Scores
        Object.entries(option.scores).forEach(([type, score]) => {
            // Correctly typed update using Store (accumulation logic would be in store or here)
            // Since store is setSelfScore, we need to accumulate.
            // But store setSelfScore is a direct setter. Let's fix this logic.
            // We need to READ current score to accumulate.
            const currentScore = useStore.getState().selfScores[type as CognitiveType];
            setSelfScore(type as CognitiveType, currentScore + (score as number));
        });

        // 3. Next Question or Finish
        const nextIndex = currentQuestionIndex + 1;

        if (nextIndex < questions.length) {
            setIsTyping(true);
            await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate thinking
            setIsTyping(false);

            const nextQ = questions[nextIndex];
            const botMsg: Message = {
                id: nextQ.id,
                text: nextQ.text,
                sender: 'bot',
                options: nextQ.options,
            };
            setMessages((prev) => [...prev, botMsg]);
            setCurrentQuestionIndex(nextIndex);
        } else {
            // Finish Phase 1
            setIsTyping(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setIsTyping(false);

            const finishMsg: Message = {
                id: 'finish',
                text: 'ありがとうございます。あなたの「好み」のデータが収集できました。次は、実際の「脳のスペック」を測る実技テスト（ミニゲーム）に移ります。',
                sender: 'bot',
            };
            setMessages((prev) => [...prev, finishMsg]);

            // Delay transition to let user read
            setTimeout(() => {
                // Show a "Go to Next Phase" button instead of auto transition?
                // For now, let's append a system message with a button
                setMessages(prev => [...prev, {
                    id: 'action-next',
                    text: '準備はいいですか？',
                    sender: 'bot',
                    options: [{ label: '実力チェックを開始する', scores: {} }] // Special handler needed
                }])
            }, 1000);
        }
    };

    // Special handler for the final button
    // We can modify handleOptionClick to detect 'action-next' or just use a conditional render in the message mapper.
    // For simplicity, let's just use the option click handler again but check index.

    return (
        <div className="flex flex-col h-screen max-w-2xl mx-auto bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden shadow-2xl">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <AnimatePresence>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[80%] p-3 rounded-2xl ${msg.sender === 'user'
                                    ? 'bg-blue-600 text-white rounded-br-none'
                                    : 'bg-zinc-800 text-gray-100 rounded-bl-none border border-white/5'
                                    }`}
                            >
                                {msg.sender === 'bot' && (
                                    <div className="flex items-center gap-2 mb-1 text-xs text-zinc-400">
                                        <Bot size={12} />
                                        <span>AI Assistant</span>
                                    </div>
                                )}
                                <p className="text-sm md:text-base leading-relaxed">{msg.text}</p>
                            </div>
                        </motion.div>
                    ))}
                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex justify-start"
                        >
                            <div className="bg-zinc-800 p-3 rounded-2xl rounded-bl-none border border-white/5 flex gap-1">
                                <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-zinc-900/80 border-t border-white/10">
                {/* Render Options if the last message is from bot and has options */}
                {messages.length > 0 &&
                    messages[messages.length - 1].sender === 'bot' &&
                    messages[messages.length - 1].options && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {messages[messages.length - 1].options!.map((opt, idx) => (
                                <motion.button
                                    key={idx}
                                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => {
                                        if (opt.label === '実力チェックを開始する') {
                                            setPhase('games');
                                        } else {
                                            handleOptionClick(opt);
                                        }
                                    }}
                                    className="p-3 text-left text-sm text-zinc-200 bg-zinc-800/50 hover:bg-zinc-700 rounded-lg border border-white/5 transition-colors flex justify-between items-center group"
                                >
                                    <span>{opt.label}</span>
                                    <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
                                </motion.button>
                            ))}
                        </div>
                    )}
            </div>
        </div>
    );
}
