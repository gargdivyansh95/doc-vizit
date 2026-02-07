import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
// import { HEALTH_STATUS } from '@/constants/enums'
// import Image from 'next/image'
// import AiIcon from "@/assets/images/dashboard/ai-magic.svg";
// import DownIcon from "@/assets/images/dashboard/trend-down.svg";
// import UpIcon from "@/assets/images/dashboard/trend-up.svg";
// import NormalIcon from "@/assets/images/dashboard/trend-normal.svg";
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { getResultStatus } from '@/utils'

export default function HealthCard({data}) {

    const resultStatus = getResultStatus(data.result, data.reference_range);

    return (
        // <div className={`${isLast ? "col-span-2 lg:col-span-1 md:col-span-1" : ""}`}>
        //     <Card className="rounded-xl shadow-[0px_0px_4px_0px_#0000000A] border-0 lg:py-4 lg:px-4 md:py-3 md:px-3 py-3 px-3">
        //         <CardContent className="p-0">
        //             <div className="flex items-center justify-between lg:mb-4 mb-2">
        //                 <h4 className="text-sm font-semibold text-black">{item?.name}</h4>
        //                 <Image  src={item?.isNormal === HEALTH_STATUS.HIGH ? DownIcon : item?.isNormal === HEALTH_STATUS.ELEVATED ? UpIcon : NormalIcon} alt="ai-icon" className="w-5 h-5" />
        //             </div>
        //             <div className="flex items-end gap-1 lg:mb-4 mb-2">
        //                 <h6 className="lg:text-lg text-base font-medium text-black">{item?.score}</h6>
        //                 <p className="text-xs text-brand-gray mb-1">{item?.unit}</p>
        //             </div>
        //             <Badge className={`text-white rounded-full text-xs font-medium px-2 py-1 ${item?.isNormal === HEALTH_STATUS.HIGH ? "bg-[#FF776A]" : item?.isNormal === HEALTH_STATUS.ELEVATED ? "bg-[#FFAD6A]" : "bg-[#0CBE14]"}`}>
        //                 <Image src={AiIcon} alt="ai-icon" className="w-4 h-4" />
        //                 {item?.isNormal === HEALTH_STATUS.HIGH ? " Slightly High" : item?.isNormal === HEALTH_STATUS.ELEVATED ? " Slightly Elevated" : "Healthy"}
        //             </Badge>
        //         </CardContent>
        //     </Card>
        // </div>
        <Card className="rounded-2xl border-0 shadow-[0px_0px_6.4px_0px_rgba(0,0,0,0.06)] py-0 lg:w-lg md:w-lg w-xs flex-shrink-0">
            <CardContent className="flex flex-col justify-between p-4 gap-2">
                <div className="flex items-center justify-between gap-4">
                        <Tooltip className="lg:w-[70%] md:w-[70%] w-[60%]">
                            <TooltipTrigger className="lg:text-xl md:text-lg text-base font-medium text-black truncate">{data.test_name}</TooltipTrigger>
                            <TooltipContent>
                                <p>{data.test_name}</p>
                            </TooltipContent>
                        </Tooltip>
                    <p className="lg:text-xl md:text-lg text-base font-medium text-black lg:w-[30%] md:w-[30%] w-[40%] text-right">
                        {data.result}{data.unit ? ` ${data.unit}` : ''}
                    </p>
                </div>
                {data?.reference_range &&
                    <div className="flex lg:flex-row md:flex-row flex-col lg:items-center md:items-center items-start justify-between lg:gap-3 md:gap-3 gap-2 flex-1">
                        <p className="text-base text-brand-gray font-medium">
                            Normal range: {data.reference_range}{data.unit ? ` ${data.unit}` : ''}
                        </p>
                        <Badge className={`text-white rounded-sm text-sm font-medium px-2 py-1 ${resultStatus === 'Looks Good' ? 'bg-brand-dark-green' : resultStatus === 'High' ? 'bg-brand-yellow' : 'bg-brand-red'}`}>
                            {resultStatus}
                        </Badge>
                    </div>
                }
            </CardContent>
        </Card>
    )
}
