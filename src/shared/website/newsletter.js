"use client";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'
import { MailIcon } from 'lucide-react'
import React from 'react'

export default function Newsletter() {
    return (
        <section className="relative bg-[#F9F8F5]">
            <div className="mx-auto max-w-7xl px-4 lg:py-12 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 md:grid-cols-12 gap-6 items-center">
                    <div className="lg:col-span-7 md:col-span-6 col-span-12 lg:pt-0 md:pt-0 pt-6">
                        <h2 className="lg:text-4xl text-text-26 font-bold text-black">Subscribe To Our News letter</h2>
                        <p className="text-brand-gray lg:text-lg text-base font-regular mt-3 max-w-xl">Sign up today Writing copy is time-consuming and difficult. Headline's artificial intelligence can take your thoughts.</p>
                    </div>
                    <div className="lg:col-span-5 md:col-span-6 col-span-12 flex justify-end">
                        <div className="flex justify-center w-full">
                            <InputGroup className="bg-white border-[#D8D8D8] h-13 rounded-full shadow-none has-[[data-slot=input-group-control]:focus-visible]:ring-0
                                has-[[data-slot=input-group-control]:focus-visible]:ring-transparent has-[[data-slot=input-group-control]:focus-visible]:ring-offset-0
                                focus-within:!border-brand-dark-green transition-all">
                                <InputGroupInput
                                    placeholder="Enter your Email Here"
                                    type='email'
                                    className="h-13 text-black text-sm font-medium placeholder:text-[#333333] placeholder:text-sm"
                                />
                                <InputGroupAddon>
                                    <MailIcon />
                                </InputGroupAddon>
                                <InputGroupAddon align="inline-end">
                                    <InputGroupButton
                                        type="button"
                                        className="rounded-full font-semibold px-3 py-2 h-auto text-sm shadow-xs shadow-black/10 bg-brand-dark-green hover:bg-brand-dark-green-hover hover:text-white text-white cursor-pointer"
                                    // onClick={handleSubmit}
                                    >
                                        Get Listed
                                    </InputGroupButton>
                                </InputGroupAddon>
                            </InputGroup>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
