"use client";
import { Button } from '@/components/ui/button'
import React from 'react'

export default function NoData({label, icon, buttonText, onClick}) {
    return (
        <div className="flex flex-col items-center justify-center pt-4">
            <h3 className="text-lg font-bold text-black mb-3">
                {label}
            </h3>
            {buttonText &&
                <Button
                    variant='outline'
                    type="submit"
                    size={'lg'}
                    className="cursor-pointer bg-white hover:bg-white text-brand-dark-green hover:text-brand-dark-green font-semibold text-sm py-2 px-4 rounded-lg shadow-none border-brand-dark-green"
                    onClick={onClick}
                >
                    {icon && icon}
                    {buttonText}
                </Button>
            }
        </div>
    )
}
