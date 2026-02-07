"use client";
import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'

export default function SecureLinkCard({ link, onCopy }) {
    return (
        <Card className="bg-white shadow-[0px_0px_4px_0px_#47A76F] rounded-xl mt-4 py-3 px-3 mx-1">
            <CardContent className="p-0">
                <h5 className='text-black text-base font-medium mb-1'>Secure link created</h5>
                <div className="flex items-center justify-between gap-2 bg-white border border-brand-light-gray rounded-lg px-2 py-1.5">
                    <p className="text-sm text-black font-medium truncate underline">
                        {link}
                    </p>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 cursor-pointer bg-gray-100"
                        onClick={onCopy}
                    >
                        <Copy className="h-4 w-4 text-black-600" />
                    </Button>
                </div>
                <p className="text-xs text-brand-gray mt-1">
                    Valid for: <span className="font-medium">24 hours</span> | OTP required to view | Read-only access
                </p>
            </CardContent>
        </Card>
    )
}
