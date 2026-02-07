import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image';
import HistoryImage from '@/assets/images/home/health-history/history-bg.svg';
import CheckListIcon from '@/assets/images/home/health-history/check-list.svg';
import ShieldKeyIcon from '@/assets/images/home/health-history/shield-key.svg';
import FileUploadIcon from '@/assets/images/home/health-history/file-upload.svg';
import AiIcon from '@/assets/images/home/health-history/ai-audio.svg';
import SharedIcon from '@/assets/images/home/health-history/shared-drive.svg';
import { useDeviceType } from '@/hooks';
import { DEVICE_TYPE } from '@/constants/enums';

const CardBlock = ({title, icon}) => {
    return (
        <Card className="border-brand-dark-green rounded-xl shadow-none lg:py-6 lg:px-6 py-4 px-2">
            <CardContent className="p-0 text-left">
                <Image src={icon} alt={icon} />
                <p className="lg:mt-10 mt-6 lg:text-lg text-lg font-medium text-black">{title}</p>
            </CardContent>
        </Card>
    )
}

export default function HealthHistory() {

    const deviceType = useDeviceType();
    const isMobile = deviceType === DEVICE_TYPE.MOBILE;
    const isTablet = deviceType === DEVICE_TYPE.TABLET;

    return (
        <section className="relative">
            <div className="mx-auto max-w-7xl lg:px-0 px-4 lg:py-12 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 md:grid-cols-12 gap-6 items-center">
                    <div className="lg:col-span-5 md:col-span-6 col-span-12">
                        <h2 className="lg:text-text-32 text-text-26 font-medium leading-tight text-black lg:px-0 px-0 capitalize">
                            One secure place for your complete{" "}
                            <span className="text-brand-light-green font-extrabold">health history</span>
                        </h2>
                        <p className='text-black lg:text-lg text-base font-medium mt-2'>e-DigiHealth acts as your personal health vault — powered by AI, designed for families, and fully controlled by patients.</p>
                        {(isMobile) &&
                            <div className="mt-4">
                                <Image src={HistoryImage} alt="HistoryImage" className='w-full' />
                            </div>
                        }
                        <div className="grid grid-cols-12 lg:grid-cols-12 md:grid-cols-12 lg:gap-6 gap-4 lg:mt-8 mt-4">
                            <div className="lg:col-span-6 md:col-span-6 col-span-6">
                                <CardBlock title="Track trends across time" icon={CheckListIcon} />
                            </div>
                            <div className="lg:col-span-6 md:col-span-6 col-span-6">
                                <CardBlock title="Keep full ownership of your data" icon={ShieldKeyIcon} />
                            </div>
                        </div>
                    </div>
                    {isMobile ? null :
                        <div className="lg:col-span-7 md:col-span-6 col-span-12">
                            <Image src={HistoryImage} alt="HistoryImage" className='w-full' />
                        </div>
                    }
                </div>
                <div className="lg:mt-6 mt-4 grid grid-cols-12 md:grid-cols-12 lg:grid-cols-12 lg:gap-6 gap-4">
                    <div className='lg:col-span-4 md:col-span-4 col-span-6'>
                        <CardBlock title="Upload any medical report or prescription" icon={FileUploadIcon} />
                    </div>
                    <div className='lg:col-span-4 md:col-span-4 col-span-6'>
                        <CardBlock title="Get easy-to-understand AI summaries" icon={AiIcon} />
                    </div>
                    <div className='lg:col-span-4 md:col-span-4 col-span-12'>
                        <CardBlock title="Securely share with doctors or family" icon={SharedIcon} />
                    </div>
                </div>
            </div>
        </section>
    )
}
