"use client";
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion";
import Dummydata from "@/assets/json/faq.json"

export default function Faqs() {
    return (
        <section className="relative bg-[#F8FCF9]">
            <div className="mx-auto max-w-5xl px-4 lg:py-14 py-8">
                <h2 className="lg:text-4xl text-text-26 font-bold text-black text-center">Frequently Asked Questions</h2>
                <p className="text-brand-gray lg:text-lg text-base font-regular text-center mt-3 max-w-xl mx-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <Accordion type="single" collapsible defaultValue="item-0" className="mt-6 bg-white border rounded-3xl">
                    {Dummydata.faqData.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index}`} className="rounded-0 border-b border-border last:border-b-0">
                            <AccordionTrigger className=" flex items-center justify-between px-6 py-5 text-left font-bold lg:text-xl text-base text-black hover:no-underline [&>svg]:bg-[#F3F5F6] data-[state=open]:[&>svg]:bg-brand-dark-green data-[state=open]:[&>svg]:text-white [&>svg]:rounded-full [&>svg]:w-8 [&>svg]:h-8 [&>svg]:p-1 cursor-pointer">
                                {item.question}
                            </AccordionTrigger>
                            <AccordionContent className="px-6 pb-6 lg:text-base text-sm text-[#3C3C43D9] font-regular leading-relaxed">
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}