"use client";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { MENUS } from '@/config';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default function MenuList({ pathname }) {
  return (
    <SidebarMenu className='gap-4'>
      {MENUS.map((item) => {
        // const isActive = pathname === item.href;
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton asChild>
              <Link
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 h-10 rounded-lg font-semibold text-sm
                  ${isActive ? "bg-brand-dark-green text-white hover:!bg-brand-dark-green hover:!text-white" : "text-black"}`}
              >
                <Image src={isActive ? item?.iconActive : item?.iconInActive} alt={item.title} />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  )
}
