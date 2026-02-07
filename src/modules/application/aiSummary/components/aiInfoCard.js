import React from 'react'
import Image from 'next/image'
import CheckIcon from "@/assets/images/summary/checkmark-circle.svg";
import AlertIcon from "@/assets/images/summary/alert.svg";

export default function AiInfoCard({data}) {
    return (
        <div className='flex items-center gap-3'>
            {/* <Image src={data?.status === 'normal' ? CheckIcon : AlertIcon} alt="icon" /> */}
            <Image src={CheckIcon} alt="icon" />
            <p className="text-lg font-medium text-black">
                {data}
            </p>
        </div>
    )
}
