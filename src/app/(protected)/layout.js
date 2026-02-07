"use client";
import { SidebarProvider } from "@/components/ui/sidebar";
import dynamic from "next/dynamic";
import { AppLeftSidebar } from "@/shared";
import { useDeviceType } from "@/hooks";
import { DEVICE_TYPE } from "@/constants/enums";

const MobileHeader = dynamic(
  () => import("@/shared").then((mod) => ({ default: mod.MobileHeader })),
  {
    ssr: false,
    // loading: () => <div className="h-16 bg-black border-b" />
  }
);

const MobileRightSidebar = dynamic(
  () => import("@/shared").then((mod) => ({ default: mod.MobileRightSidebar })),
  { ssr: false }
);

const AppRightSidebar = dynamic(
  () => import("@/shared").then((mod) => ({ default: mod.AppRightSidebar })),
  { ssr: false }
);

export default function AdminLayout({ children }) {
  const deviceType = useDeviceType();
  const isMobile = deviceType === DEVICE_TYPE.MOBILE;
  const isTablet = deviceType === DEVICE_TYPE.TABLET;
  const isDesktop = deviceType === DEVICE_TYPE.DESKTOP;
  
  const isMobileOrTablet = isMobile || isTablet;

  return (
    <SidebarProvider className="bg-[#FAFEFE] lg:flex-row flex-col">
      {/* Left Sidebar - Desktop only */}
      {isDesktop && (
        <aside className="hidden lg:block">
          <AppLeftSidebar />
        </aside>
      )}
      
      {/* Mobile Header - Mobile + Tablet */}
      {isMobileOrTablet && <MobileHeader />}
      
      {/* Main Content */}
      <main className={`flex-1 overflow-x-hidden ${isMobileOrTablet ? 'mt-16 p-4' : 'p-6'}`}>
        {children}
      </main>
      
      {/* Right Sidebar - Desktop only */}
      {isDesktop && (
        <aside className="hidden lg:block">
          <AppRightSidebar />
        </aside>
      )}
      
      {/* Mobile Right Sidebar - Mobile + Tablet */}
      {isMobileOrTablet && <MobileRightSidebar />}
    </SidebarProvider>
  );
}
