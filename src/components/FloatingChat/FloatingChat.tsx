import React, { useState, useRef, useEffect } from 'react';
import { io } from "socket.io-client";
import { MessageOutlined, SendOutlined, CloseOutlined, RobotOutlined } from '@ant-design/icons';
import AppInput from '../common/AppInput';
import AppButton from '../common/AppButton';
import { Card } from 'antd';
import { getActiveChat, sendMessage } from '../../services/chatService';
import type { IMessage } from '../../services/chatService';
import { BASE_URL } from '../../services/productService';

const FloatingChat: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [guestId, setGuestId] = useState<string>('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const socketRef = useRef<any>(null);
    const chatIdRef = useRef<string | null>(null);

    // Initialize Guest ID and load chat
    useEffect(() => {
        let storedId = localStorage.getItem('guest_chat_id');
        if (!storedId) {
            storedId = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            localStorage.setItem('guest_chat_id', storedId);
        }
        setGuestId(storedId);
        fetchChat(storedId);

        // Socket connection
        socketRef.current = io(BASE_URL);

        socketRef.current.on("connect", () => {
            console.log("Connected to socket");
            // Identify self for presence
            if (storedId) {
                socketRef.current.emit("identify", { guestId: storedId });
            }

            // Re-join if we have a chat ID
            if (chatIdRef.current) {
                socketRef.current.emit("join_chat", chatIdRef.current);
            }
        });

        socketRef.current.on("message_received", (newMsg: IMessage) => {
            console.log("FloatingChat received message:", newMsg);
            setMessages(prev => {
                // Prevent duplicate messages if any (simple check)
                const exists = prev.some(m => m.createdAt === newMsg.createdAt && m.text === newMsg.text);
                if (exists) return prev;

                if (newMsg.sender === 'admin') {
                    return [...prev, newMsg];
                }
                // If it's user message, we might have already added it optimistically
                return prev;
            });
        });

        return () => {
            if (socketRef.current) socketRef.current.disconnect();
        };
    }, []);

    const fetchChat = async (id: string) => {
        try {
            const chat = await getActiveChat(undefined, id);
            if (chat) {
                if (chat.messages) setMessages(chat.messages);
                if (chat._id) {
                    chatIdRef.current = chat._id;
                    if (socketRef.current && socketRef.current.connected) {
                        socketRef.current.emit("join_chat", chat._id);
                    }
                }
            }
        } catch (error) {
            console.error("Failed to fetch chat", error);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const toggleChat = () => setIsOpen(!isOpen);

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const textToSend = inputValue;
        setInputValue(''); // Clear immediately for UX

        // Optimistic UI update
        const tempMsg: IMessage = { sender: 'user', text: textToSend, createdAt: new Date().toISOString() };
        setMessages(prev => [...prev, tempMsg]);

        try {
            const updatedChat = await sendMessage(textToSend, undefined, guestId);
            if (updatedChat) {
                // IMPORTANT: If this is a new chat (or checking generally), join the room now!
                if (updatedChat._id && updatedChat._id !== chatIdRef.current) {
                    chatIdRef.current = updatedChat._id;
                    if (socketRef.current) {
                        socketRef.current.emit("join_chat", updatedChat._id);
                    }
                }

                // We don't necessarily overwrite messages here to avoid jumping if optimistic update is fine.
                // But for the FIRST message, we might want to sync.
                if (messages.length === 0) {
                    setMessages(updatedChat.messages);
                }

                // Or if we want to ensure we have the server timestamp:
                // setMessages(updatedChat.messages); // This might cause a flicker or scroll jump
            }
        } catch (error) {
            console.error("Failed to send message", error);
            // Optionally remove the temp message or show error
        }
    };

    return (
        <div className="fixed bottom-16 right-6 md:right-8 md:bottom-8 z-50 flex flex-col items-end gap-4">
            {isOpen && (
                <div className="">
                    <Card
                        className="w-80 shadow-2xl border-0 rounded-2xl overflow-hidden animate-fade-in-up"
                        bodyStyle={{ padding: 0 }}
                        title={
                            <div className="flex items-center gap-2 text-white!">
                                <RobotOutlined />
                                <span>Chat Support</span>
                            </div>
                        }
                        headStyle={{ backgroundColor: '#7C3AED', border: 0, color: 'white' }}
                        extra={<AppButton type="text" icon={<CloseOutlined className="text-white! hover:text-white/80!" />} onClick={() => setIsOpen(false)} />}
                    >
                        <div className="h-85 flex flex-col">
                            {/* Messages Area */}
                            <div className="flex-1 overflow-y-auto p-4 bg-gray-50! flex flex-col gap-3">
                                {messages.length === 0 && (
                                    <div className="text-center text-gray-400 mt-10">
                                        <p>👋 Hi there! How can we help?</p>
                                    </div>
                                )}
                                {messages.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-[80%] rounded-xl px-3 py-2 text-sm break-all whitespace-pre-wrap ${msg.sender === 'user'
                                                ? 'bg-violet-500 text-white rounded-br-none'
                                                : 'bg-white border border-gray-200 text-gray-700 rounded-bl-none shadow-sm'
                                                }`}
                                        >
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <div className="p-3! bg-white! border-t border-gray-100!">
                                <AppInput
                                    className="w-full!"
                                    placeholder="Type a message..."
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onPressEnter={handleSend}
                                    suffix={
                                        <AppButton
                                            type="text"
                                            icon={<SendOutlined className="text-violet-500!" />}
                                            onClick={handleSend}
                                            size="small"
                                        />
                                    }
                                />
                            </div>
                        </div>
                    </Card>
                </div>
            )}

            <div className="relative">
                {!isOpen && (
                    <span className="absolute inset-0 rounded-full bg-violet-600/50 animate-ping"></span>
                )}
                <AppButton
                    type="primary"
                    shape="circle"
                    size="large"
                    className="relative z-10 h-14! w-14! shadow-lg bg-violet-600! hover:bg-violet-700! border-none! flex items-center justify-center text-xl!"
                    onClick={toggleChat}
                    icon={isOpen ? <CloseOutlined className="text-white! text-2xl!" /> : <MessageOutlined className="text-white! text-2xl!" />}
                />
            </div>
        </div>
    );
};

export default FloatingChat;
