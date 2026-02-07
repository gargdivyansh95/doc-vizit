/* eslint-disable react-hooks/set-state-in-effect */
"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Info, LoaderIcon, Share2 } from 'lucide-react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import AiIcon from "@/assets/images/dashboard/ai-magic.svg";
import CheckIcon from "@/assets/images/summary/checkmark-circle.svg";
import AlertIcon from "@/assets/images/summary/alert.svg";
import AiIconGradient from "@/assets/images/misc/ai-magic.svg";
import { AiInfoCard, AiPrecautionCard } from './components'
import { Loader, ShareReportDialog, ViewReportSidebar } from '@/shared'
import { aiSummaryActions } from './aiSummary.action'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { RangeComparisonChart, VitalCard } from '../reports/components'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { parseRange, parseResult } from '@/utils'

export const AiSummaryDetails = ({ summaryId }) => {

    const dispatch = useDispatch();
    const [openShareDialog, setOpenShareDialog] = useState(false);
    const [openReportSidebar, setOpenReportSidebar] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [summaryDetails, setSummaryDetails] = useState({});
    const [currentReportId, setCurrentReportId] = useState(null);
    const [activeTab, setActiveTab] = useState('');
    const summaryData = summaryDetails?.summaryResult && JSON.parse(summaryDetails?.summaryResult) || {};
    const result = summaryDetails?.ocr_result && JSON.parse(summaryDetails?.ocr_result) || {};
    const originalReport = result?.tests?.find(item => item.test_name === activeTab)
    const { min, max } = parseRange(originalReport?.reference_range);
    const originalValue = parseResult(originalReport?.result);
    let chartData = [
        {
            name: originalReport?.test_name,
            range: max - min,
            min,
            max,
            actual: originalValue,
            unit: originalReport?.unit,
            month: moment(result?.report_date).format('MMM YYYY'),
            label: 'Current',
        }
    ];

    const getAISummaryDetails = () => {
        const payload = {
            summaryId: summaryId
        };
        setIsLoading(true);
        dispatch(aiSummaryActions.getAISummaryDetailsById(
            payload,
            (response) => {
                if (response.success === true) {
                    setSummaryDetails(response.data);
                    setIsLoading(false);
                }
            },
            (error) => {
                console.log(error, 'error details')
                setIsLoading(false);
            },
        ))
    }

    useEffect(() => {
        getAISummaryDetails();
    }, []);

    useEffect(() => {
        if (result?.tests) {
            setActiveTab(result?.tests?.[0]?.test_name);
        }
    }, [summaryDetails]);

    const handleOpenReportSidebar = () => {
        setOpenReportSidebar(true);
    };

    const handleCloseReportSidebar = () => {
        setOpenReportSidebar(false);
    };

    const handleOpenShareDialog = () => {
        setCurrentReportId(summaryDetails?.summaryId);
        setOpenShareDialog(true);
    };

    const handleCloseShareDialog = () => {
        setCurrentReportId(null);
        setOpenShareDialog(false);
    };

    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
    };

    const findReportHasGraphData = () => {
        return result?.tests?.some(item => item.has_graphdata !== 'no');
    }

    if (isLoading) {
        return (
            <Loader height="min-h-[90vh]" />
        );
    }
    console.log(result, 'resultresult')
    console.log(summaryDetails, 'ddddddddddddd')

    return (
        <div className='relative'>
            <h1 className="lg:text-3xl md:text-xl text-lg font-bold lg:mb-6 md:mb-4 mb-2">AI Health Summary</h1>
            <div className='flex lg:flex-row md:flex-row flex-col lg:items-center md:items-center items-start justify-between lg:gap-4 md:gap-4 gap-2'>
                {/* <div>
                    <h5 className="text-base font-medium text-black">Based on
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="link" className="text-brand-dark-green text-base font-bold underline p-0 h-auto cursor-pointer ml-1.5">
                                    2 reports.
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                side="bottom"
                                align="start"
                                className="w-full px-3 py-2 rounded-xl border-0 shadow-[0px_4px_12.1px_0px_rgba(0,0,0,0.05)]"
                            >
                                <div>
                                    <p className='text-sm text-black font-medium'>Reports included in this summary.</p>
                                    <ul className="mt-1 list-disc pl-4 text-sm text-black text-medium space-y-1">
                                        <li>Blood Test – Jan 2026
                                            <Button variant="link" onClick={handleOpenReportSidebar}
                                                className="text-brand-dark-green text-sm font-bold underline p-0 h-auto cursor-pointer ml-1.5">
                                                View
                                            </Button>
                                        </li>
                                        <li>Blood Test – Feb 2026
                                            <Button variant="link" onClick={handleOpenReportSidebar}
                                                className="text-brand-dark-green text-sm font-bold underline p-0 h-auto cursor-pointer ml-1.5">
                                                View
                                            </Button>
                                        </li>
                                    </ul>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </h5>
                    <p className="text-sm font-medium text-brand-gray mt-1">Jan 2026 · Feb 2026</p>
                </div> */}
                <div>
                    <h5 className="text-base font-semibold text-black">{summaryDetails?.report_name}</h5>
                    <p className="text-sm font-medium text-brand-gray mt-0">Report Date: {moment(result?.report_date).format('DD MMM YYYY')}</p>
                </div>
                <div>
                    <h5 className="text-base font-medium text-black">Generated on</h5>
                    <p className="text-sm font-medium text-brand-gray mt-0">Last updated: {summaryDetails?.createOn ? moment(summaryDetails?.createOn).format('DD MMM YYYY') : ''}</p>
                </div>
                <div className='flex items-center lg:gap-3 md:gap-2 gap-2 flex-wrap'>
                    {/* <Button onClick={handleGenerateSummary}
                        className="cursor-pointer bg-brand-dark-green text-white font-bold text-sm lg:py-2 lg:px-4 md:py-2 md:px-2 py-2 px-2 rounded-md hover:bg-brand-dark-green-hover focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                    >
                        <Image src={AiIcon} alt="AiIcon" className="size-5" />
                        Regenerate Summary
                    </Button> */}
                    <Button onClick={handleOpenShareDialog}
                        className="cursor-pointer border-1 border-brand-light-gray shadow-sm bg-white text-black font-bold text-sm lg:py-2 lg:px-4 md:py-2 md:px-2 py-2 px-2 rounded-md hover:bg-white-hover focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                    >
                        <Share2 />
                        Share
                    </Button>
                </div>
            </div>
            <div className='mt-5'>
                <h4 className="lg:text-lg text-base font-bold">Key Points</h4>
                <Card className="rounded-2xl border-0 shadow-[0px_0px_6.4px_0px_rgba(0,0,0,0.06)] py-0 mt-3">
                    <CardContent className="p-4">
                        {/* <div className='flex items-center gap-3'>
                                <Image src={aiReportData?.status === 'normal' ? CheckIcon : AlertIcon} alt="CheckIcon" className='size-7' />
                                <p className="text-2xl font-medium text-black">
                                    {aiReportData.title}
                                </p>
                            </div> */}
                        <p className="text-lg font-medium text-black mb-2">{summaryData?.risk_status}</p>
                        {summaryData?.key_points?.length > 0 ?
                            <div className='space-y-3'>
                                {summaryData?.key_points?.map((item, idx) => (
                                    <AiInfoCard key={idx} data={item} />
                                ))}
                            </div> :
                            <p className="text-base font-medium text-brand-gray mt-2">No key points found.</p>
                        }

                    </CardContent>
                </Card>
            </div>
            <div className='mt-5'>
                <div className='flex items-center gap-3 mb-3'>
                    <h4 className="lg:text-lg text-base font-bold">Important for you <span className='text-sm text-brand-gray font-medium'>(Abnormal Findings)</span></h4>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Info className="h-5 w-5 cursor-pointer" />
                        </PopoverTrigger>
                        <PopoverContent
                            side="bottom"
                            align="start"
                            className="w-full px-3 py-2 rounded-xl border-0 shadow-[0px_4px_12.1px_0px_rgba(0,0,0,0.05)]"
                        >
                            <p className='text-sm text-brand-gray font-medium italic'>AI-generated summary to help you understand your reports.</p>
                            <p className='text-sm text-brand-gray font-medium italic'>Not a medical diagnosis.</p>
                        </PopoverContent>
                    </Popover>
                </div>
                {summaryData?.abnormal_findings?.length > 0 ?
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                        {summaryData?.abnormal_findings?.map((ele, idx) => {
                            return (
                                <AiPrecautionCard key={idx} data={ele} />
                            )
                        })}
                    </div> :
                    <p className='text-base text-brand-gray font-medium'>No Abnormal Findings Found</p>
                }
            </div>
            <div className='mt-5'>
                <h4 className="lg:text-lg text-base font-bold">Test Results</h4>
                {findReportHasGraphData() ?
                    <div className="py-2 px-1 flex gap-4 relative overflow-x-auto whitespace-nowrap scrollbar-hide">
                        {result?.tests?.map((item, index) => (
                            <VitalCard key={index} data={item} />
                        ))}
                    </div> :
                    <div className='mt-4'>
                        {result?.tests?.map((ele, idx) => (
                            <Card key={idx} className="rounded-2xl border-0 shadow-[0px_0px_6.4px_0px_rgba(0,0,0,0.06)] py-0">
                                <CardContent className="p-4 gap-2">
                                    <p className="lg:text-xl md:text-lg text-base font-medium text-black">{ele.test_name}</p>
                                    <p className="text-base font-medium text-black mt-1">
                                        {ele.result}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                }
                {findReportHasGraphData() &&
                    <div className='mt-2'>
                        <Tabs defaultValue={result?.tests?.[0]?.test_name} className="w-full" value={activeTab} onValueChange={handleTabChange}>
                            <div className='flex gap-4 justify-between items-center'>
                                <TabsList className='h-full gap-3 bg-transparent overflow-x-auto scrollbar-hide justify-start'>
                                    {result?.tests?.map((item, index) => (
                                        <TabsTrigger
                                            key={index}
                                            value={item.test_name}
                                            className="py-2 px-2 rounded-md border border-brand-light-gray text-left bg-white flex flex-col h-auto cursor-pointer
                                                data-[state=active]:border-brand-dark-green data-[state=active]:text-brand-dark-green
                                                data-[state=active]:shadow-none items-start"
                                        >
                                            {item.test_name}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                            </div>
                            <TabsContent value={activeTab} className="mt-4">
                                <div>
                                    <RangeComparisonChart data={chartData} />
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                }
            </div>
            <div className="mt-5 bg-[linear-gradient(223.71deg,rgba(111,207,151,0.13)_20.25%,rgba(61,157,101,0.13)_88.94%)] border-1 border-brand-light-green rounded-2xl px-3 py-3">
                <div className="flex items-center gap-2">
                    <Image src={AiIconGradient} width={24} height={24} alt="AI Analysis" />
                    <p className="text-sm font-bold text-black">AI Summary</p>
                </div>
                <p className="text-sm font-medium text-black mt-2">
                    {summaryData?.layman_summary}
                </p>
            </div>
            <ViewReportSidebar open={openReportSidebar} publicLink={null} onClose={handleCloseReportSidebar} />
            <ShareReportDialog type="summary" open={openShareDialog} currentReportId={currentReportId} onClose={handleCloseShareDialog} />
        </div>
    )
}
