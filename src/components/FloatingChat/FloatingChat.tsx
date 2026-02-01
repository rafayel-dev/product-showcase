import React, { useState, useRef, useEffect } from 'react';
import { io } from "socket.io-client";
import { MessageOutlined, SendOutlined, CloseOutlined, RobotOutlined } from '@ant-design/icons';
import AppInput from '../common/AppInput';
import AppButton from '../common/AppButton';
import { Card, Tooltip, Badge } from 'antd';
import { getActiveChat, sendMessage, markAdminMessagesAsRead } from '../../services/chatService';
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

    // Extend IMessage locally to include isRead
    interface LocalMessage extends IMessage {
        isRead?: boolean;
    }

    // Check for unread messages from admin
    const unreadCount = messages.filter((m: any) => m.sender === 'admin' && !m.isRead).length;

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

        socketRef.current.on("message_received", (newMsg: LocalMessage) => {
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

    // Mark admin messages as read when chat is opened - persist to backend
    useEffect(() => {
        if (isOpen && messages.some((m: any) => m.sender === 'admin' && !m.isRead) && chatIdRef.current) {
            // Mark locally
            setMessages(prev => prev.map((m: any) =>
                m.sender === 'admin' ? { ...m, isRead: true } : m
            ));
            // Persist to backend
            markAdminMessagesAsRead(chatIdRef.current).catch(err => {
                console.error("Failed to mark messages as read:", err);
            });
        }
    }, [isOpen]);

    const toggleChat = () => setIsOpen(!isOpen);

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const textToSend = inputValue;
        setInputValue(''); // Clear immediately for UX

        // Optimistic UI update
        const tempMsg: LocalMessage = { sender: 'user', text: textToSend, createdAt: new Date().toISOString() };
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

                if (messages.length === 0) {
                    setMessages(updatedChat.messages);
                }
            }
        } catch (error) {
            console.error("Failed to send message", error);
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

            <div className="relative group">
                {!isOpen && (
                    <span className="absolute inset-0 rounded-full bg-violet-600/50 animate-ping group-hover:animate-none" />
                )}

                <Tooltip
                    color="purple"
                    title={!isOpen && unreadCount > 0 ? "New Message!" : isOpen ? "" : "Chat Support"}
                    placement="left"
                    mouseEnterDelay={0.2}
                    mouseLeaveDelay={0.2}
                >
                    <AppButton
                        type="primary"
                        shape="circle"
                        size="large"
                        onClick={toggleChat}
                        icon={
                            isOpen ? (
                                <CloseOutlined className="text-white! text-2xl! transition-transform duration-200 group-hover:rotate-90" />
                            ) : (
                                <MessageOutlined className="text-white! text-2xl! transition-transform duration-200 group-hover:-rotate-12" />
                            )
                        }
                        className="
        relative z-10 
        h-14! w-14!
        bg-violet-600! border-none!
        flex items-center justify-center
        shadow-lg
        transition-all duration-300

        hover:bg-violet-700!
        hover:scale-110
        hover:shadow-2xl hover:shadow-violet-500/40
        active:scale-95
      "
                    >
                        <Badge
                            className="z-50! absolute! -top-2! -right-2!"
                            count={!isOpen ? unreadCount : 0}
                        />
                    </AppButton>
                </Tooltip>
            </div>


        </div>
    );
};


export default FloatingChat;
