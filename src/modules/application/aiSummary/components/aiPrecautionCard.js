import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import AlertDangerIcon from "@/assets/images/summary/alert-red.svg";
import FollowupIcon from "@/assets/images/summary/give-blood.svg";
import AlertIcon from "@/assets/images/summary/alert.svg";

export default function AiPrecautionCard({data}) {
    return (
        <Card className="rounded-2xl border-0 shadow-[0px_0px_6.4px_0px_rgba(0,0,0,0.06)] py-0">
            <CardContent className="p-4">
                <div>
                    {/* <Image src={data?.status === 'medium' ? FollowupIcon : AlertDangerIcon} alt='icon' /> */}
                    <div className='flex items-center gap-3'>
                        <Image src={AlertDangerIcon} alt='icon' />
                        <p className="text-lg font-medium text-black">
                            {data?.parameter}
                        </p>
                    </div>
                    <p className="text-base font-medium text-brand-light-black mt-1">
                        {data?.simple_meaning}
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
