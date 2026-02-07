"use client";
import { Cta, Faqs, Newsletter } from "@/shared";
import { BuiltPrivacy, HealthCareChallenge, HealthHistory, HelpUnderstand, HomeBanner, HowItWorks, Testimonials, YourAbha } from "./components";

export const Home = () => {

  return (
    <div className="relative">
      <HomeBanner />
      <HealthCareChallenge />
      <div className="flex justify-center gap-4 items-center lg:mb-8 mb-3">
        <Cta />
      </div>
      <HealthHistory />
      <div className="flex justify-center gap-4 items-center lg:mb-6 mb-3">
        <Cta />
      </div>
      <div id="how-it-works">
        <HowItWorks />
      </div>
      <div className="flex justify-center gap-4 items-center lg:mb-6 mb-3">
        <Cta />
      </div>
      <HelpUnderstand />
      <BuiltPrivacy />
      <div id="your-abha">
        <YourAbha />
      </div>
      <Testimonials />
      <Faqs />
      <Newsletter />
    </div>
  );
};

export default Home;