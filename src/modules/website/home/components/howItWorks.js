import React from 'react'
import Image from 'next/image';
import ReportIcon from '@/assets/images/home/how-works/report.svg';
import AiReportIcon from '@/assets/images/home/how-works/ai-report.svg';
import InsightIcon from '@/assets/images/home/how-works/insight.svg';
import SecureIcon from '@/assets/images/home/how-works/secure.svg';

export default function HowItWorks() {

    const steps = [
        {
            step: "01",
            title: "Upload Your Report",
            description:
                "Upload lab tests, prescriptions, scans, or doctor notes.",
            bg: "bg-[#FAF9F9]",
            reverse: false,
            image: ReportIcon,
        },
        {
            step: "02",
            title: "AI Analyzes Your Report",
            description:
                "Our AI identifies the report type, extracts values, and explains them in simple language.",
            bg: "bg-[#F1FAF4]",
            reverse: true,
            image: AiReportIcon,
        },
        {
            step: "03",
            title: "Get Clear Insights",
            description:
                "See what’s normal, what needs attention, and what to avoid — without medical jargon.",
            bg: "bg-[#FAF9F9]",
            reverse: false,
            image: InsightIcon,
        },
        {
            step: "04",
            title: "Share Securely",
            description:
                "Share reports with doctors or family using OTP-based access or time-limited secure links.",
            bg: "bg-[#F1FAF4]",
            reverse: true,
            image: SecureIcon,
        },
    ];

    return (
        <section className="relative">
            <div className="mx-auto max-w-7xl lg:px-0 px-4 lg:py-12 py-8">
                <h2 className="lg:text-text-32 text-text-26 font-medium leading-tight text-black text-center lg:px-0 px-4">
                    How{" "}
                    <span className="text-brand-light-green font-extrabold">e-DigiHealth</span>
                    {" "}Works
                </h2>
                <div className="lg:mt-12 mt-6 lg:space-y-8 md:space-y-6 space-y-4">
                    {steps.map((item) => (
                        <div key={item.step} className={`relative flex flex-col lg:flex-row md:flex-row ${item.reverse ? "lg:flex-row-reverse md:flex-row-reverse lg:items-start md:items-start items-end" : "lg:items-start md:items-start items-start"} lg:gap-10 md:gap-6 gap-4`}>
                            <div className="lg:size-25 md:size-15 size-15 lg:rounded-4xl md:rounded-4xl rounded-2xl bg-[linear-gradient(223.71deg,_#6FCF97_20.25%,_#3D9D65_88.94%)] flex items-center justify-center">
                                <p className='text-white font-bold lg:text-2xl text-xl'>{item.step}</p>
                            </div>

                            <div className={`relative flex flex-1 flex-row ${item.reverse ? "flex-row-reverse" : ""} justify-between items-center gap-10 lg:rounded-4xl md:rounded-4xl rounded-2xl ${item.bg} lg:px-8 lg:py-8 md:px-6 md:py-6 px-4 py-4`}>
                                <h3 className="text-base lg:text-3xl md:text-xl font-semibold text-black">
                                    {item.title}
                                </h3>
                                <p className="max-w-3xs lg:text-lg md:text-base text-xs text-black font-medium">
                                    {item.description}
                                </p>
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    className='lg:w-[195px] md:w-[150px] w-[75px]'
                                    // width={160}
                                    // height={160}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
