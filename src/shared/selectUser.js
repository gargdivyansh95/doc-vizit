/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import UserSwitchIcon from "@/assets/images/right-sidebar/user-switch.svg";
import { Card, CardContent } from '@/components/ui/card';
import { LoaderIcon, MapPin } from 'lucide-react';
import AvatarIcon from "@/assets/images/right-sidebar/userAvatar.svg";
import { familyManagementActions } from '@/modules/application/familyManagement/familyManagement.action';
import { useDispatch, useSelector } from 'react-redux';
import { convertHeightToCm } from '@/utils';
import Loader from './loader';

export default function SelectUser() {

    const dispatch = useDispatch();
    const {allFamilyMembers} = useSelector((state) => state.familyManagement);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getAllFamilyMembers = () => {
        setIsLoading(true)
        dispatch(familyManagementActions.fetchAllFamilyMembers(
            {},
            (response) => {
                if (response.success === true) {
                    setIsLoading(false)
                }
            },
            (error) => {
                console.log(error, 'error')
                setIsLoading(false)
            },
        ))
    }

    useEffect(() => {
        getAllFamilyMembers();
    }, []);

    useEffect(() => {
        if (allFamilyMembers?.length > 0) {
            const sortedMembers = [
                ...allFamilyMembers.filter(item => item.relation === "self"),
                ...allFamilyMembers.filter(item => item.relation !== "self"),
            ];
            setSelectedUser(sortedMembers[0]);
        }
    }, [allFamilyMembers]);

    const handleSelectUser = (value) => {
        const selected = allFamilyMembers.find(item => item.customerId === Number(value));
        setSelectedUser(selected);
    };

    return (
        <div>
            <Select value={selectedUser?.customerId} onValueChange={handleSelectUser}>
                <SelectTrigger className="[&>svg]:!text-black [&>svg]:!opacity-100 w-full !h-auto text-base font-medium text-[#000000AB] cursor-pointer border-brand-light-gray rounded-lg focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-brand-light-green rounded-sm flex items-center justify-center">
                            <Image src={UserSwitchIcon} alt="UserSwitchIcon" />
                        </div>
                        <SelectValue placeholder="Select user">
                            {selectedUser?.name || "Select user"}
                        </SelectValue>
                    </div>
                </SelectTrigger>
                <SelectContent>
                    {allFamilyMembers?.map((item, index) => (
                        <SelectItem key={index} className='cursor-pointer' value={item?.customerId}>{item.name} ({item.relation})</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {isLoading ? 
                <Loader height="h-60" /> :
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
                            {selectedUser?.name || ""}
                        </h3>
                        <div className="w-full flex justify-center items-center gap-0 mb-1">
                            <p className="text-xs text-black font-medium">ABHA ID -</p>
                            <p className="text-xs text-brand-gray font-regular">{selectedUser?.abha_id || "xx-xxxx-xxxx-xxxx"}</p>
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
                                    {selectedUser?.blood_group || "—"}
                                </span>
                            </div>
                            <div className="h-12 w-px bg-[#D4E3F0]" />
                            <div className="flex flex-col items-center">
                                <span className="text-xs text-brand-dark-green font-medium mb-1">Height</span>
                                <span className="text-sm font-bold text-brand-dark-green">
                                    {`${selectedUser?.height ? convertHeightToCm(selectedUser?.height) : "—"} cm`}
                                </span>
                            </div>
                            <div className="h-12 w-px bg-[#D4E3F0]" />
                            <div className="flex flex-col items-center">
                                <span className="text-xs text-brand-dark-green font-medium mb-1">Weight</span>
                                <span className="text-sm font-bold text-brand-dark-green">
                                    {`${selectedUser?.weight ? selectedUser?.weight : "—"} Kg`}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            }
        </div>
    )
}
