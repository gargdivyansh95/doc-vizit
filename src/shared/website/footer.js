"use client";
import React from "react";
import Image from "next/image";
import logo from "@/assets/images/app-logo.svg";
import FacebookIcon from "@/assets/images/footer/facebook.svg";
import TwitterIcon from "@/assets/images/footer/twitter.svg";
import InstagramIcon from "@/assets/images/footer/instagram.svg";
import NavItems from "@/assets/json/footerMenu.json";

export default function Footer() {
    return (
        <footer>
            <div className="w-full bg-black text-white">
                <div className="mx-auto max-w-7xl lg:px-0 px-4 py-10 lg:py-20">
                    <div className="grid grid-cols-12 sm:grid-cols-12 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-4 md:col-span-12 col-span-12">
                            <div className="lg:pr-12 pr-0">
                                <Image src={logo} alt="Decrypt Talent" priority />
                                <p className="text-lg text-white font-bold mt-1">Your Health. Your Data. Your Control.</p>
                                <p className="text-sm text-white font-regular mt-3">e-DigiHealth helps you securely store, understand, and share your medical records using AI — while keeping you in full control of your data.</p>
                                <div className="flex items-center gap-4 mt-4">
                                    <a href="#" aria-label="Facebook" className="p-2 border-brand-light-green border rounded-full">
                                        <Image src={FacebookIcon} alt="facebook" className="w-5 h-5 md:w-6 md:h-6" priority />
                                    </a>
                                    <a href="#" aria-label="Instagram" className="p-2 border-brand-light-green border rounded-full">
                                        <Image src={InstagramIcon} alt="instagram" className="w-5 h-5 md:w-6 md:h-6" priority />
                                    </a>
                                    <a href="#" aria-label="X / Twitter" className="p-2 border-brand-light-green border rounded-full">
                                        <Image src={TwitterIcon} alt="twitter" className="w-5 h-5 md:w-6 md:h-6" priority />
                                    </a>
                                </div>
                                <p className="text-sm text-white font-regular mt-3">Email: support@eDigiHealth.com</p>
                            </div>
                        </div>
                        <div className="lg:col-span-8 md:col-span-12 col-span-12">
                            <div className="grid grid-cols-12 sm:grid-cols-12 lg:grid-cols-12 gap-8">
                                <div className="lg:col-span-4 md:col-span-4 col-span-6">
                                    <ul className="space-y-6">
                                        {NavItems.col1.map((data) => (
                                            <li key={data.href}>
                                                <a href={data.href} className="text-sm md:text-base font-normal text-white">
                                                    {data.label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="lg:col-span-4 md:col-span-4 col-span-6">
                                    <ul className="space-y-6">
                                        {NavItems.col2.map((data) => (
                                            <li key={data.href}>
                                                <a href={data.href} className="text-sm md:text-base font-normal text-white">
                                                    {data.label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="lg:col-span-4 md:col-span-4 col-span-6">
                                    <ul className="space-y-6">
                                        {NavItems.col3.map((data) => (
                                            <li key={data.href}>
                                                <a href={data.href} className="text-sm md:text-base font-normal text-white">
                                                    {data.label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom copyright bar */}
            <div className="w-full bg-footer-bottom-bar-gradient border-t border-white/10">
                <div className="mx-auto max-w-7xl px-6 py-6">
                    <p className="text-center text-sm md:text-lg font-medium text-[#0f172a]">Copyright 2026 e-DigiHealth - All Rights Reserved</p>
                </div>
            </div>
        </footer>
    );
}
