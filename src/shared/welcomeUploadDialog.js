"use client";
import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import AskAiIcon from "@/assets/images/right-sidebar/ai-ask.svg";
import Image from 'next/image'

const getCheckCircleIcon = () => {
    return (
        <div className='flex items-center justify-center rounded-full border-2 border-brand-dark-green w-4 h-4'>
            <div className='rounded-full bg-brand-dark-green w-1.5 h-1.5' />
        </div>
    )
}

export default function WelcomeUploadDialog({ open, onClick, onClose, onSkip }) {

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="lg:max-w-md [&>button]:cursor-pointer [&>button]:opacity-100 [&>button]:focus:ring-0 [&>button]:focus:ring-transparent [&>button]:focus:ring-offset-0 p-0 px-6 pt-3 pb-6">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-black text-center">Hi User 👋</DialogTitle>
                    <DialogDescription className="text-center text-brand-gray text-base font-medium">
                        e-DigiHealth helps you understand, track, and safely share your medical history.
                    </DialogDescription>
                </DialogHeader>
                <div className='relative flex flex-col items-center'>
                    <div className="absolute -top-6 w-70 h-28 rounded-full bg-[#6FCF9799] blur-xl opacity-50" />
                    <Image src={AskAiIcon} alt="AskAiIcon" className="w-16 h-16 mx-auto z-10 relative" />
                    <h6 className='text-center text-brand-dark-green text-base font-bold mt-2'>e-DigiHealth AI Assistant</h6>
                    <div className="space-y-3 mt-5">
                        <div className="flex items-center gap-3">
                            {getCheckCircleIcon()}
                            <p className="text-brand-light-black text-base font-medium">
                                Upload any medical report or prescription
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            {getCheckCircleIcon()}
                            <p className="text-brand-light-black text-base font-medium">
                                Get AI-generated summaries in simple language
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            {getCheckCircleIcon()}
                            <p className="text-brand-light-black text-base font-medium">
                                Share securely with doctors or family
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            {getCheckCircleIcon()}
                            <p className="text-brand-light-black text-base font-medium">
                                You stay in full control of your data
                            </p>
                        </div>
                    </div>
                </div>
                <DialogFooter className='mt-4 flex sm:flex-col'>
                    <Button
                        type="submit"
                        size={'lg'}
                        className="w-full cursor-pointer bg-brand-dark-green text-white font-bold text-sm py-2 px-4 rounded-md hover:bg-brand-dark-green-hover focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                        onClick={onClick}
                    >
                        Upload your first report
                    </Button>
                    <Button
                        variant='outline'
                        type="submit"
                        size={'lg'}
                        className="w-full cursor-pointer bg-transparent hover:bg-transparent text-brand-dark-green hover:text-brand-dark-green font-bold text-sm py-2 px-4 rounded-md border-brand-dark-green shadow-none"
                        onClick={onSkip}
                    >
                        Skip for now
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
