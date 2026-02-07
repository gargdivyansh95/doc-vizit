"use client";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarGroup,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AppLogo from "@/assets/images/app-logo.svg";
import MenuList from "../menu/menuList";

export default function AppLeftSidebar() {

    const pathname = usePathname();

    return (
        <Sidebar collapsible="icon" className="app-sidebar--bg rounded-r-3xl group-data-[side=left]:border-r-0 shadow-[0_0_6.4px_0_#0000000D]">
            <SidebarHeader className="px-0 py-4 items-center">
                <Link href="/dashboard">
                    <Image src={AppLogo} alt="logo" className="w-[180px]" />
                </Link>
            </SidebarHeader>
            <SidebarContent className="mt-6">
                <SidebarGroup className="p-0">
                    <MenuList pathname={pathname} />
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}

