/* eslint-disable react-hooks/set-state-in-effect */
"use client"
import React, { useEffect, useRef, useState } from 'react'
import { LoaderIcon, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SparklesIcon from "@/assets/images/dashboard/ai-dna.svg";
import Image from 'next/image';
import { HealthCard } from './components';
import { CategoryItem, DeleteReportDialog, Loader, NoData, ReportCard, ShareReportDialog, UploadReportDialog, WelcomeUploadDialog } from '@/shared';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { reportsActions } from '../reports/reports.action';
import { Categories } from '@/assets/constantData';
import { authActions } from '../auth/auth.action';
import { dashboardActions } from './dashboard.action';
import { RangeComparisonChart } from '../reports/components';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { parseRange, parseResult } from '@/utils';
import moment from 'moment';

export const Dashboard = () => {

    const router = useRouter();
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth);
    const profileState = useSelector((state) => state.profile);
    const [openWelcomeDialog, setOpenWelcomeDialog] = useState(false);
    const [openUploadDialog, setOpenUploadDialog] = useState(false);
    const [openShareDialog, setOpenShareDialog] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(Categories[0]);
    const [isLoading, setIsLoading] = useState(false);
    const [dashboardReport, setDashboardReport] = useState([]);
    const [reportsList, setReportsList] = useState([]);
    const [shareReportId, setShareReportId] = useState(null);
    const [deleteReportId, setDeleteReportId] = useState(null);
    const [activeTab, setActiveTab] = useState('');
    const result = dashboardReport && JSON.parse(dashboardReport?.[0]?.ocrResult || '{}');
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

    const findReportHasGraphData = () => {
        return result?.tests?.some(item => item.has_graphdata !== 'no');
    }

    const getMasterData = () => {
        setIsLoading(true);
        dispatch(authActions.fetchMasterData(
            {},
            (response) => {
                if (response.success === true) {
                    console.log(response, 'rrrr')
                }
            },
            (error) => {
                console.log(error, 'error list')
            },
        ))
    }

    const getDashboardReport = () => {
        const payload = {
            search: 'blood',
            sort: 'newest',
            filter: 'lab',
            userId: profileState?.userProfile?.customer_id
        };
        setIsLoading(true);
        dispatch(dashboardActions.fetchDashboardReport(
            payload,
            (response) => {
                if (response.success === true) {
                    setDashboardReport(response.data?.data);
                    setIsLoading(false);
                }
            },
            (error) => {
                console.log(error, 'error list')
                setIsLoading(false);
            },
        ))
    }

    const getReportList = () => {
        const payload = {
            search: '',
            sort: '',
            filter: ''
        };
        setIsLoading(true);
        dispatch(reportsActions.getReportsList(
            payload,
            (response) => {
                if (response.success === true) {
                    setReportsList(response.data);
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
        getMasterData();
        getDashboardReport();
        getReportList();
    }, []);

    useEffect(() => {
        if (!authState?.skipWelcome) {
            const timer = setTimeout(() => {
                setOpenWelcomeDialog(true);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [authState?.skipWelcome]);

    useEffect(() => {
        if (result?.tests) {
            setActiveTab(result?.tests?.[0]?.test_name);
        }
    }, [dashboardReport]);

    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
    };

    const handleSkip = () => {
        dispatch(authActions.skipWelcomeSuccess(true));
        setOpenWelcomeDialog(false);
    }

    const handleCloseWelcomeUploadDialog = () => {
        setOpenWelcomeDialog(false);
    };

    const handleOpenUploadDialog = () => {
        setOpenUploadDialog(true);
        setOpenWelcomeDialog(false);
    };

    const handleCloseUploadDialog = () => {
        setOpenUploadDialog(false);
    };

    const handleUpload = (data) => {
        if (data) {
            getReportList();
        }
    };

    const handleSelectCategory = (category) => {
        setSelectedCategory(category);
    };

    const handleView = (reportId) => {
        router.push(`/reports/report-details/${reportId}`);
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
        setDeleteReportId(null);
    };

    const handleDelete = () => {
        const payload = {
            reportId: deleteReportId,
        };
        dispatch(reportsActions.postDeleteReport(
            payload,
            (response) => {
                if (response.success === true) {
                    toast.success(response.data.message || "Report deleted successfully");
                    handleCloseDeleteDialog();
                    getReportList();
                }
            },
            (error) => {
                console.log(error, 'error details')
                toast.error(error.error);
            },
        ))
    }

    return (
        <div>
            <h1 className="lg:text-3xl md:text-xl text-lg font-bold lg:mb-6 md:mb-4 mb-2">Dashboard</h1>
            <Card className="relative w-full bg-bg-upload shadow-[0px_4px_4px_0px_#0000000A] rounded-2xl overflow-hidden lg:py-6 md:py-4 py-3">
                <div className="pointer-events-none absolute -left-30 top-0 h-[300px] w-[300px] -translate-y-1/2 rounded-full
                    bg-[radial-gradient(circle,rgba(255,255,255,0.45)_20%,rgba(255,255,255,0.25)_45%,rgba(255,255,255,0.1)_70%,transparent_90%)]
                    blur-2xl"
                />
                <CardContent className="relative lg:px-6 md:px-4 px-3">
                    <div className="flex-1">
                        <h2 className="text-white lg:text-2xl md:text-xl text-lg font-bold mb-4">
                            Upload your medical report
                        </h2>
                        <div className='flex lg:items-start md:items-start items-center justify-between lg:gap-0 gap-2'>
                            <div className="flex items-center gap-2">
                                <Image src={SparklesIcon} alt="Sparkles" />
                                <p className='lg:text-base md:text-sm text-xs font-medium text-white'>Get AI-powered health insights & tracking</p>
                            </div>
                            <div>
                                <Button
                                    type="submit"
                                    size={'lg'}
                                    className="cursor-pointer bg-white hover:bg-white text-brand-dark-green font-semibold text-sm py-2 px-4 rounded-lg shadow-none"
                                    onClick={handleOpenUploadDialog}
                                >
                                    <Upload className="w-4 h-4" />
                                    Upload Report
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            {result &&
                <div className='mt-5'>
                    <h4 className="lg:text-lg text-base font-bold">Your Health at a glance</h4>
                    {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                        {healthData.map((item, index) => (
                            <HealthCard key={item.id} item={item} isLast={index === healthData.length - 1} />
                        ))}
                    </div> */}
                    {isLoading ? (
                        <Loader height="h-60" />
                    ) :
                        <>
                            {findReportHasGraphData() ?
                                <div className="py-4 px-1 flex gap-4 relative overflow-x-auto whitespace-nowrap scrollbar-hide">
                                    {result?.tests?.map((item, index) => (
                                        <HealthCard key={index} data={item} />
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
                        </>
                    }
                </div>
            }
            {/* <div className='mt-5'>
                <h4 className="lg:text-lg text-base font-bold mb-3">Blood Glucose History</h4>
                <HistoryChart />
            </div> */}
            <div className='mt-5'>
                <h4 className="lg:text-lg text-base font-bold mb-3">Your Reports</h4>
                <div className="relative w-full mb-6 overflow-x-auto scrollbar-hide">
                    <CategoryItem categories={Categories} selectedCategory={selectedCategory} onCategorySelect={handleSelectCategory} />
                </div>
                {isLoading ? (
                    <Loader height="h-60" />
                ) : reportsList.length === 0 ? (
                    <NoData
                        label="No reports available"
                        icon={<Upload className="w-4 h-4" />}
                        buttonText="Upload Report"
                        onClick={handleOpenUploadDialog}
                    />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {reportsList.map((item) => (
                            <ReportCard
                                key={item.id}
                                item={item}
                                handleView={handleView}
                                onOpenDialog={handleOpenShareDialog}
                                onDeleteDialog={handleOpenDeleteDialog}
                            />
                        ))}
                    </div>
                )}
            </div>
            <WelcomeUploadDialog open={openWelcomeDialog} onClick={handleOpenUploadDialog} onClose={handleCloseWelcomeUploadDialog} onSkip={handleSkip} />
            <UploadReportDialog open={openUploadDialog} onUpload={handleUpload} onClose={handleCloseUploadDialog} />
            <ShareReportDialog open={openShareDialog} currentReportId={shareReportId} onClose={handleCloseShareDialog} />
            <DeleteReportDialog open={openDeleteAlert} onClose={handleCloseDeleteDialog} onDelete={handleDelete} />
        </div>
    )
}
