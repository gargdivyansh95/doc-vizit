"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/images/app-logo.svg";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import NavItems from "@/assets/json/headerMenu.json";
import { HEADER_CTA_CONFIG } from "@/config";

export default function Header() {

  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isActive = (href) => href === "/" ? pathname === "/" : pathname.startsWith(href);
  const CTAS = HEADER_CTA_CONFIG[pathname];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 bg-header backdrop-blur-[24px] border-b-1 border-[#6FCF9733] ${scrolled ? "!bg-white transition-all ease-in-out duration-300" : ""}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between lg:px-0 px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="Decrypt Talent" priority className="w-50" />
        </Link>
        <nav className="hidden lg:flex gap-10 text-sm">
          {NavItems.menu.map((item) => (
            <Link key={item.href} href={item.href} className={cn("text-black hover:text-black transition-colors text-base font-medium", isActive(item.href) && "underline font-semibold")}> {item.label} </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          {CTAS.map((cta, i) => (
            <Button
              key={i}
              asChild
              variant={cta.variant || "default"}
              className={`cursor-pointer font-bold text-sm py-2 px-4 h-auto rounded-md border-brand-dark-green ${cta.variant === "default" ? "bg-brand-dark-green text-white hover:bg-brand-dark-green-hover hover:text-white" : "bg-transparent hover:bg-transparent text-brand-dark-green hover:text-brand-dark-green"} focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0`}
            >
              <Link href={cta.href}>{cta.label}</Link>
            </Button>
          ))}
        </div>

        {/* Mobile Toggle Button */}
        <button className="inline-flex items-center justify-center lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open} >
          {open ? (
            <X className="size-6 text-brand-blue" />
          ) : (
            <Menu className="size-6 text-brand-blue" />
          )}
        </button>
      </div>

      <div className={cn("lg:hidden border-t border-white/20 bg-black", "transition-all duration-300 ease-in-out overflow-hidden", open ? "max-h-96 opacity-100" : "max-h-0 opacity-0")}>
        <div className="mx-auto flex flex-col gap-2 px-8 pb-4 pt-3">
          {NavItems.menu.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={cn("py-1 text-sm text-white hover:text-white", isActive(item.href) && "font-semibold underline")} > {item.label} </Link>
          ))}
          <div className="flex items-center gap-3 mt-3">
            {CTAS.map((cta, i) => (
              <Button
                key={i}
                asChild
                variant={cta.variant || "default"}
                className={`cursor-pointer font-bold text-sm py-2 px-4 h-auto rounded-md border-brand-dark-green ${cta.variant === "default" ? "bg-brand-dark-green text-white hover:bg-brand-dark-green-hover hover:text-white" : "bg-transparent hover:bg-transparent text-brand-dark-green hover:text-brand-dark-green"} focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0`}
              >
                <Link href={cta.href}>{cta.label}</Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}