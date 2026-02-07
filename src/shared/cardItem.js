"use client"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'
import React from 'react'

export default function CardItem({name, desc, isView}) {
    return (
        <Card className="border-1 border-brand-red bg-[linear-gradient(90deg,rgba(244,20,0,0.1)_0%,rgba(244,20,0,0)_177.92%)] py-0 shadow-none rounded-lg">
            <CardContent className="p-2">
                <div className="flex items-center gap-3 justify-between">
                    <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-brand-red" />
                        <Badge className={`text-white rounded-sm text-xs font-medium px-1.5 py-0.5 bg-brand-red`}>
                            {name}
                        </Badge>
                    </div>
                    {isView &&
                        <Button
                            size={'xs'}
                            className="cursor-pointer bg-brand-dark-green text-white font-medium text-xs py-1.5 px-2 rounded-sm hover:bg-brand-dark-green-hover focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                        >
                            View Source
                        </Button>
                    }
                </div>
                <div className='mt-2'>
                    <p className="text-xs font-medium text-black">
                        {desc}
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
