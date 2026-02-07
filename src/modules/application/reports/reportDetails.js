/* eslint-disable react-hooks/set-state-in-effect */
"use client"
import React, { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FileText, GitCompare, LoaderIcon, Share2, Trash2, X } from 'lucide-react'
import Image from 'next/image'
import AiIcon from "@/assets/images/dashboard/ai-magic.svg";
import AiIconGradient from "@/assets/images/misc/ai-magic.svg";
import { Card, CardContent } from '@/components/ui/card'
import { CardItem, Loader, SelectReportDrawer, ShareReportDialog, ViewReportSidebar, WrongReportSelectDialog } from '@/shared'
import { useDeviceType } from '@/hooks'
import { DEVICE_TYPE } from '@/constants/enums'
import { RangeComparisonChart, VitalCard } from './components'
import { Tabs } from '@radix-ui/react-tabs'
import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { reportsActions } from './reports.action'
import { useDispatch } from 'react-redux'
import { generateReportType, generateTestNameString, parseRange, parseResult } from '@/utils'
import moment from 'moment'

export const ReportDetails = ({ reportId }) => {

    const dispatch = useDispatch();
    const deviceType = useDeviceType();
    const isMobile = deviceType === DEVICE_TYPE.MOBILE;
    const [isLoading, setIsLoading] = useState(true);
    const [openShareDialog, setOpenShareDialog] = useState(false);
    const [openReportSidebar, setOpenReportSidebar] = useState(false);
    const [openReportSelect, setOpenReportSelect] = useState(false);
    const [openWrongReportDialog, setOpenWrongReportDialog] = useState(false);
    const [reportDetails, setReportDetails] = useState({});
    const [isCompared, setIsCompared] = useState(false);
    const [comparedReport, setComparedReport] = useState([]);
    const result = JSON.parse(reportDetails?.ocrResult || '{}');
    const [activeTab, setActiveTab] = useState('');
    const [currentReportId, setCurrentReportId] = useState(null);
    const reportTypes = generateReportType(result?.tests);
    const testsList = isCompared ? comparedReport?.currentReport?.tests : result?.tests;

    // Prepare data for RangeComparisonChart
    const originalReport = result?.tests?.find(item => item.test_name === activeTab)
    const selectedReport = comparedReport?.selectedReport?.tests?.find(item => item.test_name === activeTab)
    const { min, max } = parseRange(originalReport?.reference_range);
    const originalValue = parseResult(originalReport?.result);
    const selectedValue = parseResult(selectedReport?.result);
    const aiSummaryReport = reportDetails?.aiSummaryReport?.summaryResult && JSON.parse(reportDetails?.aiSummaryReport?.summaryResult)
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
    if (isCompared) {
        chartData.push
            ({
                name: originalReport?.test_name,
                range: max - min,
                min,
                max,
                actual: selectedValue,
                unit: originalReport?.unit,
                month: moment(comparedReport?.selectedReport?.reportDate).format('MMM YYYY'),
                label: 'Selected',
            })
    }

    const getReportDetails = () => {
        const payload = {
            reportId: reportId
        };
        setIsLoading(true);
        dispatch(reportsActions.getReportDetailsById(
            payload,
            (response) => {
                if (response.success === true) {
                    setReportDetails(response.data);
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
        getReportDetails();
    }, []);

    useEffect(() => {
        if (result?.tests) {
            setActiveTab(result?.tests?.[0]?.test_name);
        }
    }, [reportDetails]);

    const handleOpenReportSidebar = () => {
        setOpenReportSidebar(true);
    };

    const handleCloseReportSidebar = () => {
        setOpenReportSidebar(false);
    };

    const handleOpenShareDialog = () => {
        setCurrentReportId(reportDetails?.documentID);
        setOpenShareDialog(true);
    };

    const handleCloseShareDialog = () => {
        setCurrentReportId(null);
        setOpenShareDialog(false);
    };

    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
    };

    const handleOpenReportSelect = () => {
        setOpenReportSelect(true);
    }

    const handleCloseReportSelect = () => {
        setOpenReportSelect(false);
    }

    const handleOpenWrongReportDialog = () => {
        setOpenWrongReportDialog(true);
    }

    const handleCloseWrongReportDialog = () => {
        setOpenWrongReportDialog(false);
    }

    const generateSummary = (data) => {
        setIsCompared(true);
        setComparedReport(data);
    }

    const handleClearComparison = () => {
        setIsCompared(false);
        setComparedReport([]);
    }

    const findReportHasGraphData = () => {
        return result?.tests?.some(item => item.has_graphdata !== 'no');
    }

    // const isDataReady = !isLoading && reportDetails && Object.keys(reportDetails).length > 0 && result?.tests?.length > 0 && activeTab;
    if (isLoading) {
        return (
            <Loader height="min-h-[90vh]" />
        );
    }

    return (
        <div className='relative'>
            <h1 className="lg:text-3xl md:text-xl text-lg font-bold lg:mb-6 md:mb-4 mb-2">Report Details</h1>
            <div className='flex lg:flex-row md:flex-row flex-col lg:items-center md:items-center items-start justify-between gap-4'>
                <div>
                    <h5 className="text-base font-semibold text-black">{reportDetails?.originalFileName}</h5>
                    <h5 className="text-base font-medium text-black">{generateTestNameString(reportTypes)}</h5>
                    <p className="text-sm font-medium text-brand-gray mt-0">Report Date: {result?.report_date ? moment(result?.report_date).format('DD/MM/YYYY') : ''}</p>
                    <p className="text-sm font-medium text-brand-gray mt-0">Uploaded on: {result?.createdAt ? moment(result?.createdAt).format('DD/MM/YYYY') : 'Not Available'}</p>
                </div>
                <div className='flex items-center gap-3'>
                    <Button onClick={handleOpenShareDialog}
                        className="cursor-pointer border-1 border-brand-light-gray shadow-sm bg-white text-black font-bold text-sm py-2 px-4 rounded-md hover:bg-white-hover focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                    >
                        <Share2 />
                        Share
                    </Button>
                    <Button onClick={handleOpenReportSidebar}
                        className="cursor-pointer border-1 border-brand-light-gray shadow-sm bg-white text-black font-bold text-sm py-2 px-4 rounded-md hover:bg-white-hover focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                    >
                        <FileText />
                        View Document
                    </Button>
                </div>
            </div>
            {/* <div className='flex items-center lg:justify-start md:justify-start justify-between gap-6 mt-4'>
                <Badge className={`text-white rounded-full text-sm font-medium lg:px-4 md:px-4 px-2 py-1 bg-brand-dark-green`}>
                    <Image src={AiIcon} alt="AiIcon" className="size-5" />
                    Ai Analysis Completed
                </Badge>
                <div className='flex items-center gap-2'>
                    <p className='text-black text-sm font-medium'>Confidence Level</p>
                    <Badge className={`text-white rounded-sm text-sm font-medium lg:px-4 md:px-4 px-2 py-1 bg-brand-dark-green`}>
                        HIGH
                    </Badge>
                </div>
            </div> */}
            {findReportHasGraphData() ?
                <div className="py-4 px-1 flex gap-4 relative overflow-x-auto whitespace-nowrap scrollbar-hide">
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
                    <Tabs defaultValue={isCompared ? comparedReport?.currentReport?.tests[0] : result?.tests?.[0]?.test_name} className="w-full" value={activeTab} onValueChange={handleTabChange}>
                        <div className='flex gap-4 justify-between items-center'>
                            <TabsList className='h-full gap-3 bg-transparent overflow-x-auto scrollbar-hide justify-start'>
                                {testsList?.map((item, index) => (
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
                            <div className='flex items-center gap-2'>
                                <Button
                                    onClick={handleOpenReportSelect}
                                    className="cursor-pointer bg-brand-dark-green text-white font-bold text-sm py-2 px-4 rounded-md hover:bg-brand-dark-green-hover focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                                >
                                    <GitCompare className="w-4 h-4" />
                                    Compare
                                </Button>
                                {isCompared &&
                                    <Button
                                        variant='outline'
                                        onClick={handleClearComparison}
                                        className="cursor-pointer bg-transparent hover:bg-transparent text-brand-dark-green hover:text-brand-dark-green font-bold text-sm py-2 px-4 rounded-md border-brand-dark-green shadow-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                                    >
                                        <X className="w-4 h-4" />
                                        Clear
                                    </Button>
                                }
                            </div>
                        </div>
                        <TabsContent value={activeTab} className="mt-4">
                            <div>
                                <RangeComparisonChart data={chartData} />
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            }
            {aiSummaryReport?.layman_summary &&
                <div className="mt-6 bg-[linear-gradient(223.71deg,rgba(111,207,151,0.13)_20.25%,rgba(61,157,101,0.13)_88.94%)] border-1 border-brand-light-green rounded-2xl px-3 py-3">
                    <div className="flex items-center gap-2">
                        <Image src={AiIconGradient} width={24} height={24} alt="AI Analysis" />
                        <p className="text-sm font-bold text-black">AI Summary</p>
                    </div>
                    <p className="text-sm font-medium text-black mt-2">
                        {aiSummaryReport?.layman_summary}
                    </p>
                    {aiSummaryReport?.risk_status &&
                        <p className="text-sm font-medium text-black italic mt-2">{aiSummaryReport?.risk_status}.</p>
                    }
                </div>
            }
            <div className='mt-6'>
                <Card className="rounded-2xl border-0 shadow-[0px_0px_6.4px_0px_rgba(0,0,0,0.06)] py-0">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-bold text-black">
                                    Key observations
                                </p>
                                <p className="mt-2 text-sm text-brand-gray font-semibold italic">
                                    Based on your report and doctor instructions
                                </p>
                            </div>
                            {/* {!isMobile &&
                                <CardItem name={'Allergy'} desc="Avoid Penicillin and related antibiotics" isView={false} />
                            } */}
                        </div>
                        {aiSummaryReport?.key_points?.length > 0 ?
                            <ul className="mt-1 list-disc pl-5 text-sm text-black text-medium space-y-1">
                                {aiSummaryReport?.key_points?.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul> :
                            <p className="text-base font-medium text-brand-gray mt-1">No key points found.</p>
                        }
                        {/* {isMobile &&
                            <div className='mt-3'>
                                <CardItem name={'Allergy'} desc="Avoid Penicillin and related antibiotics" isView={false} />
                            </div>
                        } */}
                    </CardContent>
                </Card>
            </div>
            <div className='mt-2'>
                <p className="text-sm text-brand-gray font-medium italic">e-DigiHealth does not provide medical advice or diagnosis.</p>
                <p className="text-sm text-brand-gray font-medium italic">Always consult a qualified healthcare professional for medical decisions.</p>
            </div>
            <SelectReportDrawer
                type="report"
                open={openReportSelect}
                data={reportDetails}
                currentReportId={reportDetails?.id}
                onClose={handleCloseReportSelect}
                onSubmit={generateSummary}
                onSelectWrong={handleOpenWrongReportDialog}
            />
            <WrongReportSelectDialog
                open={openWrongReportDialog}
                onClose={handleCloseWrongReportDialog}
                // onOpen={handleOpenReportSelect}
            />
            <ShareReportDialog type="report" open={openShareDialog} currentReportId={currentReportId} onClose={handleCloseShareDialog} />
            <ViewReportSidebar open={openReportSidebar} reportDetails={reportDetails} onClose={handleCloseReportSidebar} />
        </div>
    )
}
