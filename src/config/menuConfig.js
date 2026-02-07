"use client";
import DashboardBlackIcon from "@/assets/images/sidebar/dashboard-black.svg";
import DashboardWhiteIcon from "@/assets/images/sidebar/dashboard-white.svg";
import ReportBlackIcon from "@/assets/images/sidebar/report-black.svg";
import ReportWhiteIcon from "@/assets/images/sidebar/report-white.svg";
import AIBlackIcon from "@/assets/images/sidebar/ai-black.svg";
import AIWhiteIcon from "@/assets/images/sidebar/ai-white.svg";
import UserBlackIcon from "@/assets/images/sidebar/manage-black.svg";
import UserWhiteIcon from "@/assets/images/sidebar/manage-white.svg";

const MENUS = [
    { id: 1, title: "Dashboard", href: "/dashboard", iconInActive: DashboardBlackIcon, iconActive: DashboardWhiteIcon },
    { id: 2, title: "Reports", href: "/reports", iconInActive: ReportBlackIcon, iconActive: ReportWhiteIcon },
    { id: 3, title: "AI Summary", href: "/ai-summary", iconInActive: AIBlackIcon, iconActive: AIWhiteIcon },
    { id: 4, title: "Family Management", href: "/family-management", iconInActive: UserBlackIcon, iconActive: UserWhiteIcon },
];

export default MENUS;