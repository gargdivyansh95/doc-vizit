import React from 'react'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import AbhaImage from '@/assets/images/home/abha/abha.svg';
import RecordsIcon from '@/assets/images/home/abha/centralized.svg';
import SecureIcon from '@/assets/images/home/abha/shield.svg';
import HospitalIcon from '@/assets/images/home/abha/hospital.svg';
import HealthIcon from '@/assets/images/home/abha/healtcare.svg';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function YourAbha() {

    return (
        <section className="relative bg-[#F8FCF9]">
            <div className="mx-auto max-w-7xl lg:px-0 px-4 lg:pt-16 lg:pb-12 md:pt-24 md:pb-12 py-8">
                <h2 className="lg:text-text-32 text-text-26 font-medium leading-tight text-black text-center lg:px-0 px-4">
                    Your ABHA.{" "}
                    <span className="text-brand-light-green font-extrabold">Your Digital Health Identity.</span>
                </h2>
                <p className='text-black lg:text-lg text-base font-medium text-center mt-3 max-w-3xl mx-auto'>ABHA (Ayushman Bharat Health Account) is a unique health ID that helps you securely link and access your medical records across healthcare providers in India.</p>
                <div className="grid grid-cols-1 lg:grid-cols-12 md:grid-cols-12 gap-6 items-center">
                    <div className="lg:col-span-6 md:col-span-6 col-span-12 lg:pt-0 md:pt-0 pt-6">
                        <h4 className="lg:text-text-22 text-lg font-bold bg-clip-text text-transparent bg-bg-text capitalize">
                            With ABHA, your health data stays organized, portable, and under your control.
                        </h4>
                        <ul className='lg:space-y-6 space-y-4 lg:mt-10 mt-6'>
                            <li className='flex items-center gap-6 lg:text-text-22 text-base font-bold text-black'>
                                <Image src={RecordsIcon} alt="RecordsIcon" />
                                One unique health ID for your medical records
                            </li>
                            <li className='flex items-center gap-6 lg:text-text-22 text-base font-bold text-black'>
                                <Image src={SecureIcon} alt="SecureIcon" />
                                Secure and consent-based data sharing
                            </li>
                            <li className='flex items-center gap-6 lg:text-text-22 text-base font-bold text-black'>
                                <Image src={HospitalIcon} alt="HospitalIcon" />
                                Easy access across hospitals and labs
                            </li>
                            <li className='flex items-center gap-6 lg:text-text-22 text-base font-bold text-black'>
                                <Image src={HealthIcon} alt="HealthIcon" />
                                Government-backed digital health identity
                            </li>
                        </ul>
                    </div>
                    <div className="lg:col-span-6 md:col-span-6 col-span-12 flex justify-end">
                        <div className='flex flex-col items-center justify-center'>
                            <Image src={AbhaImage} alt="AbhaImage" />
                            <Link href="https://www.pristyncare.com/create-abha-health-id/" target='_blank'
                                className="mt-6 cursor-pointer bg-brand-dark-green text-white font-bold text-sm py-2 px-4 rounded-md hover:bg-brand-dark-green-hover focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                            >
                            Create Your ABHA Card
                            </Link>
                            <p className='mt-1 text-black font-regular text-base max-w-md text-center'>Creating an ABHA is free and governed by India’s digital health guidelines.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
