"use client";
import React from 'react'
import { Button } from '@/components/ui/button'
import { Upload } from 'lucide-react'
import { useRouter } from 'next/navigation';

export default function Cta() {

    const router = useRouter();
        
    const handleUpload = () => {
        router.push('/signup');
    }

    const handleHowWorks = () => {
        const section = document.getElementById("how-it-works");
        section?.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <>
            <Button size={'lg'} onClick={handleUpload}
                className="cursor-pointer bg-brand-dark-green text-white font-bold text-sm py-2 px-4 rounded-md hover:bg-brand-dark-green-hover focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
            >
                <Upload className="w-4 h-4" />
                Upload Medical Report
            </Button>
            <Button
                variant='outline'
                size={'lg'}
                onClick={handleHowWorks}
                className="cursor-pointer bg-white hover:bg-white text-brand-dark-green hover:text-brand-dark-green font-bold text-sm py-2 px-4 rounded-md border-brand-dark-green shadow-none"
            >
                See How It Works
            </Button>
        </>

    )
}
