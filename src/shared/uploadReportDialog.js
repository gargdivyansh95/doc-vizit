"use client"
import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Upload } from 'lucide-react';
import AiIcon from "@/assets/images/misc/ai-magic.svg";
import Image from 'next/image';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReportUploadSchema } from '@/validations';
import { reportsActions } from '@/modules/application/reports/reports.action';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const docList = [
    {
        id: 1,
        label: 'Blood Report',
    },
    {
        id: 2,
        label: `Liver Report`,
    },
    {
        id: 3,
        label: `Kidney Report`,
    },
    {
        id: 4,
        label: `Prenancy Report`,
    },
    {
        id: 5,
        label: `Prescription Report`,
    },
];

export default function UploadReportDialog({ open, onUpload, onClose }) {

    const dispatch = useDispatch();
    const profileState = useSelector((state) => state.profile);
    const {allFamilyMembers} = useSelector((state) => state.familyManagement);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const {
        control,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(ReportUploadSchema),
        mode: 'onSubmit',
        defaultValues: {
            // docType: null,
            file: null,
        },
    });

    useEffect(() => {
        if (allFamilyMembers?.length > 0) {
            const sortedMembers = [
                ...allFamilyMembers.filter(item => item.relation === "self"),
                ...allFamilyMembers.filter(item => item.relation !== "self"),
            ];
            setSelectedUser(sortedMembers[0]);
        }
    }, [allFamilyMembers]);

    const selectedFile = watch('file');
    // const selectedDocType = watch('docType');

    const handleSelectDoc = (value) => {
        const selected = docList.find(item => item.id === Number(value));
        setValue('docType', selected, { shouldValidate: true });
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setValue('file', e.target.files[0], { shouldValidate: true });
        }
    };

    const onSubmit = async (data) => {
        const payload = {
            file: data.file,
            // user_id: profileState?.userProfile?.customer_id,
            user_id: selectedUser?.customerId,
            report_type: 'Lab Report',
            prompt: 'abc'
        }
        setIsLoading(true);
        dispatch(reportsActions.postUploadReport(
            payload,
            (response) => {
                if (response.success === true) {
                    setIsLoading(false);
                    onUpload(response.data);
                    toast.success('File Uploaded Successfully');
                    reset();
                    onClose();
                }
            },
            (error) => {
                console.log(error.error)
                setIsLoading(false);
                toast.error(error.error);
            },
        ))
    };

    const handleSelectUser = (value) => {
        const selected = allFamilyMembers.find(item => item.customerId === Number(value));
        setSelectedUser(selected);
    };

    const handleClose = (e) => {
        reset();
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="lg:max-w-lg [&>button]:cursor-pointer [&>button]:opacity-100 [&>button]:focus:ring-0 [&>button]:focus:ring-transparent [&>button]:focus:ring-offset-0 p-0 px-6 pt-3 pb-6">
                <DialogHeader className="gap-1">
                    <DialogTitle className="text-xl font-semibold text-black text-center">Upload Medical Reports</DialogTitle>
                    <DialogDescription className="text-center text-brand-gray text-base font-medium">
                        Select a file & provide Details
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-1 space-y-4">
                    {/* <div className="space-y-1">
                        <Label className="text-black text-sm font-medium">What do you want to Upload ?</Label>
                        <Controller
                            name="docType"
                            control={control}
                            render={({ field }) => (
                                <Select value={field.value?.id?.toString()} onValueChange={handleSelectDoc}>
                                    <SelectTrigger
                                        className={`[&>svg]:!text-black [&>svg]:!opacity-100 w-full !h-11 text-sm font-medium text-black cursor-pointer rounded-lg
                                            focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 shadow-none border
                                            ${errors.docType ? 'border-red-500' : 'border-brand-gray'}`}
                                    >
                                        <SelectValue placeholder="Select upload type">
                                            {field.value?.label || "Select upload type"}
                                        </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {docList.map((ele) => (
                                            <SelectItem className='cursor-pointer' key={ele.id} value={ele.id.toString()}>
                                                {ele.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.docType && (
                            <p className="text-xs text-red-500 font-medium mt-1">
                                {errors.docType.message}
                            </p>
                        )}
                    </div> */}
                    <div className="space-y-1">
                        <Label className="text-black text-sm font-medium">Select Report File</Label>
                        <div className="relative">
                            <Controller
                                name="file"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        type="file"
                                        id="file-upload"
                                        className="hidden"
                                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                        onChange={handleFileChange}
                                    />
                                )}
                            />
                            <label
                                htmlFor="file-upload"
                                className={`flex items-center justify-between w-full h-11 px-3 rounded-lg cursor-pointer border
                                ${errors.file ? 'border-red-500' : 'border-brand-gray'}`}
                            >
                                <span className={`text-sm font-medium ${selectedFile ? 'text-black' : 'text-brand-gray'}`}>
                                    {selectedFile ? selectedFile.name : 'Upload file'}
                                </span>
                                <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded">
                                    <Upload className="w-4 h-4 text-gray-600" />
                                </div>
                            </label>
                            {errors.file ? (
                                <p className="text-xs text-red-500 font-medium mt-1">
                                    {errors.file.message}
                                </p>
                            ) : (
                                <p className="text-xs text-brand-gray font-medium mt-1">
                                    Supported file type: PDF, JPG, PNG, DOC, DOCX (up to 5MB per file)
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="bg-[linear-gradient(223.71deg,rgba(111,207,151,0.13)_20.25%,rgba(61,157,101,0.13)_88.94%)] border-1 border-brand-light-green rounded-lg px-3 py-2">
                        <div className="flex items-center gap-2">
                            <Image src={AiIcon} width={20} height={20} alt="AI Analysis" />
                            <p className="text-sm font-semibold bg-clip-text text-transparent bg-bg-ai">AI Analysis</p>
                        </div>
                        <p className="text-xs font-semibold bg-clip-text text-transparent bg-bg-ai mt-1">
                            Your report will be automatically analyzed by our AI system to extract key insights and categorize information
                        </p>
                    </div>
                    <div className="bg-brand-dark-green rounded-full px-4 py-2 flex items-center justify-between">
                        <p className="text-white text-sm font-medium">You are uploading report for {profileState.userProfile?.name}</p>
                        <Select value={selectedUser?.customerId} onValueChange={handleSelectUser}>
                            <SelectTrigger className="[&>svg]:!text-black [&>svg]:!opacity-100 w-[40%] text-sm font-medium text-black cursor-pointer bg-white border-brand-light-gray rounded-lg focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0">
                                <SelectValue placeholder="Select user">
                                    {selectedUser?.name || "Select user"}
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                {allFamilyMembers?.map((item, index) => (
                                    <SelectItem key={index} className='cursor-pointer' value={item?.customerId}>{item.name} ({item.relation})</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter className='mt-2 sm:justify-center flex-row'>
                    <Button
                        type="submit"
                        size={'lg'}
                        disabled={!selectedFile || isLoading}
                        className="w-full cursor-pointer bg-brand-dark-green text-white font-bold text-sm py-2 px-4 rounded-md hover:bg-brand-dark-green-hover focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                        onClick={handleSubmit(onSubmit)}
                    >
                        {isLoading ? "Uploading..." : "Upload"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
