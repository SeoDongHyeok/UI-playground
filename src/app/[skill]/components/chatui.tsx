"use client"

import React, { useEffect, useState } from "react";
import { motion } from 'motion/react';
import { useRef } from "react";

export type Emoji = {
    name: string;
    symbol: string;
};

export const emojiList: Emoji[] = [
    { name: "smile", symbol: "😄" },
    { name: "laugh", symbol: "😂" },
    { name: "wink", symbol: "😉" },
    { name: "heart", symbol: "❤️" },
    { name: "thumbs_up", symbol: "👍" },
    { name: "cry", symbol: "😢" },
    { name: "angry", symbol: "😠" },
    { name: "surprised", symbol: "😲" },
];

type NewChatingProps = {
    chatText: string;
    participant: "me" | "other";
};


function NewChating({ chatText, participant }: NewChatingProps) {
    const isMe = participant === "me";

    return (
        <div className={
            `flex my-3 w-full
            ${isMe ? "justify-end" : "justify-start"}`
        }>
            <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                className={
                    `px-4 py-2 rounded-2xl max-w-48 min-w-[54px] w-auto min-h-[40px] h-auto relative 
                    ${isMe ? "mr-2 bg-blue-500 text-white" : "ml-4 bg-[#EBECEF] text-black"}`
                }>
                {chatText !== "__TYPING__" ? chatText :
                    [0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            animate={{ top: ['50%', '25%', '50%'] }}
                            transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                repeatDelay: 0.9,
                                delay: i * 0.6
                            }}
                            className={`
                                absolute w-2 h-2 rounded-full transform -translate-y-1/2 z-10
                                ${isMe ? "bg-white" : "bg-[black]"}
                                `}
                            style={{ left: `${10 + i * 13}px` }}
                        />
                    ))
                }
                <div
                    className={`
                    absolute top-3 w-3 h-3 transform rotate-45
                    ${isMe ? "bg-blue-500 -right-1" : "bg-[#EBECEF] -left-1"}
                `}></div>
            </motion.div >
        </div>
    );
}

export default function ChatUI() {
    const [messages, setMessages] = useState<NewChatingProps[]>([]);
    const messageArea = useRef<HTMLDivElement | null>(null);
    const messageInput = useRef<HTMLInputElement | null>(null);
    const [messageWriting, setMessageWriting] = useState(false);
    const keyboardArea = useRef<HTMLDivElement | null>(null);

    // 키보드+input영역을 제외한 부분을 클릭시 키보드 닫기
    useEffect(() => {
        function clickKeybordOutside(event: MouseEvent) {
            if (keyboardArea.current && !keyboardArea.current.contains(event.target as Node)) {
                setMessageWriting(false);
            }
        }
        if (messageWriting)
            setMessages((prev) => [...prev, { chatText: "__TYPING__", participant: "me" as "me" }])
        else {
            setMessages((prev) => [...prev.filter(msg => msg.chatText !== "__TYPING__")]);
        }

        document.addEventListener("mousedown", clickKeybordOutside);
        return () => {
            document.removeEventListener("mousedown", clickKeybordOutside);
        };
    }, [messageWriting]);

    // 메시지들을 주고받을때 스크롤의 위치 계속 아래로
    useEffect(() => {
        const area = messageArea.current;
        if (area) {
            area.scrollTop = area.scrollHeight;
        }
    }, [messages]);


    // 이모지 선택
    function clickEmoji(emoji: string) {
        const input = messageInput.current;

        if (!input) return;

        input.value += emoji;

        input.focus();
    }

    function sendMessage() {
        const inputCurrent = messageInput.current;
        if (!inputCurrent?.value) return;

        const newMsg: NewChatingProps = {
            chatText: inputCurrent.value,
            participant: "me"
        };

        setMessages((prev) => [...prev, newMsg]);

        inputCurrent.value = "";
        setMessageWriting(false);

        setTimeout(() => {
            setMessages((prev) => {
                const typingIndex = prev.findIndex(msg => msg.chatText === "__TYPING__");

                if (typingIndex !== -1) {
                    const newMessages = [...prev];
                    newMessages[typingIndex] = { chatText: "답변", participant: "other" };
                    newMessages.push({ chatText: "__TYPING__", participant: "me" })
                    return newMessages;
                } else {
                    return [
                        ...prev,
                        { chatText: "답변", participant: "other" }
                    ];
                }
            });
        }, 2000);

    }

    return (
        <div className="flex items-center justify-center w-full h-screen">
            {/* Device body */}
            <div className={`w-80 h-[42rem] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3.5rem] p-2 shadow-2xl relative`}>
                {/* Camera bump */}
                <div className="absolute top-4 left-4 w-16 h-16 bg-black/20 rounded-2xl"></div>

                {/* Screen */}
                <div className="w-full h-full bg-black rounded-[3rem] p-2">
                    <div className="w-full h-full bg-white relative overflow-hidden rounded-[3rem]">
                        <div className="bg-[#F5F5F5] w-full h-32 border-b-1 border-b-[#D8D8D9]">
                            {/* Status Bar */}
                            <div className="w-full h-11">
                                <div className="flex justify-between items-center px-6 py-2 text-black">
                                    <div className="absolute top-4 left-5.5 items-center space-x-1">
                                        <span className="text-sm font-medium font-semibold">
                                            {new Date().toLocaleTimeString("ko-KR", {
                                                timeZone: "Asia/Seoul",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </span>
                                    </div>

                                    {/* 카메라 */}
                                    <div className="flex items-center justify-end absolute top-4 left-1/2 transform -translate-x-1/2 w-22 h-6 bg-black rounded-full z-10">
                                        <div className="h-3 w-3 mr-2 rounded-full bg-[radial-gradient(circle,rgba(16,102,110,1)_0%,rgba(18,23,67,1)_19%)]">
                                        </div>
                                    </div>

                                    <div className="flex absolute top-5 right-4 items-center space-x-1">
                                        {/* Signal bars */}
                                        <div className="flex space-x-1">
                                            <div className="w-0.5 h-3 bg-black rounded-full"></div>
                                            <div className="w-0.5 h-3 bg-black rounded-full"></div>
                                            <div className="w-0.5 h-3 bg-black rounded-full"></div>
                                            <div className="w-0.5 h-3 bg-black rounded-full"></div>
                                        </div>

                                        {/* WiFi icon */}
                                        <svg className="w-4 h-4 fill-black" viewBox="0 0 24 24">
                                            <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.07 2.93 1 9zm8 8l3 3 3-3c-1.65-1.65-4.34-1.65-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
                                        </svg>

                                        {/* Battery */}
                                        <div className="flex items-center">
                                            <div className="flex items-center justify-center w-6 h-3 border border-black rounded-sm">
                                                <div className="w-5 h-2 bg-black rounded-[3px]"></div>
                                            </div>
                                            <div className="w-1 h-2 bg-black rounded-r-sm ml-0.5"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* 메시지방 상단 */}
                            <div className="flex w-full h-21 items-center justify-between">
                                {/* 뒤로가기 아이콘 */}
                                <div className="w-[40px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 -ml-0.5 text-[#007AFF]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6l-4 4 4 4" />
                                    </svg>
                                </div>

                                {/* 상대 프로필 */}
                                <div className="justify-items-center">
                                    <svg width="50" height="50" viewBox="0 0 64 64" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="32" cy="32" r="28" fill="#FFFFFF" />
                                        <g transform="translate(0,2)" fill="#6B7280">
                                            <circle cx="32" cy="20" r="9" />
                                            <path d="M16 46c0-8.837 7.163-16 16-16s16 7.163 16 16v2H16v-2z" />
                                        </g>
                                    </svg>
                                    <p className="text-[12px] font-bold">Unknown AI</p>
                                </div>

                                {/* 비디오 아이콘 */}
                                <div className="w-[40px]">
                                    <svg className="w-8.5 h-8.5 text-[#007AFF]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <rect x="3" y="7" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
                                        <path d="M15 9.5L20 7v10l-5-2.5V9.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col w-full h-120">
                            {/* 메시지 영역 */}
                            <div
                                ref={messageArea}
                                className="flex-1 w-full overflow-y-auto overflow-x-hidden"
                                style={{ scrollbarGutter: "stable" }}
                            >
                                {messages.map((msg, idx) => (
                                    <NewChating key={idx} {...msg} />
                                ))}
                                <div className={"flex my-3 w-full justify-end"}>
                                </div>
                            </div>

                            {/* 키보드 + input 영역 */}
                            <div ref={keyboardArea}
                                className="w-full">
                                {/* 키보드 */}
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: messageWriting ? 64 : 0, opacity: messageWriting ? 1 : 0 }}
                                    className="grid grid-cols-8 items-center w-full bg-[#F5F5F5] relative z-10">
                                    {
                                        emojiList.map((eList) => (
                                            <div
                                                key={eList.name}
                                                className="text-2xl cursor-pointer transition-transform duration-200 hover:scale-125 "
                                                onClick={() => {
                                                    clickEmoji(eList.symbol)
                                                }}>
                                                {eList.symbol}
                                            </div>
                                        ))
                                    }
                                </motion.div>

                                {/* 메시지 input 영역 */}
                                <div className="flex items-center justify-center gap-2 w-full h-12 bg-[white] relative z-20">
                                    <input
                                        ref={messageInput}
                                        type="text"
                                        placeholder="메시지 입력"
                                        className="w-52 h-8 bg-white dark:bg-slate-800 rounded-full px-4 py-2 text-sm outline-none border border-gray-300 dark:border-slate-700 focus:ring-1 focus:ring-blue-500"
                                        onFocus={() => setMessageWriting(true)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                sendMessage();
                                            }
                                        }}
                                    />

                                    {/* 전송 버튼 */}
                                    <button
                                        className="rounded-full bg-blue-500 cursor-pointer hover:bg-blue-600 text-white transition "
                                        onClick={() => sendMessage()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l4 4-4 4" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Home indicator */}
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-black rounded-full opacity-70"></div>
                    </div>
                </div>

                {/* Side buttons */}
                <div className="absolute left-0 top-24 w-1 h-12 bg-gray-400 rounded-l-lg"></div>
                <div className="absolute left-0 top-40 w-1 h-8 bg-gray-400 rounded-l-lg"></div>
                <div className="absolute left-0 top-52 w-1 h-8 bg-gray-400 rounded-l-lg"></div>

                {/* Power button */}
                <div className="absolute right-0 top-32 w-1 h-16 bg-gray-400 rounded-r-lg"></div>
            </div>
        </div>
    );
}