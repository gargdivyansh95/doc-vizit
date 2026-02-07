"use client";
import { MapPin } from "lucide-react";
import Image from "next/image";
import AvatarIcon from "@/assets/images/right-sidebar/userAvatar.svg";
import { Card, CardContent } from "@/components/ui/card";

export default function BmiCard({selectedUser}) {
    
    return (
        <Card className="bg-[#F4FFEC] border-0 shadow-none mt-4 py-0 rounded-xl">
            <CardContent className="p-4 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-2">
                    <Image
                        src={selectedUser?.avatar || AvatarIcon}
                        alt={selectedUser?.name || "User"}
                        className="w-16 h-16 rounded-full"
                    />
                </div>
                <h3 className="text-base font-semibold text-black mb-1">
                    {selectedUser?.name || "User"}
                </h3>
                <div className="w-full flex justify-center items-center gap-0 mb-1">
                    <p className="text-xs text-black font-medium">ABHA ID -</p>
                    <p className="text-xs text-brand-gray font-regular">xx-xxxx-xxxx-xxxx</p>
                </div>
                <div className="w-full flex justify-center items-center gap-3">
                    <div>
                        <span className="text-xs text-brand-gray font-medium">—</span>
                    </div>
                    <div className="h-4 w-px bg-[#D4E3F0]" />
                    <div className="flex items-center gap-1 text-brand-gray text-xs font-medium">
                        <MapPin className="w-3 h-3" />
                        <span>—</span>
                    </div>
                </div>
                <div className="w-full flex justify-around items-center mt-3">
                    <div className="flex flex-col items-center">
                        <span className="text-xs text-brand-dark-green font-medium mb-1">Blood</span>
                        <span className="text-sm font-bold text-brand-dark-green">
                            {"—"}
                            {/* {selectedUser?.blood || "—"} */}
                        </span>
                    </div>
                    <div className="h-12 w-px bg-[#D4E3F0]" />
                    <div className="flex flex-col items-center">
                        <span className="text-xs text-brand-dark-green font-medium mb-1">Height</span>
                        <span className="text-sm font-bold text-brand-dark-green">
                            {"—"}
                            {/* {selectedUser?.height || "—"} */}
                        </span>
                    </div>
                    <div className="h-12 w-px bg-[#D4E3F0]" />
                    <div className="flex flex-col items-center">
                        <span className="text-xs text-brand-dark-green font-medium mb-1">Weight</span>
                        <span className="text-sm font-bold text-brand-dark-green">
                            {"—"}
                            {/* {selectedUser?.weight || "—"} */}
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

