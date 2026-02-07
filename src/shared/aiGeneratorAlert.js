"use client";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import GeneratingAnimation from "@/assets/images/summary/generating.json";
import Lottie from "lottie-react";

export default function AiGeneratorAlert({open}) {
    return (
        <AlertDialog open={open}>
            <AlertDialogContent>
                <AlertDialogHeader className='flex flex-col items-center'>
                    <div className="w-24">
                        <Lottie animationData={GeneratingAnimation} loop={true} />
                    </div>
                    <AlertDialogTitle className="text-2xl font-semibold text-brand-dark-green">Generating AI Summary</AlertDialogTitle>
                    <AlertDialogDescription className="text-brand-light-black text-base text-center mt-1">Do not close, Please wait while generating your summary. This might take a few seconds, please wait.</AlertDialogDescription>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    )
}
