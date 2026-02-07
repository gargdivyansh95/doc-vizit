"use client"
import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export default function DeleteAccountDialog({ open, isLoading, onClose, onDelete }) {

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="lg:max-w-md [&>button]:cursor-pointer [&>button]:opacity-100 [&>button]:focus:ring-0 [&>button]:focus:ring-transparent [&>button]:focus:ring-offset-0 p-0 px-6 pt-3 pb-6">
                <DialogHeader className="gap-1">
                    <DialogTitle className="text-xl font-semibold text-black text-center">Delete Account</DialogTitle>
                    <DialogDescription className="text-center text-brand-gray text-base font-medium">
                        Are you sure you want to delete your account?<br />This action is irreversible.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className='mt-2 sm:justify-center flex-row'>
                    <Button
                        variant='outline'
                        type="submit"
                        size={'lg'}
                        className="w-1/2 cursor-pointer bg-transparent hover:bg-transparent text-brand-dark-green hover:text-brand-dark-green font-bold text-sm py-2 px-4 rounded-md border-brand-dark-green shadow-none"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        size={'lg'}
                        disabled={isLoading}
                        className="w-1/2 cursor-pointer bg-brand-dark-green text-white font-bold text-sm py-2 px-4 rounded-md hover:bg-brand-dark-green-hover focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                        onClick={onDelete}
                    >
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
