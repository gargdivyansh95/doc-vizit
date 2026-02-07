"use client"
import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import ArrowLeftIcon from '@/assets/images/arrow-left.svg'
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Controller, useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { ShareReportSchema } from '@/validations'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SHARE_FORM_DEFAULTS } from '@/constants/constants'
import { useDeviceType } from '@/hooks'
import { DEVICE_TYPE } from '@/constants/enums'
import AccessLogTable from './accessLogTable'
import SecureLinkCard from './secureLinkCard'
import ShareMethodCard from './shareMethodCard'
import SecurityInfo from './securityInfo'
import { ShareMethod } from '@/assets/constantData'
import { reportsActions } from '@/modules/application/reports/reports.action'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { getAccessDurationInMinutes, getAccessDurationText, getSliderPercent } from '@/utils'

// const useFor = ['Category 1', 'Category 2', 'Category 3', 'Category 4'];
const familyAccess = ['User 1', 'User 2', 'User 3', 'User 4'];
const accessLevel = ['Read', 'Write', 'Admin'];

export default function ShareReportDialog({ type, open, currentReportId, onClose }) {

    const dispatch = useDispatch();
    const deviceType = useDeviceType();
    const isMobile = deviceType === DEVICE_TYPE.MOBILE;
    const isTablet = deviceType === DEVICE_TYPE.TABLET;
    const isDesktop = deviceType === DEVICE_TYPE.DESKTOP;
    const [openAccessLog, setOpenAccessLog] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [accessLogList, setAccessLogList] = useState([]);
    const [publicLink, setPublicLink] = useState('');

    const { register, control, handleSubmit, watch, reset, formState: { errors } } = useForm({
        resolver: zodResolver(ShareReportSchema),
        mode: 'onSubmit',
        defaultValues: {
            shareMethod: 'phone',
            recipentName: '',
            recipientMobile: '',
            familyAccess: '',
            accessLevel: '',
            // useFor: '',
            accessDuration: 12,
            // documentScope: 'single',
        },
    });
    
    const shareMethod = watch('shareMethod')

    const getAccessLogList = () => {
        const payload = {
            report_id: currentReportId,
            use_for: type
        }
        dispatch(reportsActions.postAccessLog(
            payload,
            (response) => {
                if (response?.success) {
                    console.log(response)
                    setAccessLogList(response?.data || []);
                }
            },
            (error) => {
                console.error('Report Access Log error:', error);
                // toast.error(error.error || 'Something went wrong while sharing report');
            })
        );
    }

    useEffect(() => {
        if (open) {
            getAccessLogList();
        }
    }, [open])

    const handleOpenAccessLog = () => setOpenAccessLog(true);
    const handleCloseAccessLog = () => setOpenAccessLog(false);

    const handleCloseDialog = () => {
        if (openAccessLog) {
            handleCloseAccessLog();
            setAccessLogList([]);
            setPublicLink('');
        } else {
            onClose();
            setAccessLogList([]);
            setPublicLink('');
        }
        // reset(SHARE_FORM_DEFAULTS[shareMethod]);
    }

    const handleTabChange = (value) => {
        // Reset form with new defaults
        reset(SHARE_FORM_DEFAULTS[value]);
    };

    const accessDuration = watch('accessDuration');
    const duration = getAccessDurationText(accessDuration);
    const percent = getSliderPercent(accessDuration);
    const safePercent = percent <= 0 ? 2 : percent >= 100 ? 99 : percent;

    const handleCopy = async () => {
        await navigator.clipboard.writeText(publicLink);
    }

    const buildSharePayload = (data) => {
        const basePayload = {
            report_id: currentReportId,
            use_for: type,
            document_scope: '',
            // access_duration: duration,
            // document_scope: data.documentScope,
        };
        switch (data.shareMethod) {
            case 'phone':
                return {
                    ...basePayload,
                    recipient: {
                        name: data.recipentName,
                        phone: `+91${data.recipientMobile}`,
                        share_method: data.shareMethod,
                    }
                };
            case 'link':
                return {
                    ...basePayload,
                    share_method: data.shareMethod,
                };
            case 'group':
                return {
                    ...basePayload,
                    family_access: data.familyAccess,
                    access_level: data.accessLevel,
                    share_method: data.shareMethod,
                };
            default:
                return basePayload;
        }
    };

    const shareReport = (payload) => {
        setIsLoading(true);
        dispatch(reportsActions.postShareReport(
            payload,
            (response) => {
                if (response?.success) {
                    setPublicLink(response?.data?.publicLink);
                    toast.success(response?.data?.statusMsg);
                    setIsLoading(false);
                    reset();
                    getAccessLogList();
                    // onClose();
                }
            },
            (error) => {
                console.error('Share report error:', error);
                setIsLoading(false);
                toast.error(error.error || 'Something went wrong while sharing report');
            })
        );
    };

    const onSubmit = (data) => {
        const accessDurationMinutes = getAccessDurationInMinutes(data.accessDuration);
        const payload = {
            ...buildSharePayload(data),
            access_duration: accessDurationMinutes,
        };
        // console.log('FINAL PAYLOAD', payload);
        shareReport(payload);
    }

    return (
        <Dialog open={open} onOpenChange={handleCloseDialog}>
            <DialogContent className="lg:max-w-7xl sm:max-w-3xl max-h-[90vh] flex flex-col overflow-hidden [&>button]:cursor-pointer [&>button]:opacity-100 [&>button]:focus:ring-0 [&>button]:focus:ring-transparent [&>button]:focus:ring-offset-0 p-0 lg:px-6 px-4 py-4">
                <DialogHeader className="flex flex-row items-center gap-3">
                    {(openAccessLog && isMobile) &&
                        <button
                            type="button"
                            onClick={handleCloseAccessLog}
                            className="cursor-pointer p-1 rounded-md hover:bg-gray-100"
                        >
                            <Image src={ArrowLeftIcon} alt='arrow-icon' />
                        </button>
                    }
                    <DialogTitle className="lg:text-2xl md:text-2xl text-xl font-semibold text-black text-left">{(openAccessLog && isMobile) ? 'Access log' : 'Share your medical report'}</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-12 mt-1">
                    <div className="lg:col-span-7 md:col-span-7 col-span-12 lg:pr-4 md:pr-3 pr-0 lg:border-r md:border-r border-r-0 border-gray-200">
                        {(openAccessLog && isMobile) ? null :
                            <div className='flex items-center justify-between gap-2'>
                                <h5 className="text-lg font-semibold text-black">Choose sharing method</h5>
                                {isMobile &&
                                    <Button
                                        variant='outline'
                                        type="submit"
                                        size={'lg'}
                                        onClick={handleOpenAccessLog}
                                        className="cursor-pointer bg-transparent hover:bg-transparent text-brand-dark-green hover:text-brand-dark-green font-bold text-sm py-2 px-4 rounded-md border-brand-dark-green shadow-none"
                                    >
                                        Access log
                                    </Button>
                                }
                            </div>
                        }
                        {(openAccessLog && isMobile) ? (
                            <>
                                <AccessLogTable accessLog={accessLogList} />
                                <SecurityInfo />
                            </>
                        ) :
                            <Tabs defaultValue="phone" className="w-full mt-3" value={shareMethod} onValueChange={handleTabChange}>
                                <TabsList className='h-full gap-3 bg-transparent w-full overflow-x-auto scrollbar-hide lg:justify-center justify-start'>
                                    {ShareMethod.map((method) => (
                                        <TabsTrigger
                                            key={method.id}
                                            value={method.id}
                                            className="py-4 px-3 rounded-md border border-brand-light-green text-left bg-white flex flex-col h-auto cursor-pointer
                                            data-[state=active]:bg-[#6FCF971A] data-[state=active]:border-brand-dark-green data-[state=active]:text-brand-dark-green
                                            data-[state=active]:shadow-none items-start"
                                        >
                                            <ShareMethodCard method={method} />
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                                <TabsContent value="phone" className="mt-1 space-y-4">
                                    <div className="space-y-1">
                                        <Label htmlFor="recipentName" className="text-black text-sm font-medium">Recipient Name</Label>
                                        <Input
                                            id="recipentName"
                                            type="text"
                                            placeholder="Enter Recipient Name"
                                            className={`h-11 border text-black font-medium rounded-lg shadow-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus-visible:!border-brand-gray ${errors.recipentName ? 'border-red-500' : 'border-brand-gray'}`}
                                            {...register('recipentName', { required: true })}
                                        />
                                        {errors.recipentName && (
                                            <p className="text-xs text-red-500 font-medium">{errors.recipentName.message}</p>
                                        )}
                                    </div>
                                    <div className='space-y-1'>
                                        <Label htmlFor="recipientMobile" className="text-black text-sm font-medium">Recipient Phone Number</Label>
                                        <Input
                                            id="recipientMobile"
                                            type="tel"
                                            placeholder="Enter Recipient Phone Number"
                                            {...register('recipientMobile', { required: true })}
                                            className={`h-11 border text-black font-medium rounded-lg shadow-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus-visible:!border-brand-gray ${errors.recipientMobile ? 'border-red-500' : 'border-brand-gray'}`}
                                            maxLength={10}
                                        />
                                        {errors.recipientMobile && (
                                            <p className="text-xs text-red-500 font-medium">{errors.recipientMobile.message}</p>
                                        )}
                                    </div>
                                </TabsContent>
                                <TabsContent value="link" />
                                <TabsContent value="group" className="mt-1">
                                    <div className="grid grid-cols-12 gap-4">
                                        <div className='lg:col-span-6 md:col-span-6 col-span-12 space-y-1'>
                                            <Label className="text-sm font-medium text-black">Grant family access</Label>
                                            <Controller
                                                name="familyAccess"
                                                control={control}
                                                render={({ field }) => (
                                                    <Select value={field.value ?? ''} onValueChange={field.onChange}>
                                                        <SelectTrigger
                                                            className={`[&>svg]:!text-black [&>svg]:!opacity-100 w-full !h-11 text-sm font-medium text-black cursor-pointer rounded-lg
                                                            focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 shadow-none border
                                                            ${errors.familyAccess ? 'border-red-500' : 'border-brand-gray'}`}
                                                        >
                                                            <SelectValue placeholder="Select Grant family access" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {familyAccess.map((group) => (
                                                                <SelectItem className='cursor-pointer' key={group} value={group}>
                                                                    {group}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            />
                                            {errors.familyAccess && (
                                                <p className="text-xs text-red-500 font-medium">{errors.familyAccess.message}</p>
                                            )}
                                        </div>
                                        <div className='lg:col-span-6 md:col-span-6 col-span-12 space-y-1'>
                                            <Label className="text-sm font-medium text-black">Access level</Label>
                                            <Controller
                                                name="accessLevel"
                                                control={control}
                                                render={({ field }) => (
                                                    <Select value={field.value ?? ''} onValueChange={field.onChange}>
                                                        <SelectTrigger
                                                            className={`[&>svg]:!text-black [&>svg]:!opacity-100 w-full !h-11 text-sm font-medium text-black cursor-pointer rounded-lg
                                                            focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 shadow-none border
                                                            ${errors.accessLevel ? 'border-red-500' : 'border-brand-gray'}`}
                                                        >
                                                            <SelectValue placeholder="Select Access level" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {accessLevel.map((group) => (
                                                                <SelectItem className='cursor-pointer' key={group} value={group}>
                                                                    {group}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            />
                                            {errors.accessLevel && (
                                                <p className="text-xs text-red-500 font-medium">{errors.accessLevel.message}</p>
                                            )}
                                        </div>
                                    </div>
                                </TabsContent>
                                {/* <div className={`space-y-1 ${shareMethod === 'link' ? 'mt-0' : 'mt-2'}`}>
                                    <Label className="text-sm font-medium text-black">Use For</Label>
                                    <Controller
                                        name="useFor"
                                        control={control}
                                        render={({ field }) => (
                                            <Select value={field.value ?? ''} onValueChange={field.onChange}>
                                                <SelectTrigger
                                                    className={`[&>svg]:!text-black [&>svg]:!opacity-100 w-full !h-11 text-sm font-medium text-black cursor-pointer rounded-lg
                                                    focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 shadow-none border
                                                    ${errors.useFor ? 'border-red-500' : 'border-brand-gray'}`}
                                                >
                                                    <SelectValue placeholder="Select Use For" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {useFor.map((group) => (
                                                        <SelectItem className='cursor-pointer' key={group} value={group}>
                                                            {group}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                    {errors.useFor && (
                                        <p className="text-xs text-red-500 font-medium">{errors.useFor.message}</p>
                                    )}
                                </div> */}
                                <div className='mt-4 relative'>
                                    <Label className="text-brand-gray text-lg font-semibold">Access Duration</Label>
                                    <Controller
                                        name="accessDuration"
                                        control={control}
                                        render={({ field }) => (
                                            <div className='relative'>
                                                <Slider
                                                    value={[field.value]}
                                                    onValueChange={(val) => field.onChange(val[0])}
                                                    min={1}
                                                    max={33}
                                                    step={1}
                                                    className="mb-3 mt-3 [&_[data-slot=slider-track]]:cursor-pointer [&_[data-slot=slider-range]]:cursor-pointer [&_[data-slot=slider-range]]:bg-brand-dark-green [&_[data-slot=slider-thumb]]:cursor-pointer [&_[data-slot=slider-thumb]]:bg-brand-dark-green [&_[data-slot=slider-thumb]]:border-brand-dark-green [&_[data-slot=slider-thumb]]:size-6 [&_[data-slot=slider-thumb]]:ring-0"
                                                />
                                                <div
                                                    className="absolute -top-12 bg-brand-dark-green text-white px-3 py-1.5 rounded-md text-sm font-semibold shadow-lg whitespace-nowrap transition-all duration-150"
                                                    style={{
                                                        left: `${safePercent}%`,
                                                        transform: 'translateX(-50%)',
                                                    }}
                                                >
                                                    <div className="text-center leading-tight">
                                                        {/* <div>{accessDuration}</div> */}
                                                        <div className="text-xs text-white font-semibold">{duration}</div>
                                                    </div>
                                                    <div className="absolute left-1/2 bottom-[-6px] -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-brand-dark-green" />
                                                </div>
                                            </div>
                                        )}
                                    />
                                    <p className="text-sm font-semibold text-brand-dark-green mt-2">
                                        Access valid for: {duration}
                                    </p>
                                </div>
                                {/* <div className='space-y-2 mt-4'>
                                    <Label className="text-brand-gray text-lg font-semibold">Document Sharing</Label>
                                    <Controller
                                        name="documentScope"
                                        control={control}
                                        render={({ field }) => (
                                            <RadioGroup
                                                value={field.value}
                                                onValueChange={field.onChange}
                                                className="space-y-1"
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="single" id="single" className='cursor-pointer border-brand-dark-green [&_[data-slot=radio-group-indicator]>svg]:fill-brand-dark-green [&_[data-slot=radio-group-indicator]>svg]:stroke-brand-dark-green' />
                                                    <Label
                                                        htmlFor="single"
                                                        className="text-sm font-medium text-black cursor-pointer"
                                                    >
                                                        This Report only: File Name
                                                    </Label>
                                                </div>

                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="all" id="all" className='cursor-pointer border-brand-dark-green [&_[data-slot=radio-group-indicator]>svg]:fill-brand-dark-green [&_[data-slot=radio-group-indicator]>svg]:stroke-brand-dark-green' />
                                                    <Label
                                                        htmlFor="all"
                                                        className="text-sm font-medium text-black cursor-pointer"
                                                    >
                                                        All my medical report
                                                    </Label>
                                                </div>
                                            </RadioGroup>
                                        )}
                                    />
                                </div> */}
                                {shareMethod === 'phone' ?
                                    <Button
                                        type="submit"
                                        size={'lg'}
                                        className="mt-4 w-full cursor-pointer bg-brand-dark-green text-white font-bold text-sm py-2 px-4 rounded-md hover:bg-brand-dark-green-hover focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                                        onClick={handleSubmit(onSubmit)}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Sharing...' : 'Share Report Securely'}
                                    </Button> :
                                    shareMethod === 'link' ?
                                        <div>
                                            <Button
                                                type="submit"
                                                size={'lg'}
                                                className="mt-4 w-full cursor-pointer bg-brand-dark-green text-white font-bold text-sm py-2 px-4 rounded-md hover:bg-brand-dark-green-hover focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                                                onClick={handleSubmit(onSubmit)}
                                                disabled={isLoading}
                                            >
                                                {isLoading ? 'Generating Link...' : 'Generate Secure Link'}
                                            </Button>
                                            {publicLink &&
                                                <SecureLinkCard link={publicLink} onCopy={handleCopy} />
                                            }
                                        </div> :
                                        <Button
                                            type="submit"
                                            size={'lg'}
                                            className="mt-4 w-full cursor-pointer bg-brand-dark-green text-white font-bold text-sm py-2 px-4 rounded-md hover:bg-brand-dark-green-hover focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                                            onClick={handleSubmit(onSubmit)}
                                        >
                                            {isLoading ? 'Granting Access...' : 'Grant Access'}
                                        </Button>
                                }
                            </Tabs>
                        }
                    </div>
                    {(isDesktop || isTablet) &&
                        <div className="lg:col-span-5 md:col-span-5 col-span-12 lg:pl-4 md:pl-3 pl-0">
                            <h5 className="text-lg font-semibold text-black mb-3">Access log</h5>
                            <AccessLogTable accessLog={accessLogList} />
                            <SecurityInfo />
                        </div>
                    }
                </div>
            </DialogContent>
        </Dialog>
    )
}
