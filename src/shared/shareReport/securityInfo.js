"use client";
import React from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import AlertIcon from '@/assets/images/share/alert.svg';
import ShieldIcon from '@/assets/images/share/shield-key.svg';

export default function SecurityInfo() {
    return (
        <>
            <div className='flex items-center gap-3 mt-2'>
                <Image src={AlertIcon} alt="alert" />
                <p className='text-black font-semibld text-sm'>
                    All data is end to end encrypted you return full ownership and can revoke access at any time from your record section
                </p>
            </div>
            <Card className="border border-brand-light-green bg-white rounded-xl mt-4 lg:py-3 lg:px-4 md:py-3 md:px-4 sm:py-3 sm:px-4 py-2 px-2">
                <CardContent className="p-0">
                    <div className="flex items-center gap-6">
                        <Image src={ShieldIcon} alt="Shield" />
                        <ul className="space-y-0 lg:text-sm md:text-sm sm:text-sm text-xs text-brand-dark-green font-semibold list-disc list-inside">
                            <li>Share a time-limited, read-only link with anyone.</li>
                            <li>Access is protected and fully logged.</li>
                            <li>Give trusted family members ongoing access to your medical records.</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}
