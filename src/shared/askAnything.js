"use client";
import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import AskAiIcon from "@/assets/images/right-sidebar/ai-ask.svg";
import SendIcon from "@/assets/images/right-sidebar/send.svg";
import ArrowIcon from "@/assets/images/right-sidebar/arrow-left.svg";
import Image from "next/image";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";

export default function AskAnything() {

    const scrollContainerRef = useRef(null);
    const [inputValue, setInputValue] = useState("");
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const healthQuestions = [
        {
            id: 1,
            question: "How can I control me high blood sugar level",
        },
        {
            id: 2,
            question: "What are the best exercises for diabetes?",
        },
        {
            id: 3,
            question: "How to manage cholesterol levels?",
        },
        {
            id: 4,
            question: "What diet is good for heart health?",
        },
        {
            id: 5,
            question: "How to improve sleep quality?",
        }
    ];

    const handleSend = () => {
        if (inputValue.trim()) {
            console.log("Sending:", inputValue);
            // setInputValue("");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    // Mouse drag handlers
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
        setScrollLeft(scrollContainerRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed multiplier
        scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <Card className="bg-[linear-gradient(180deg,#8BD9C5_-106.9%,rgba(139,217,197,0)_100%)] border-0 shadow-none rounded-xl mt-4 py-4">
            <CardContent className="p-0">
                <div className="flex flex-col items-center text-center px-8 py-16">
                    <Image src={AskAiIcon} alt="AskAiIcon" />
                    <h3 className="text-sm font-semibold text-black mb-1 mt-3">
                        I am your Health Assistant
                    </h3>
                    <p className="text-xs text-brand-gray">
                        You can upload reports and ask your assistant any medical related to report
                    </p>
                </div>
                <div 
                    ref={scrollContainerRef}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    className="w-full overflow-x-auto mb-4 pl-2 scrollbar-hide cursor-grab active:cursor-grabbing select-none"
                >
                    <div className="flex gap-3 pb-2">
                        {healthQuestions.map((item) => (
                            <div key={item.id}
                                className="flex items-center flex-shrink-0 w-[200px] bg-[#F5F7FA] rounded-lg p-2 text-left shadow-[0px_1px_2px_0px_#0000001A] hover:shadow-md transition-shadow"
                            >
                                <p className="text-xs text-black font-regular">
                                    {item.question}
                                </p>
                                <Image src={ArrowIcon} alt="ArrowIcon" className="w-4 h-4 ml-auto" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="px-2">
                    <InputGroup className="bg-white border-[#D8D8D8] w-full rounded-full h-11 shadow-none has-[[data-slot=input-group-control]:focus-visible]:ring-0
                        has-[[data-slot=input-group-control]:focus-visible]:ring-transparent has-[[data-slot=input-group-control]:focus-visible]:ring-offset-0
                        focus-within:!border-brand-dark-green transition-all">
                        <InputGroupInput placeholder="Ask me anything" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={handleKeyPress} />
                        <InputGroupAddon align="inline-end">
                            <InputGroupButton variant="secondary" onClick={() => handleSend()} className="!bg-transparent">
                                <div className="w-7 h-7 flex items-center justify-center bg-brand-dark-green rounded-full cursor-pointer">
                                    <Image src={SendIcon} alt="SendIcon" className="w-4 h-4" />
                                </div>
                            </InputGroupButton>
                        </InputGroupAddon>
                    </InputGroup>
                </div>
            </CardContent>
        </Card>
    );
}
