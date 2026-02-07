"use client";
import Image from "next/image";
import UserAddIcon from "@/assets/images/right-sidebar/add-male.svg";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CompleteProfileCard({onClick}) {

    return (
        <Card className="bg-[#FFD0291A] border-1 border-[#FFD029] shadow-none mt-4 py-0 rounded-xl">
            <CardContent className="p-3 flex flex-col">
                <div className="flex items-center gap-4 mb-2">
                    <Image src={UserAddIcon} alt="UserAddIcon"/>
                    <h3 className="text-base font-semibold text-black">Complete Your Profile</h3>
                </div>
                <p className="text-xs font-regular text-black">Help us personalize your health experience. Answer a few questions and add your family members to manage everyone’s health records securely.</p>
                <div className="mt-1 flex justify-end">
                    <Button
                        size={'lg'}
                        className="cursor-pointer text-white font-medium text-sm py-0 px-4 h-8 rounded-md bg-button-gradient"
                        onClick={onClick}
                    >
                        Complete now
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
