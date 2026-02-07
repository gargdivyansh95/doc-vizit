/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/set-state-in-effect */
"use client"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import CategoryItem from "./categoryItem";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import { reportsActions } from "@/modules/application/reports/reports.action";
import { useDispatch } from "react-redux";
import { generateReportType, generateTestNameString, generateUniqueTestTags } from "@/utils";
import moment from "moment";
import { Categories } from "@/assets/constantData";
import Loader from "./loader";
import NoData from "./noData";

export default function SelectReportDrawer({ type, open, data, currentReportId, onClose, onSubmit, onSelectWrong }) {

    const dispatch = useDispatch();
    const [reportsList, setReportsList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(Categories[0]);
    const [selectedReport, setSelectedReport] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingAsset, setIsLoadingAsset] = useState(true);
    const extractOcrData = data?.ocrResult ? JSON.parse(data?.ocrResult) : null;
    const parseSelectedReport = selectedReport ? JSON.parse(selectedReport?.ocrResult) : null;

    const setA = Array.from(new Set(extractOcrData?.tests?.map(item => item?.test_name.toLowerCase())));
    const setB = new Set(parseSelectedReport?.tests?.map(item => item?.test_name.toLowerCase()));
    const findIntersection = setA.filter(item => setB.has(item?.toLowerCase()));

    const findExtractedOCRData = extractOcrData?.tests?.filter((item) => {
        return findIntersection.includes(item?.test_name.toLowerCase());
    })

    const findSelectedOCRData = parseSelectedReport?.tests?.filter((item) => {
        return findIntersection.includes(item?.test_name.toLowerCase());
    })

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
                    const filterReports = response.data.filter(item => item?.id !== currentReportId);
                    setReportsList(filterReports);
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
        if (open) {
            getReportList();
        }
    }, [open]);

    useEffect(() => {
        if (reportsList.length > 0) {
            setSelectedReport(reportsList[0]);
        }
    }, [reportsList]);

    const handleSelectCategory = (category) => {
        setSelectedCategory(category);
    }

    const handleSelectReport = (report) => {
        setSelectedReport(report);
    }

    const handleGenerateReport = () => {
        if (type === 'report') {
            if (findIntersection.length === 0) {
                onSelectWrong();
                return;
            }
            if (onSubmit) {
                onSubmit({
                    currentReport: {
                        tests: findExtractedOCRData,
                    },
                    selectedReport: {
                        tests: findSelectedOCRData,
                        reportDate: JSON.parse(selectedReport?.ocrResult)?.report_date
                    }
                });
                onClose();
            }
        } else if (type === 'summary') {
            onClose();
            if (onSubmit) {
                onSubmit(selectedReport);
            }
        }
    }

    const handleClose = () => {
        setReportsList([]);
        onClose();
    }

    return (
        <Sheet open={open} onOpenChange={handleClose}>
            <SheetContent className="lg:max-w-3xl md:max-w-3xl w-[90%] [&>button]:cursor-pointer [&>button]:opacity-100 [&>button]:focus:ring-0 [&>button]:focus:ring-transparent [&>button]:focus:ring-offset-0">
                <SheetHeader>
                    <SheetTitle className="text-2xl font-medium text-black text-left">Select Report</SheetTitle>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto px-4">
                    <div className="relative w-full mb-6 overflow-x-auto scrollbar-hide">
                        <CategoryItem categories={Categories} selectedCategory={selectedCategory} onCategorySelect={handleSelectCategory} />
                    </div>
                    {isLoading ?
                        <Loader height="h-60" /> :
                        reportsList.length === 0 ? (
                            <NoData label="No reports available" />
                        ) :
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                                {reportsList.map((item) => {
                                    const result = JSON.parse(item?.ocrResult || '{}');
                                    const reportTypes = generateReportType(result?.tests);
                                    const tags = generateUniqueTestTags(result?.tests);
                                    return (
                                        <Card key={item.id} className={`w-full bg-white rounded-xl overflow-hidden py-2 px-2 cursor-pointer ${item?.id === selectedReport?.id ? "border-brand-dark-green shadow-[0px_0px_14px_0px_rgba(71,167,111,0.34)]" : "border-white shadow-[0px_0px_4px_0px_#0000001A]"} transition-all ease-in-out duration-300`} onClick={() => handleSelectReport(item)}>
                                            <CardContent className="p-0">
                                                <div className="relative w-full h-40 rounded-xl overflow-hidden">
                                                    {isLoadingAsset && (
                                                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/10 backdrop-blur-sm">
                                                            <Loader height="h-full" />
                                                        </div>
                                                    )}
                                                    {item?.contentType === "application/pdf" ?
                                                        <iframe
                                                            src={`https://docs.google.com/viewer?url=${encodeURIComponent(item?.publicLink)}&embedded=true`}
                                                            className="w-full h-[calc(90vh-80px)] border-0 rounded-lg"
                                                            title="Report PDF"
                                                            onLoad={() => setIsLoadingAsset(false)}
                                                        />
                                                        :
                                                        <img
                                                            src={item?.publicLink}
                                                            alt="Report Image"
                                                            className="w-full max-h-[calc(90vh-80px)] object-cover rounded-lg"
                                                            onLoad={() => setIsLoadingAsset(false)}
                                                        />
                                                    }
                                                    {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                                            <div className="w-full mx-auto absolute bottom-2 left-0 right-0">
                                                <div className='flex items-center justify-between px-2'>
                                                    <p className="text-xs text-white font-medium">{'AI analysis completed'}</p>
                                                    <Badge className={`text-white rounded-md text-xs font-medium px-2 py-1 bg-brand-dark-green`}>
                                                        {"AI Summary Generated"}
                                                    </Badge>
                                                </div>
                                            </div> */}
                                                </div>
                                                <h3 className="text-base font-bold text-black mt-2 truncate">{item?.originalFileName}</h3>
                                                <div className="mt-1 flex gap-1 overflow-x-auto whitespace-nowrap scrollbar-hide">
                                                    <h3 className="text-base font-semibold text-black">{generateTestNameString(reportTypes)}</h3>
                                                </div>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <p className={`${item?.reportType === 'Lab Report' ? "text-brand-mint" : "text-[#DA85FF]"} text-sm font-medium`}>{item?.reportType}</p>
                                                    <p className="text-xs text-brand-gray font-medium">{result?.report_date ? moment(result?.report_date).format('DD/MM/YYYY') : ''}</p>
                                                </div>
                                                <div className="mt-2 flex lg:gap-2 gap-1 overflow-x-auto whitespace-nowrap scrollbar-hide">
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
                                })}
                            </div>
                    }
                </div>
                <SheetFooter>
                    <Button
                        type="submit"
                        size={'lg'}
                        onClick={handleGenerateReport}
                        className="cursor-pointer bg-brand-dark-green text-white font-bold text-sm py-2 px-4 rounded-md hover:bg-brand-dark-green-hover focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                    >
                        {type === 'report' ? 'Compare Report' : 'Generate Summary'}
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
