"use client"
import { Button } from '@/components/ui/button'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import Image from 'next/image'
import React from 'react'
import NotificationIcon from "@/assets/images/right-sidebar/notification.svg";
import SettingIcon from "@/assets/images/right-sidebar/setting.svg";
import AvatarIcon from "@/assets/images/right-sidebar/userAvatar.svg";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { authActions } from '@/modules/application/auth/auth.action';
import { toast } from 'sonner';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'

export default function UserInfo() {

    const dispatch = useDispatch();
    const router = useRouter();
    const profileState = useSelector((state) => state.profile);

    const handleLogout = () => {
        dispatch(authActions.postLogout(
            (response) => {
                if (response.success === true) {
                    toast.success(response.message);
                    router.push('/login');
                }
            },
            (error) => {
                toast.error(error.error || 'Login failed');
                setLoading(false);
            },
        ))
    };

    return (
        <>
            <div className="flex flex-row items-center gap-8">
                <Popover>
                    <PopoverTrigger asChild className="relative cursor-pointer">
                        <div className="relative">
                            <Button variant="outline" size="icon" aria-label="Notifications"
                                className="border-0 shadow-none hover:bg-transparent cursor-pointer block w-auto h-auto relative">
                                <Image src={NotificationIcon} alt="notification" />
                            </Button>
                            <Badge className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-brand-red text-white text-[8px] flex items-center justify-center p-0">
                                1
                            </Badge>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent
                        align="center"
                        sideOffset={12}
                        className="w-[90%] ml-auto lg:mr-0 md:mr-0 mr-auto rounded-xl p-0 shadow-[0px_4px_26.8px_0px_rgba(0,0,0,0.25)]"
                    >
                        <div className="px-3 py-2 space-y-2">
                            <h4 className="text-lg font-semibold text-black">Notification</h4>
                            <div className="border rounded-lg p-2 space-y-2">
                                <p className="text-base font-medium text-black"> Family access request </p>
                                <p className="text-sm text-brand-light-black font-regular">
                                    Siddhant has requested <b>Full access</b> to your health records.
                                </p>
                                <div className="flex gap-2 pt-0 justify-end">
                                    <Button
                                        type="submit"
                                        className="cursor-pointer bg-brand-red hover:bg-brand-red text-white font-bold text-sm py-1 px-4 rounded-md shadow-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 h-8"
                                    >
                                        Reject
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="cursor-pointer bg-brand-dark-green hover:bg-brand-dark-green-hover text-white font-bold text-sm py-1 px-4 rounded-md shadow-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 h-8"
                                    >
                                        Approve
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
                <Button variant="outline" size="icon" aria-label="Settings" className="border-0 shadow-none hover:bg-transparent cursor-pointer block w-auto h-auto">
                    <Image src={SettingIcon} alt="setting" />
                </Button>
            </div>
            <div>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton className="flex items-center cursor-pointer text-black font-semibold text-lg gap-4 p-0 hover:bg-transparent active:bg-transparent h-auto focus-visible:ring-0">
                                    <span className="lg:block md:block hidden">
                                        {profileState.userProfile?.name}
                                    </span>
                                    <div className="bg-brand-light-green w-9 h-9 rounded-lg flex items-center justify-center">
                                        <Image src={AvatarIcon} alt="Avatar" />
                                    </div>
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                className="w-44"
                            >
                                <DropdownMenuItem
                                    onClick={() => router.push("/profile")}
                                    className="cursor-pointer text-black font-medium text-sm"
                                >
                                    Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={handleLogout}
                                    className="cursor-pointer text-black font-medium text-sm"
                                >
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </div>
        </>
    )
}
