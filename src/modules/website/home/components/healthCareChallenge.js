import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image';
import FileIcon from '@/assets/images/home/challenges/license.svg';
import ShieldIcon from '@/assets/images/home/challenges/shield-user.svg';
import UserIcon from '@/assets/images/home/challenges/user-group.svg';

const CardBlock = ({title, desc, icon}) => {
    return (
        <Card className="bg-[#F1FAF4] border-none rounded-xl shadow-none py-6 px-6">
            <CardContent className="p-0 text-left">
                <Image src={icon} alt={icon} />
                <h3 className="lg:mt-10 mt-6 lg:text-2xl text-text-22 font-bold text-black">{title}</h3>
                <p className="mt-2 lg:text-xl text-lg font-medium text-black">{desc}</p>
            </CardContent>
        </Card>
    )
}

export default function HealthCareChallenge() {
    return (
        <section className="relative">
            <div className="mx-auto max-w-7xl lg:px-0 px-4 lg:py-12 py-8">
                <h2 className="lg:text-text-32 text-text-26 font-medium leading-tight text-black text-center lg:px-0 px-4">
                    We Understand Your{" "}
                    <span className="text-brand-light-green font-extrabold">Healthcare Challenge</span>
                </h2>
                <p className='text-black lg:text-lg text-base font-medium text-center mt-1'>Managing family health records shouldn't be stressful. Let's solve this together.</p>
                <div className="lg:mt-12 mt-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 lg:gap-8 gap-6">
                    <CardBlock title="Scattered Records" desc="Reports are complex and confusing" icon={FileIcon} />
                    <CardBlock title="End-to-End Encryption" desc="Sharing reports isn&apos;t private or secure" icon={ShieldIcon} />
                    <CardBlock title="Family Health Chaos" desc="Family health records are unorganized" icon={UserIcon} />
                </div>
            </div>
        </section>
    )
}
