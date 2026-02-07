"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerTitle,
} from '@/components/ui/drawer';
import UserSwitchIcon from "@/assets/images/right-sidebar/user-switch.svg";
import AvatarIcon from "@/assets/images/right-sidebar/userAvatar.svg";
import CompleteProfileCard from '../completeProfileCard';
import AskAnything from '../askAnything';
import SelectUser from '../selectUser';
import BmiCard from '../bmiCard';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import CompleteProfileDialog from '../completeProfileDialog';
import CardItem from '../cardItem';
import { useSelector } from 'react-redux';
import { isProfileCompleted } from '@/utils';

export default function MobileRightSidebar() {

    const profileState = useSelector((state) => state.profile?.userProfile);
    const [openProfileDialog, setOpenProfileDialog] = useState(false);

    const handleOpenProfileDialog = () => setOpenProfileDialog(true);
    const handleCloseProfileDialog = () => setOpenProfileDialog(false);
    const profileCompleted = isProfileCompleted(profileState);

    return (
        <>
            <Drawer>
                <DrawerTrigger asChild>
                    <Button variant="ghost" size="icon" className="lg:hidden">
                        <div className="fixed top-30 right-0 z-50 lg:hidden">
                            <div className="flex items-center gap-3 bg-[#F4FFEC] px-3 py-2 shadow-[0px_4px_31.6px_0px_#00000040] rounded-tl-full rounded-bl-full cursor-pointer">
                                <div className="w-8 h-8 bg-brand-light-green rounded-sm flex items-center justify-center">
                                    <Image src={UserSwitchIcon} alt="UserSwitchIcon" className="w-6 h-6" />
                                </div>
                                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                                    <Image
                                        src={AvatarIcon}
                                        alt="User"
                                        className="w-8 h-8 rounded-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </Button>
                </DrawerTrigger>
                <DrawerContent className="flex flex-col max-h-[90vh] rounded-t-2xl">
                    <VisuallyHidden>
                        <DrawerTitle>User Options</DrawerTitle>
                    </VisuallyHidden>
                    <div className="overflow-y-auto flex-1 px-4 py-4">
                        <SelectUser />
                        {/* <BmiCard selectedUser={selectedUser} /> */}
                        {/* <div className="space-y-2 mt-4">
                            <CardItem name={'Allergy'} desc="Avoid Penicillin and related antibiotics" />
                            <CardItem name={'Medications'} desc="Take Blood Pressure Medication daily at 8 AM" />
                        </div> */}
                        {!profileCompleted &&
                            <CompleteProfileCard onClick={handleOpenProfileDialog} />
                        }
                        <AskAnything />
                    </div>
                </DrawerContent>
            </Drawer>
            <CompleteProfileDialog
                open={openProfileDialog}
                onClose={handleCloseProfileDialog}
            />
        </>
    );
}
