"use client"
import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export default function WrongReportSelectDialog({ open, onClose, onOpen }) {

    const handleConfirm = () => {
        onClose();
        // onOpen();
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="lg:max-w-md [&>button]:cursor-pointer [&>button]:opacity-100 [&>button]:focus:ring-0 [&>button]:focus:ring-transparent [&>button]:focus:ring-offset-0 p-0 px-6 pt-3 pb-6">
                <DialogHeader className="gap-1">
                    <DialogTitle className="text-xl font-semibold text-black text-center">Different report types selected</DialogTitle>
                    <DialogDescription className="text-center text-brand-red text-base font-medium mt-2">
                        The reports you selected are not of the same type. AI will compare only the common information available across them.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className='mt-2'>
                    <Button
                        type="submit"
                        size={'lg'}
                        className="w-full cursor-pointer bg-brand-dark-green text-white font-bold text-sm py-2 px-4 rounded-md hover:bg-brand-dark-green-hover focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                        onClick={handleConfirm}
                    >
                        Change Selection
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
