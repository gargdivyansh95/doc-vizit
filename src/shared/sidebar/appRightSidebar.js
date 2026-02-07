"use client";
import { useState } from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarGroup,
} from "@/components/ui/sidebar";
import AvatarIcon from "@/assets/images/right-sidebar/userAvatar.svg";
import BmiCard from "../bmiCard";
import CompleteProfileCard from "../completeProfileCard";
import AskAnything from "../askAnything";
import SelectUser from "../selectUser";
import UserInfo from "../userInfo";
import CompleteProfileDialog from "../completeProfileDialog";
import CardItem from "../cardItem";
import { useSelector } from "react-redux";
import { isProfileCompleted } from "@/utils";

export default function AppRightSidebar() {

    const profileState = useSelector((state) => state.profile?.userProfile);
    const [openProfileDialog, setOpenProfileDialog] = useState(false);

    const handleOpenProfileDialog = () => setOpenProfileDialog(true);
    const handleCloseProfileDialog = () => setOpenProfileDialog(false);
    const profileCompleted = isProfileCompleted(profileState);

    return (
        <div className="right-sidebar">
            <Sidebar collapsible="icon" className="app-right-sidebar--bg rounded-r-3xl group-data-[side=left]:border-r-0 shadow-[0_0_6.4px_0_#0000000D] lg:w-xs">
                <SidebarHeader className="px-0 py-4 flex flex-row items-center justify-between">
                    <UserInfo />
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup className="p-0">
                        <SelectUser />
                        {/* <BmiCard /> */}
                        {/* <div className="space-y-2 mt-4">
                            <CardItem name={'Allergy'} desc="Avoid Penicillin and related antibiotics" isView={true} />
                            <CardItem name={'Medications'} desc="Take Blood Pressure Medication daily at 8 AM" isView={true} />
                        </div> */}
                        {!profileCompleted &&
                            <CompleteProfileCard onClick={handleOpenProfileDialog} />
                        }
                        <AskAnything />
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
            <CompleteProfileDialog
                from="sidebar"
                open={openProfileDialog}
                onClose={handleCloseProfileDialog}
            />
        </div>
    );
}
