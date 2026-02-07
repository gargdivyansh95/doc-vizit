import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PeopleImage from "@/assets/images/home/banner/banner-img.svg";
import MobilePeopleImage from "@/assets/images/home/banner/mobile-banner-img.svg";
import FlagIcon from "@/assets/images/misc/flag.svg";
import PatientIcon from '@/assets/images/home/banner/shield-user.svg';
import AiIcon from '@/assets/images/home/banner/ai-content.svg';
import { useDeviceType } from "@/hooks";
import { DEVICE_TYPE } from "@/constants/enums";
import { Cta } from "@/shared";

const Counter = () => {
  return (
    <div className="lg:mt-10 mt-4 grid grid-cols-3 lg:gap-6 gap-2 rounded-xl bg-white lg:p-6 md:p-4 p-2 shadow-[0px_0px_24.5px_0px_#00000014] w-full">
      <div className="text-center">
        <p className="lg:text-4xl md:text-2xl text-xl font-bold text-black">90<span className="bg-clip-text text-transparent bg-bg-ai">%+</span></p>
        <p className="lg:text-sm text-xs text-black font-semibold mt-1">
          Reports auto-categorized by AI
        </p>
      </div>
      <div className="text-center">
        <p className="lg:text-4xl md:text-2xl text-xl font-bold text-black">10<span className="bg-clip-text text-transparent bg-bg-ai">×</span></p>
        <p className="lg:text-sm text-xs text-black font-semibold mt-1">
          Faster understanding of reports
        </p>
      </div>
      <div className="text-center">
        <p className="lg:text-4xl md:text-2xl text-xl font-bold text-black">1</p>
        <p className="lg:text-sm text-xs text-black font-semibold mt-1">
          Click explanations for every test
        </p>
      </div>
    </div>
  )
}

export default function HomeBanner() {

  const deviceType = useDeviceType();
  const isMobile = deviceType === DEVICE_TYPE.MOBILE;
  const isTablet = deviceType === DEVICE_TYPE.TABLET;

  const handleKnowAbha = () => {
    const section = document.getElementById("your-abha");
    section?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className="relative w-full overflow-hidden bg-home-gradient">
      <div className="relative z-10 mx-auto max-w-7xl lg:px-0 px-4 lg:pt-34 lg:pb-10 md:pt-26 md:pb-10 pt-24 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 md:grid-cols-12 lg:gap-0 md:gap-2 gap-4 lg:items-center md:items-start">
          <div className="lg:col-span-7 md:col-span-6 col-span-12">
            <div className="lg:max-w-xl max-w-full">
              <Badge className="border-brand-light-green rounded-full bg-transparent flex items-center gap-3 px-3 py-1.5">
                <Image src={FlagIcon} alt="" />
                <p className="text-sm font-semibold bg-clip-text text-transparent bg-bg-ai"> Built for India </p>
              </Badge>
              <h1 className="mt-4 lg:text-[42px] text-3xl font-bold leading-tight text-black">
                AI That Helps You Understand Your{" "}
                <span className="text-brand-light-green font-extrabold">Medical Reports.</span>
              </h1>
              <p className="lg:mt-6 mt-2 text-lg font-medium text-black">
                e-DigiHealth securely organizes, analyzes, and explains your medical
                reports — so you and your family always know what matters.
              </p>
            </div>
            <div className="lg:mt-6 mt-4 lg:max-w-sm md:max-w-sm max-w-full">
              <div className="flex items-center justify-between gap-4 mb-3">
                <Cta />
              </div>
              <Button
                variant='outline'
                size={'lg'}
                onClick={handleKnowAbha}
                className="w-full cursor-pointer bg-white hover:bg-white text-brand-dark-green hover:text-brand-dark-green font-bold text-sm py-2 px-4 rounded-md border-brand-dark-green shadow-none"
              >
                Know More About ABHA
              </Button>
              <div className="flex items-center gap-2 mt-4 justify-between">
                <div className="flex items-center gap-2">
                  <Image src={PatientIcon} alt="user-icon" />
                  <p className="text-sm font-semibold bg-clip-text text-transparent bg-bg-ai">Patient-owned data</p>
                </div>
                <div className="flex items-center gap-2">
                  <Image src={AiIcon} alt="ai-icon" />
                  <p className="text-sm font-semibold bg-clip-text text-transparent bg-bg-ai">AI-powered insights</p>
                </div>
              </div>
            </div>
            {isMobile || isTablet ? null :
              <Counter />
            }
          </div>

          <div className="lg:col-span-5 md:col-span-6 col-span-12">
            <div className="lg:flex lg:justify-end block">
              <div className="relative">
                <Image src={isMobile || isTablet ? MobilePeopleImage : PeopleImage} alt="Happy Family" priority className="w-full" />
                <div className="absolute bottom-0 right-[50%] left-[50%] lg:translate-x-[-38%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center w-full">
                  <p className="text-xs text-white mb-0">
                    e-DigiHealth does not provide medical advice or diagnosis.
                  </p>
                  <p className="text-xs text-white mb-0">
                    Always consult a qualified healthcare professional.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {(isMobile || isTablet) &&
          <Counter />
        }
      </div>
    </section>
  );
}
