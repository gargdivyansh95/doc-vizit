/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Eye, MoreVertical, Share2, Trash2 } from 'lucide-react'
import moment from 'moment';
import { generateReportType, generateTestNameString, generateUniqueTestTags } from '@/utils';
import Loader from './loader';

export default function ReportCard(props) {

    const [isLoading, setIsLoading] = useState(true);
    const result = JSON.parse(props?.item?.ocrResult || '{}');
    const reportTypes = generateReportType(result?.tests);
    const tags = generateUniqueTestTags(result?.tests);

    return (
        <Card className="w-full bg-white rounded-xl shadow-[0px_0px_4px_0px_#0000000A] border-0 overflow-hidden py-3 px-3">
            <CardContent className="p-0">
                <div className="relative w-full h-40 rounded-xl overflow-hidden cursor-pointer">
                    {isLoading && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/10 backdrop-blur-sm">
                            <Loader height="h-full" />
                        </div>
                    )}
                    {props?.item?.contentType === "application/pdf" ?
                        <iframe
                            src={`https://docs.google.com/viewer?url=${encodeURIComponent(props?.item?.publicLink)}&embedded=true`}
                            className="w-full h-[calc(90vh-80px)] border-0 rounded-lg"
                            title="Report PDF"
                            onLoad={() => setIsLoading(false)}
                        />
                        :
                        <img
                            src={props?.item?.publicLink}
                            alt="Report Image"
                            className="w-full max-h-[calc(90vh-80px)] object-cover rounded-lg"
                            onLoad={() => setIsLoading(false)}
                        />
                    }
                    {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                    <div className="w-full mx-auto absolute bottom-0 left-0 right-0">
                        <div className='flex items-center justify-between px-2'>
                            <p className="text-xs text-white font-medium">{props?.item?.aiStatus?.summaryGenerated ? 'AI analysis completed' : 'Analysing Document'}</p>
                            <Badge className={`text-white rounded-md text-xs font-medium px-2 py-1 bg-brand-dark-green`}>
                                {props?.item?.aiStatus?.summaryGenerated ? "AI Summary Generated" : `${props?.item?.aiStatus?.progress}%`}
                            </Badge>
                        </div>
                        {props?.item?.aiStatus?.progress < 100 ? (
                            <Progress
                                value={props?.item?.aiStatus?.progress}
                                className="mt-1 h-1.5 bg-[#C4C4C4] [&>div]:bg-brand-dark-green"
                            />
                        ) : <div className="mt-1 h-1.5" />}
                    </div> */}
                </div>
                <div className="mt-2 flex items-center justify-between">
                    <h3 className="text-base font-bold text-black truncate cursor-pointer" onClick={() => props.handleView(props?.item?.id)}>{props?.item?.originalFileName}</h3>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="bg-transparent cursor-pointer focus:outline-none">
                                <MoreVertical className="w-4 h-4 text-black" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-28 border-brand-light-gray shadow-[0px_0px_4px_0px_#0000000D]">
                            <DropdownMenuItem
                                onClick={() => props.handleView(props?.item?.id)}
                                className="flex items-center gap-4 text-black font-bold text-sm cursor-pointer"
                            >
                                <Eye className="w-4 h-4 text-black" />
                                View
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => props.onOpenDialog(props?.item?.documentID)}
                                className="flex items-center gap-4 text-black font-bold text-sm cursor-pointer"
                            >
                                <Share2 className="w-4 h-4 text-black" />
                                Share
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => props.onDeleteDialog(props?.item?.documentID)}
                                className="flex items-center gap-4 text-black font-bold text-sm cursor-pointer"
                            >
                                <Trash2 className="w-4 h-4 text-black" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="mt-1 flex gap-1 overflow-x-auto whitespace-nowrap scrollbar-hide">
                    <h3 className="text-base font-semibold text-black">{generateTestNameString(reportTypes)}</h3>
                </div>
                <div className="flex items-center gap-2 mt-1 justify-between">
                    <p className={`${props?.item?.reportType === 'Lab Report' ? "text-brand-mint" : "text-[#DA85FF]"} text-sm font-medium`}>{props?.item?.reportType}</p>
                    <p className="text-xs text-brand-gray font-medium">Report Date: {result?.report_date ? moment(result?.report_date).format('DD/MM/YYYY') : ''}</p>
                </div>
                <div className="mt-2 flex gap-1 overflow-x-auto whitespace-nowrap scrollbar-hide">
                    {tags.map((tag, index) => (
                        <Badge
                            key={index}
                            variant="secondary"
                            className="shrink-0 rounded-sm px-2 py-1 text-xs text-white font-medium bg-brand-mint"
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
