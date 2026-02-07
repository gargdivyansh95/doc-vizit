"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import AppLogo from "@/assets/images/app-logo.svg";
import MenuIcon from "@/assets/images/menu.svg";
import Link from 'next/link';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import MenuList from '../menu/menuList';
import UserInfo from '../userInfo';

export default function MobileHeader() {

    const pathname = usePathname();

    const getAppLogo = () => {
        return (
            <Image src={AppLogo} alt="logo" className="w-[140px]" />
        )
    }

    return (
        <div className="px-4 py-3 flex items-center justify-between bg-white fixed top-0 left-0 right-0 z-50 w-full border-b border-gray-200">
            <div className="flex items-center gap-2">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="lg:hidden"
                        >
                            <Image src={MenuIcon} alt="menu" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-2xs [&>button]:cursor-pointer [&>button]:opacity-100 [&>button]:focus:ring-0 [&>button]:focus:ring-transparent [&>button]:focus:ring-offset-0">
                        <VisuallyHidden>
                            <SheetTitle>Mobile Navigation</SheetTitle>
                        </VisuallyHidden>
                        <div className="p-3 border-b border-gray-200">
                            {getAppLogo()}
                        </div>
                        <div className='px-4'>
                            <MenuList pathname={pathname} />
                        </div>
                    </SheetContent>
                </Sheet>
                <Link href="/dashboard">
                    {getAppLogo()}
                </Link>
            </div>
            <div className='flex items-center justify-between gap-6'>
                <UserInfo />
            </div>
        </div>
    )
}
