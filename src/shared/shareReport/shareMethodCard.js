"use client";
import React from 'react'
import Image from 'next/image'

export default function ShareMethodCard({method}) {
    return (
        <>
            <div className="flex items-center gap-2 mb-1">
                <Image src={method.icon} alt={method.label} />
                <p className="font-semibold text-base">{method.label}</p>
            </div>
            <p className="text-sm text-brand-gray font-semibold">
                {method.description}
            </p>
        </>
    )
}
