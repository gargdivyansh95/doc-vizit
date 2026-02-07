/* eslint-disable @next/next/no-img-element */
"use client";
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import Image from "next/image";
import ReportImage from "@/assets/images/summary/report.svg";
import { useState } from "react";
import { LoaderIcon } from "lucide-react";
import Loader from "./loader";

export default function ViewReportSidebar({ open, reportDetails, onClose }) {

    const [isLoading, setIsLoading] = useState(true);

    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent className="lg:max-w-2xl md:max-w-2xl w-[90%] [&>button]:cursor-pointer [&>button]:opacity-100 [&>button]:focus:ring-0 [&>button]:focus:ring-transparent [&>button]:focus:ring-offset-0">
                <SheetHeader>
                    <SheetTitle className="text-xl font-semibold text-black text-left">{reportDetails?.originalFileName}</SheetTitle>
                </SheetHeader>
                <div className="flex-1 px-4 space-y-4">
                    {isLoading && (
                        <Loader height="min-h-[90vh]" />
                    )}
                    {reportDetails?.contentType === "application/pdf" ?
                        <iframe
                            src={`https://docs.google.com/viewer?url=${encodeURIComponent(reportDetails?.publicLink)}&embedded=true`}
                            className="w-full h-[calc(90vh-80px)] border-0 rounded-md"
                            title="Report PDF"
                            onLoad={() => setIsLoading(false)}
                        />
                        :
                        <img
                            src={reportDetails?.publicLink}
                            alt="Report Image"
                            className="w-full max-h-[calc(90vh-80px)] object-contain rounded-md"
                            onLoad={() => setIsLoading(false)}
                        />
                    }
                </div>
                <SheetFooter>
                    <Button
                        variant='outline'
                        size={'lg'}
                        className="cursor-pointer bg-transparent hover:bg-transparent text-brand-dark-green hover:text-brand-dark-green font-bold text-sm py-2 px-4 rounded-md border-brand-dark-green shadow-none"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
