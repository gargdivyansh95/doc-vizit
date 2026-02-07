import React from 'react'
import Image from 'next/image'
import PrivacyImage from '@/assets/images/home/privacy/privacy.svg';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BuiltPrivacy() {

    const router = useRouter();

    const handleUpload = () => {
        router.push('/signup');
    }

    return (
        <section className="relative">
            <div className="mx-auto max-w-7xl lg:py-12 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 md:grid-cols-12 gap-6 items-center">
                    <div className="lg:col-span-7 md:col-span-7 col-span-12 lg:pt-10 md:pt-10 pt-0 lg:px-0 px-4">
                        <h2 className="lg:text-4xl text-text-26 font-bold bg-clip-text text-transparent bg-bg-text lg:px-0 px-0 capitalize">
                            Built for India. Built for Privacy.
                        </h2>
                        <p className='text-black lg:text-2xl text-lg font-medium mt-4'>e-DigiHealth aligns with the DPDP Act, 2023, ensuring your personal and health data remains secure, consent-driven, and fully under your control.</p>
                        <Button size={'lg'} onClick={handleUpload}
                            className="mt-6 cursor-pointer bg-brand-dark-green text-white font-bold text-sm py-2 px-4 rounded-md hover:bg-brand-dark-green-hover focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                        >
                            <Upload className="w-4 h-4" />
                            Upload Medical Report
                        </Button>
                    </div>
                    <div className="lg:col-span-5 md:col-span-5 col-span-12 lg:absolute md:absolute static top-0 right-0 lg:pt-10 md:pt-5 pt-0">
                        <Image src={PrivacyImage} alt="PrivacyImage" />
                    </div>
                </div>
            </div>
        </section>
    )
}
