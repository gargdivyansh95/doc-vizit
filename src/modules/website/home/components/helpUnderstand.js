import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import DashboardImage from '@/assets/images/home/help/card1.svg';
import AgeImage from '@/assets/images/home/help/card2.svg';
import FamilyImage from '@/assets/images/home/help/card3.svg';
import AvatarIcon from '@/assets/images/home/help/avatar.svg';
import CalendarIcon from '@/assets/images/home/help/calendar.svg';
import ClockIcon from '@/assets/images/home/help/clock.svg';
import { useRouter } from 'next/navigation';

export default function HelpUnderstand() {

    const router = useRouter();
    
    const handleUpload = () => {
        router.push('/signup');
    }

    return (
        <section className="relative bg-[#F8FCF9] lg:mt-12 md:mt-12 mt-6">
            <div className="mx-auto max-w-7xl lg:px-0 px-4 lg:py-12 py-8">
                <h2 className="lg:text-text-32 text-text-26 font-medium leading-tight text-black text-center lg:px-0 px-4 capitalize">
                    AI that{" "}
                    <span className="text-brand-light-green font-extrabold">explains</span>
                    {" "} — not scares
                </h2>
                <p className='text-black lg:text-lg text-base font-medium text-center mt-2'>e-DigiHealth's AI helps you understand, not diagnose.</p>
                <p className='text-black lg:text-lg text-base font-medium text-center'>It highlights important information while keeping medical decisions with doctors.</p>
                <div className="lg:mt-8 mt-6 grid grid-cols-12 lg:gap-2 md:gap-2 gap-2 auto-rows-auto">
                    <div className="lg:col-span-6 md:col-span-6 col-span-12 space-y-2">
                        <Card className="rounded-3xl border-none bg-white shadow-none py-0">
                            <CardContent className="p-0 lg:pt-10 pt-6">
                                <div className='lg:px-8 px-6'>
                                    <h3 className="lg:text-5xl text-2xl font-regular text-black">Dashboard</h3>
                                    <p className="inline-block lg:mt-4 mt-2 rounded-full border-1 border-[#0000001A] lg:px-6 px-4 py-1 lg:text-lg text-sm font-regular text-[#727272]">
                                        Family Health
                                    </p>
                                </div>
                                <div className='mt-8 flex items-center lg:gap-6 gap-3'>
                                    <div className='flex-1'>
                                        <Image src={DashboardImage} alt="Dashboard" className='w-full' />
                                    </div>
                                    <div className='flex-1'>
                                        <div className='lg:pr-20 pr-4'>
                                            <h5 className='lg:text-2xl text-lg font-medium text-black'>Manage your entire family’s medical records from a single, secure place.</h5>
                                            <p className='mt-4 text-[#727272] lg:text-lg text-sm font-regular'>All health data stays organized, accessible, and under your control.</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="rounded-3xl border-none bg-white shadow-none py-0">
                            <CardContent className="p-0 lg:pt-10 pt-6">
                                <div className='lg:px-8 px-6'>
                                    <h3 className="lg:text-5xl text-2xl font-regular text-black">Designed for every age</h3>
                                    <p className='lg:mt-4 mt-2 text-[#727272] lg:text-lg text-sm font-regular'>Simple enough for elders. Powerful enough for caregivers.</p>
                                    <div className="mt-6 space-y-3 flex flex-col items-start">
                                        {[
                                            "Multiple family profiles",
                                            "Role-based access control",
                                            "Elder-friendly experience",
                                        ].map((item) => (
                                            <p key={item}
                                                className="rounded-full border-1 border-[#0000001A] lg:px-6 px-4 py-1 text-[#727272] lg:text-base text-sm font-regular"
                                            >
                                                {item}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                                <div className='flex justify-end lg:-mt-40 -mt-22'>
                                    <Image src={AgeImage} alt="Dashboard" className='rounded-br-3xl' />
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="rounded-3xl border-none bg-white shadow-none py-0 bg-[linear-gradient(227.55deg,rgba(71,167,111,0.6)_-14.02%,rgba(183,212,254,0.6)_109.57%)] backdrop-blur-[55.5056px]">
                            <CardContent className="p-0 lg:px-14 px-8 lg:py-8 py-6 text-center">
                                <h6 className="lg:text-2xl text-lg font-bold text-black">
                                    One dashboard. Multiple family members. Complete control.
                                </h6>
                                <Button onClick={handleUpload}
                                    className="mt-4 cursor-pointer bg-brand-dark-green text-white font-bold text-sm py-2 px-4 rounded-full hover:bg-brand-dark-green-hover focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0">
                                    Start managing family health
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="lg:col-span-6 md:col-span-6 col-span-12 space-y-2">
                        <Card className="rounded-3xl border-none bg-white shadow-none py-0">
                            <CardContent className="p-0 pt-4">
                                <div className=''>
                                    <Image src={FamilyImage} alt="Dashboard" className='w-full' />
                                </div>
                                <div className='lg:px-8 px-6 lg:pb-8 pb-6'>
                                    <h3 className="lg:text-5xl text-2xl font-regular text-black">Manage family health together</h3>
                                    <p className='mt-4 text-[#727272] lg:text-lg text-sm font-regular'>Add family members and stay connected to everyone’s health records with controlled access.</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="rounded-3xl border-none bg-white shadow-none py-0">
                            <CardContent className="p-0 lg:pt-10 pt-6 lg:pb-10 pb-6">
                                <div className='lg:px-14 px-8 text-center'>
                                    <h3 className="lg:text-5xl text-2xl font-regular text-black">Patient-owned by design</h3>
                                    <p className='mt-4 text-[#727272] lg:text-lg text-sm font-regular'>e-DigiHealth ensures your family’s health data is securely managed and fully patient-owned.</p>
                                    <p className='text-[#727272] lg:text-lg text-sm font-regular'>You decide who can see what — always.</p>
                                </div>
                                <div className="mt-8 relative lg:px-14 px-8">
                                    <div className='flex justify-end relative z-10'>
                                        <div className="rounded-3xl p-4 max-w-xs lg:rotate-[5deg] rotate-[3deg] bg-[linear-gradient(196.22deg,rgba(255,255,255,0.4)_-4.8%,rgba(111,207,151,0.4)_95.38%)] backdrop-blur-[49.6629px]">
                                            <h4 className="font-bold text-black lg:text-2xl text-base">Granular access control</h4>
                                            <p className="mt-3 lg:text-sm text-xs text-[#00000080] font-medium">
                                                Share reports only with the people you choose — for the time you decide.
                                            </p>
                                            <Button onClick={handleUpload}
                                                className="mt-3 cursor-pointer bg-brand-dark-green text-white font-bold lg:text-sm text-xs lg:py-2 py-1 px-4 rounded-full hover:bg-brand-dark-green-hover focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0">
                                                Start managing family health
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="rounded-3xl p-4 max-w-xs lg:-rotate-[5deg] -rotate-[3deg] lg:-mt-20 -mt-5 bg-[linear-gradient(227.55deg,rgba(71,167,111,0.3)_-14.02%,rgba(183,212,254,0.3)_109.57%)]">
                                        <h4 className="font-bold text-black lg:text-2xl text-base">Complete access visibility</h4>
                                        <p className="mt-3 lg:text-sm text-xs text-[#00000080] font-medium">
                                            View when, how, and by whom your medical data was accessed.
                                        </p>
                                        <div className="mt-3">
                                            {/* Dr. Amira · 3 May 2024 · 8:11 AM */}
                                            <div className='flex gap-2 items-center justify-between'>
                                                <div className='flex gap-2 items-center'>
                                                    <Image src={AvatarIcon} alt="Avatar" />
                                                    <p className='text-base text-black font-medium'>Dr. Amira</p>
                                                </div>
                                                <div className='flex gap-2 items-center'>
                                                    <Image src={CalendarIcon} alt="Calendar" />
                                                    <p className='text-[10px] text-[#00000080] font-regular'>3 May 2024</p>
                                                </div>
                                                <div className='flex gap-2 items-center'>
                                                    <Image src={ClockIcon} alt="Clock" />
                                                    <p className='text-[10px] text-[#00000080] font-regular'>8-11 AM</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}
