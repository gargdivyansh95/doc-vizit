/* eslint-disable react-hooks/set-state-in-effect */
"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import AiIcon from "@/assets/images/dashboard/ai-magic.svg";
import Image from 'next/image';
import { useDeviceType } from '@/hooks';
import { DEVICE_TYPE } from '@/constants/enums';
import { AiGeneratorAlert, DeleteReportDialog, Loader, NoData, SelectReportDrawer, ShareReportDialog } from '@/shared';
import { SummaryCard } from './components';
import { useRouter } from 'next/navigation';
import { aiSummaryActions } from './aiSummary.action';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { LoaderIcon } from 'lucide-react';

const healthInsights = [
    {
        id: 1,
        title: "Blood sugar slightly increased over time",
        status: "No critical risk detected",
        description: "Based on 2 reports",
        dateRange: "Jan 2026 - Feb 2026",
        lastUpdated: "12/01/2026",
        riskLevel: "low"
    },
    {
        id: 2,
        title: "Cholesterol level within normal range",
        status: "Healthy range",
        description: "Based on 3 reports",
        dateRange: "Dec 2025 - Feb 2026",
        lastUpdated: "10/02/2026",
        riskLevel: "normal"
    },
    {
        id: 3,
        title: "Blood pressure shows mild fluctuations",
        status: "Monitor regularly",
        description: "Based on 4 reports",
        dateRange: "Nov 2025 - Feb 2026",
        lastUpdated: "08/02/2026",
        riskLevel: "medium"
    }
];

export const AiSummary = () => {

    const router = useRouter();
    const dispatch = useDispatch();
    const deviceType = useDeviceType();
    const isMobile = deviceType === DEVICE_TYPE.MOBILE;
    const [openShareDialog, setOpenShareDialog] = useState(false);
    const [openReportSelect, setOpenReportSelect] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [summaryList, setSummaryList] = useState([]);
    const [shareReportId, setShareReportId] = useState(null);
    const [deleteReportId, setDeleteReportId] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const getAiSummaryList = () => {
        setIsLoading(true);
        dispatch(aiSummaryActions.getAISummaryList(
            {},
            (response) => {
                if (response.success === true) {
                    setSummaryList(response.data);
                    setIsLoading(false);
                }
            },
            (error) => {
                console.log(error, 'error list')
                setIsLoading(false);
            },
        ))
    }

    useEffect(() => {
        getAiSummaryList();
    }, []);

    const handleOpenReportSelect = () => {
        setOpenReportSelect(true);
    }

    const handleCloseReportSelect = () => {
        setOpenReportSelect(false);
    };

    const buildReportsPayload = (extractedData, reportId) => {
        const grouped = {};
        extractedData.tests.forEach((test) => {
            const category = test.category;
            if (!grouped[category]) {
                grouped[category] = {};
            }
            grouped[category][test.test_name] = test.unit
                ? `${test.result} ${test.unit}`
                : test.result;
        });
        return Object.keys(grouped).map((category) => ({
            test_name: category,
            report_id: reportId,
            report_date: extractedData.report_date ? moment(extractedData.report_date).format('YYYY-MM-DD') : '',
            ocr_result: grouped[category],
        }));
    };

    const handleGenerateSummary = (data) => {
        setIsGenerating(true);
        const extractedData = JSON.parse(data.ocrResult);
        const reports = buildReportsPayload(extractedData, data.documentID);
        const payload = {
            reports,
        };
        dispatch(aiSummaryActions.postGenerateAISummary(
            payload,
            (response) => {
                if (response?.success) {
                    toast.success(response?.data?.statusMsg || 'Summary generated successfully');
                    setIsGenerating(false);
                    getAiSummaryList();
                }
            },
            (error) => {
                console.error('Share report error:', error);
                setIsGenerating(false);
                toast.error(error.error || 'Something went wrong while generating summary');
            })
        );
    };

    const handleView = (summaryId) => {
        router.push(`/ai-summary/ai-summary-details/${summaryId}`);
    };

    const handleOpenShareDialog = (id) => {
        setShareReportId(id);
        setOpenShareDialog(true);
    };

    const handleCloseShareDialog = () => {
        setShareReportId(null);
        setOpenShareDialog(false);
    };

    const handleOpenDeleteDialog = (id) => {
        setOpenDeleteAlert(true);
        setDeleteReportId(id);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteAlert(false);
    };

    const handleDelete = () => {
        const payload = {
            summaryId: deleteReportId,
        };
        setIsDeleting(true);
        dispatch(aiSummaryActions.postDeleteAISummary(
            payload,
            (response) => {
                if (response.success === true) {
                    toast.success(response.data.message || "AI Summary deleted successfully");
                    setIsDeleting(false);
                    handleCloseDeleteDialog();
                    getAiSummaryList();
                }
            },
            (error) => {
                console.log(error, 'error details')
                setIsDeleting(false);
                toast.error(error.error);
            },
        ))
    }
    console.log(summaryList, 'summaryList')

    return (
        <div className='relative'>
            <div className='lg:mb-6 md:mb-4 mb-2'>
                <h1 className="lg:text-3xl md:text-xl text-lg font-bold mb-1">AI Health Summary</h1>
                <p className='text-base text-brand-gray font-medium'>Create a combined health summary by selecting one or more reports.</p>
            </div>
            <div className='z-1 relative'>
                <div className='flex flex-col items-center lg:mt-20 md:mt-12 mt-6'>
                    <h2 className="lg:text-4xl text-text-26 font-bold bg-clip-text text-transparent bg-bg-text lg:px-0 px-0 capitalize">
                        Select reports to generate
                    </h2>
                    <h2 className="lg:text-4xl text-text-26 font-bold bg-clip-text text-transparent bg-bg-text lg:px-0 px-0 capitalize">
                        AI summary
                    </h2>
                    <p className='text-base text-black font-medium mt-3 text-center'>Choose the medical reports you want us to analyze together.</p>
                    {!isMobile &&
                        <Button
                            onClick={handleOpenReportSelect}
                            size={'lg'}
                            className="mt-6 cursor-pointer bg-brand-dark-green text-white font-bold text-sm py-2 px-4 rounded-md hover:bg-brand-dark-green-hover focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                        >
                            <Image src={AiIcon} alt="AiIcon" className="size-5" />
                            Generate AI Summary
                        </Button>
                    }
                </div>
                <div className='mt-10'>
                    <h5 className='text-lg text-black font-semibold'>Last generated summary</h5>
                    <div className='mt-4 lg:mb-0 md:mb-0 mb-10'>
                        {isLoading ? (
                            <Loader height="h-60" />
                        ) : summaryList.length === 0 ? (
                            <NoData label="AI summary not generated yet" />
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {summaryList.map((item, index) => (
                                    <SummaryCard
                                        key={index} item={item}
                                        onOpenDialog={handleOpenShareDialog}
                                        handleView={handleView}
                                        handleOpenDeleteDialog={handleOpenDeleteDialog}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div
                className="fixed bottom-0 left-0 right-0 h-full pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse 150% 100% at 50% 100%, rgba(71, 167, 111, 0.5) 0%, rgba(95, 191, 138, 0.4) 0%, rgba(122, 214, 163, 0.3) 25%, rgba(230, 245, 238, 0.5) 50%, transparent 100%)',
                    // background: 'radial-gradient(ellipse 150% 100% at 50% 100%, rgba(71, 167, 111, 0.5) 0%, rgba(95, 191, 138, 0.5) 20%, rgba(122, 214, 163, 0.5) 45%, rgba(230, 245, 238, 0.5) 70%, transparent 100%)',
                }}
            />
            {isMobile &&
                <div className='fixed bottom-8 left-0 right-0 px-4 z-10'>
                    <Button
                        onClick={handleOpenReportSelect}
                        size={'lg'}
                        className="w-full shadow-[0px_4px_4px_0px_#00000040] cursor-pointer bg-brand-dark-green text-white font-bold text-sm py-2 px-4 rounded-md hover:bg-brand-dark-green-hover focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                    >
                        <Image src={AiIcon} alt="AiIcon" className="size-5" />
                        Generate AI Summary
                    </Button>
                </div>
            }
            <ShareReportDialog type="summary" open={openShareDialog} currentReportId={shareReportId} onClose={handleCloseShareDialog} />
            <SelectReportDrawer
                type="summary"
                open={openReportSelect}
                onClose={handleCloseReportSelect}
                onSubmit={handleGenerateSummary}
            />
            <AiGeneratorAlert open={isGenerating} />
            <DeleteReportDialog open={openDeleteAlert} isLoading={isDeleting} onClose={handleCloseDeleteDialog} onDelete={handleDelete} />
        </div>
    )
}
