import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Eye, MoreVertical, Share2, Trash2 } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import moment from 'moment'

export default function SummaryCard(props) {

    const result = JSON.parse(props?.item?.summaryResult || '{}');

    return (
        <Card className="w-full bg-white rounded-xl shadow-[0px_0px_4px_0px_#0000001A] border-0 overflow-hidden py-3 px-3">
            <CardContent className="p-0">
                <h3 className="text-base font-extrabold text-black mb-1 truncate cursor-pointer" onClick={() => props.handleView(props?.item?.summaryId)}>
                    {props?.item?.report_name}
                </h3>
                <Badge className={`text-black rounded-full text-xs font-medium px-2 py-1 bg-[#DBFFDB] mt-1`}>
                    {result?.risk_status ?? 'Not Available'}
                </Badge>
                <p className='text-sm text-black font-medium mt-2 truncate'>{result?.layman_summary}</p>
                <Separator className="my-2" />
                <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-black mb-1">{'Based on 1 report.'}</h3>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="bg-transparent cursor-pointer focus:outline-none">
                                <MoreVertical className="w-4 h-4 text-black" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-28 border-brand-light-gray shadow-[0px_0px_4px_0px_#0000000D]">
                            <DropdownMenuItem
                                onClick={() => props.handleView(props?.item?.summaryId)}
                                className="flex items-center gap-4 text-black font-bold text-sm cursor-pointer"
                            >
                                <Eye className="w-4 h-4 text-black" />
                                View
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => props.onOpenDialog(props?.item?.summaryId)}
                                className="flex items-center gap-4 text-black font-bold text-sm cursor-pointer"
                            >
                                <Share2 className="w-4 h-4 text-black" />
                                Share
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => props.handleOpenDeleteDialog(props?.item?.summaryId)}
                                className="flex items-center gap-4 text-black font-bold text-sm cursor-pointer"
                            >
                                <Trash2 className="w-4 h-4 text-black" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="flex items-center justify-between gap-2 mt-0">
                    {/* <p className="text-xs text-brand-gray font-medium">{props?.item?.createOn ? moment(props?.item?.createOn).format('MMM YYYY') : ''}</p> */}
                    <p className="text-xs text-brand-gray font-medium">Generated on: {props?.item?.createOn ? moment(props?.item?.createOn).format('DD/MM/YYYY') : ''}</p>
                </div>
            </CardContent>
        </Card>
    )
}
