"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Info } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import VitalInfoChart from "./vitalInfoChart"
import { getResultStatus } from "@/utils"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export default function VitalCard({ data }) {

    const resultStatus = getResultStatus(data.result, data.reference_range);

    return (
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
                        <div className="flex items-center gap-3">
                            <Badge className={`text-white rounded-sm text-sm font-medium px-2 py-1 ${resultStatus === 'Looks Good' ? 'bg-brand-dark-green' : resultStatus === 'High' ? 'bg-brand-yellow' : 'bg-brand-red'}`}>
                                {resultStatus}
                            </Badge>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Info className="h-5 w-5 cursor-pointer" />
                                </PopoverTrigger>
                                <PopoverContent
                                    side="bottom"
                                    align="end"
                                    className="w-sm p-0 pt-3 rounded-xl border-0 shadow-[0px_4px_61.7px_0px_rgba(0,0,0,0.25)]"
                                >
                                    <VitalInfoChart />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                }
            </CardContent>
        </Card>
    )
}
