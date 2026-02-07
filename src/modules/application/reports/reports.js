"use client"
import React, { useEffect, useMemo, useState } from 'react'
import { LoaderIcon, Upload } from 'lucide-react';
import { CategoryItem, DeleteReportDialog, Loader, NoData, ReportCard, ShareReportDialog, UploadReportDialog } from '@/shared';
import Report1 from "@/assets/images/reports/report1.svg";
import Report2 from "@/assets/images/reports/report2.svg";
import { useForm } from 'react-hook-form';
import { DEVICE_TYPE, REPORT_TYPE, SORTING_TYPE } from '@/constants/enums';
import { ReportHeader } from './components';
import { useDeviceType } from '@/hooks';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { reportsActions } from './reports.action';
import { toast } from 'sonner';
import { Categories } from '@/assets/constantData';

const reportsData = [
    {
        id: "doc_101",
        type: "report",
        title: "Heart Report",
        category: "Reports",
        documentImage: Report1,
        uploadedAt: "03/01/2026",
        aiStatus: {
            state: "ANALYSING",
            progress: 20,
            summaryGenerated: false
        },
    },
    {
        id: "doc_102",
        type: "prescription",
        title: "Heart Prescriptions",
        category: "Prescriptions",
        documentImage: Report2,
        uploadedAt: "03/01/2026",
        aiStatus: {
            state: "COMPLETED",
            progress: 100,
            summaryGenerated: true
        },
    }
]

export const Reports = () => {

    const router = useRouter();
    const dispatch = useDispatch();
    const deviceType = useDeviceType();
    const isMobile = deviceType === DEVICE_TYPE.MOBILE;
    const [isLoading, setIsLoading] = useState(false);
    const [openUploadDialog, setOpenUploadDialog] = useState(false);
    const [openShareDialog, setOpenShareDialog] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(Categories[0]);
    const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
    const [reportsList, setReportsList] = useState([]);
    const [shareReportId, setShareReportId] = useState(null);
    const [deleteReportId, setDeleteReportId] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const { register, watch, control, setValue } = useForm({
        defaultValues: {
            searchReport: '',
            sorting: '',
            filters: {
                reportType: {
                    lab: false,
                    prescription: false
                },
                aiStatus: {
                    summary: false,
                    analysis: false,
                    notAnalyzed: false
                }
            }
        },
    });

    const searchValue = watch('searchReport');
    const sortingValue = watch('sorting');
    const filterValues = watch('filters');
    // console.log(filterValues, 'filterValues')

    const getReportList = () => {
        const payload = {
            search: searchValue,
            sort: sortingValue,
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
        getReportList();
    }, []);

    const handleSortChange = (value) => {
        setValue('sorting', value);
    };

    // function to search reports based on input, category, sorting, filters (report type, ai status)
    const filteredReports = useMemo(() => {
        let results = reportsData.filter((item) => {
            // search value filter
            const matchesSearch = item.title.toLowerCase().includes(searchValue.toLowerCase());
            const matchesCategory = selectedCategory.id === 'all' ||
                item.category.toLowerCase() === selectedCategory.label.toLowerCase();

            // report type filter
            // Report Type filter
            const reportTypeFilters = filterValues.reportType;
            const anyReportTypeSelected = Object.values(reportTypeFilters).some(v => v);
            const matchesReportType = !anyReportTypeSelected ||
                (reportTypeFilters.lab && item.type === REPORT_TYPE.LAB) ||
                (reportTypeFilters.prescription && item.type === REPORT_TYPE.PRESCRIPTION);

            // AI Status filter
            const aiStatusFilters = filterValues.aiStatus;
            const anyAiStatusSelected = Object.values(aiStatusFilters).some(v => v);
            const matchesAiStatus = !anyAiStatusSelected ||
                (aiStatusFilters.summary && item.aiStatus.summaryGenerated === REPORT_TYPE.SUMMARY_GENERTAED) ||
                (aiStatusFilters.analysis && item.aiStatus.state === REPORT_TYPE.ANALYSING) ||
                (aiStatusFilters.notAnalyzed && item.aiStatus.state === REPORT_TYPE.NOT_ANALYZED);

            return matchesSearch && matchesCategory && matchesReportType && matchesAiStatus;
        });

        switch (sortingValue) {
            case SORTING_TYPE.NEWEST:
                results.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
                break;
            case SORTING_TYPE.OLDEST:
                results.sort((a, b) => new Date(a.uploadedAt) - new Date(b.uploadedAt));
                break;
            case SORTING_TYPE.NAME_ASC:
                results.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case SORTING_TYPE.NAME_DESC:
                results.sort((a, b) => b.title.localeCompare(a.title));
                break;
            default:
                break;
        }

        return results;
    }, [searchValue, selectedCategory, filterValues, sortingValue]);

    const handleOpenUploadDialog = () => {
        setOpenUploadDialog(true);
    };

    const handleCloseUploadDialog = () => {
        setOpenUploadDialog(false);
    };

    const handleOpenShareDialog = (id) => {
        setShareReportId(id);
        setOpenShareDialog(true);
    };

    const handleCloseShareDialog = () => {
        setShareReportId(null);
        setOpenShareDialog(false);
    };

    const handleUpload = (data) => {
        if (data) {
            getReportList();
        }
    };

    const handleSelectCategory = (category) => {
        setSelectedCategory(category);
    }

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
        setIsDeleting(true);
        dispatch(reportsActions.postDeleteReport(
            payload,
            (response) => {
                if (response.success === true) {
                    toast.success(response.data.message || "Report deleted successfully");
                    setIsDeleting(false);
                    handleCloseDeleteDialog();
                    getReportList();
                }
            },
            (error) => {
                console.log(error, 'error details')
                setIsDeleting(false);
                toast.error(error.error);
            },
        ))
    }

    const handleView = (reportId) => {
        router.push(`/reports/report-details/${reportId}`);
    };

    return (
        <div className='relative'>
            <div className='lg:mb-6 md:mb-4 mb-3 flex items-center justify-between lg:gap-0 gap-4'>
                <h1 className="lg:text-3xl md:text-xl text-lg font-bold">Reports</h1>
                <ReportHeader
                    isMobile={isMobile}
                    register={register}
                    control={control}
                    sortingValue={sortingValue}
                    onSortChange={handleSortChange}
                    onUploadClick={handleOpenUploadDialog}
                />
            </div>
            <div>
                <div className="relative w-full overflow-x-auto scrollbar-hide">
                    <CategoryItem categories={Categories} selectedCategory={selectedCategory} onCategorySelect={handleSelectCategory} />
                </div>
                <div className='mt-6 lg:mb-0 md:mb-0 mb-10'>
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
            </div>
            {isMobile &&
                <div className='fixed bottom-8 left-0 right-0 px-4'>
                    <Button
                        type="submit"
                        size={'lg'}
                        className="w-full shadow-[0px_4px_4px_0px_#00000040] cursor-pointer bg-brand-dark-green text-white font-bold text-sm py-2 px-4 rounded-md hover:bg-brand-dark-green-hover focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                        onClick={handleOpenUploadDialog}
                    >
                        <Upload className="w-4 h-4" />
                        Upload Report
                    </Button>
                </div>
            }
            <UploadReportDialog open={openUploadDialog} onUpload={handleUpload} onClose={handleCloseUploadDialog} />
            <ShareReportDialog type="report" open={openShareDialog} currentReportId={shareReportId} onClose={handleCloseShareDialog} />
            <DeleteReportDialog open={openDeleteAlert} isLoading={isDeleting} onClose={handleCloseDeleteDialog} onDelete={handleDelete} />
        </div>
    )
}
