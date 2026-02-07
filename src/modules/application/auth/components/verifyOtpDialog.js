/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { OtpSchema } from '@/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import ArrowLeftIcon from '@/assets/images/arrow-left.svg'
import Image from 'next/image'
import { toast } from 'sonner'
import { formatTime } from '@/utils'
import { authActions } from '../auth.action'
import { COUNTRY_CODE } from '@/constants/constants'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'

export default function VerifyOtpDialog({ open, formData, handleClose }) {

    const TIME = 120;
    const router = useRouter();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [mobileCounter, setMobileCounter] = useState(0);
    const [emailCounter, setEmailCounter] = useState(0);

    const { handleSubmit, formState: { errors }, control, reset } = useForm({
        resolver: zodResolver(OtpSchema),
        mode: 'onChange',
        defaultValues: {
            mobileOtp: '',
            // emailOtp: ''
        }
    });

    useEffect(() => {
        if (open) {
            setMobileCounter(TIME)
            if (formData?.email) setEmailCounter(TIME)
        } else {
            setMobileCounter(0)
            setEmailCounter(0)
            reset()
        }
    }, [open, reset, formData?.email])

    useEffect(() => {
        if (mobileCounter === 0) return;
        const timer = setInterval(() => {
            setMobileCounter((p) => p - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [mobileCounter]);

    useEffect(() => {
        if (!formData?.email) return;
        if (emailCounter === 0) return;
        const timer = setInterval(() => {
            setEmailCounter((p) => p - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [emailCounter, formData?.email]);

    const handleResendMobileOtp = async () => {
        if (mobileCounter > 0) return;
        const payload = {
            mobile_number: formData?.mobile,
            country_code: COUNTRY_CODE,
            // email: formData?.email || '',
        }
        dispatch(authActions.postResendOTP(
            payload,
            (response) => {
                if (response.success === true) {
                    toast.success(response.data.statusMsg);
                    setMobileCounter(TIME);
                }
            },
            (error) => {
                toast.error(error.error);
            },
        ));
    };

    const handleResendEmaileOtp = async () => {
        if (!formData?.email) return;
        if (emailCounter > 0) return;
        const payload = {
            mobile_number: formData?.mobile,
            country_code: COUNTRY_CODE,
            email: formData?.email || '',
        }
        dispatch(authActions.postResendOTP(
            payload,
            (response) => {
                if (response.success === true) {
                    toast.success(response.data.statusMsg);
                    setEmailCounter(TIME);
                }
            },
            (error) => {
                toast.error(error.error);
            },
        ));
    };

    const onSubmit = (data) => {
        console.log("Form submitted!", data);
        const payload = {
            mobile_number: formData?.mobile,
            country_code: COUNTRY_CODE,
            mobile_otp: data?.mobileOtp,
            // email: formData?.email || '',
            // email_otp: data?.emailOtp || '',
        }
        setLoading(true);
        dispatch(authActions.postVerifyRegister(
            payload,
            (response) => {
                if (response.success === true) {
                    setLoading(false);
                    toast.success(response.data.statusMsg || 'Account verified successfully!');
                    reset();
                    handleClose();
                    router.push('/dashboard');
                }
            },
            (error) => {
                toast.error(error.error);
                setLoading(false);
            },
        ));
    }

    return (
        <Dialog open={open}>
            {/* <form noValidate onSubmit={handleSubmit(onSubmit)}> */}
                <DialogContent className="sm:max-w-[425px] [&>button]:hidden p-0 px-6 pt-3 pb-6">
                    <DialogHeader className="flex flex-row items-center gap-3">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="cursor-pointer p-1 rounded-md hover:bg-gray-100"
                        >
                            <Image src={ArrowLeftIcon} alt='arrow-icon' />
                        </button>
                        <DialogTitle className="text-xl font-semibold">Enter one-time password</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-6 mt-4">
                        <div className="">
                            <Label htmlFor="mobileOtp" className="text-black text-base font-medium mb-2 block">
                                We have sent code to {formData?.mobile}
                            </Label>
                            <Controller
                                name="mobileOtp"
                                control={control}
                                render={({ field }) => (
                                    <InputOTP
                                        value={field.value}
                                        onChange={field.onChange}
                                        maxLength={6}
                                        className={`${errors.mobileOtp ? 'border-red-500' : 'border-brand-gray'}`}
                                    >
                                        <InputOTPGroup className="w-full h-full gap-5">
                                            {Array.from({ length: 6 }).map((_, i) => (
                                                <InputOTPSlot
                                                    key={i}
                                                    index={i}
                                                    className={`flex-1 h-11 text-black font-medium rounded-md shadow-none border-1 data-[active=true]:ring-0 data-[active=true]:ring-transparent data-[active=true]:ring-offset-0 data-[active=true]:!border-brand-dark-green ${errors.mobileOtp ? 'border-red-500' : 'border-brand-gray'}`}
                                                />
                                            ))}
                                        </InputOTPGroup>
                                    </InputOTP>
                                )}
                            />
                            <div className={`flex mt-1 ${errors.mobileOtp ? 'justify-between' : 'justify-end'}`}>
                                {errors.mobileOtp && (
                                    <p className="text-red-500 text-sm">{errors.mobileOtp.message}</p>
                                )}
                                <button
                                    type="button"
                                    onClick={handleResendMobileOtp}
                                    disabled={mobileCounter > 0}
                                    className={`text-sm font-bold ${mobileCounter > 0 ? 'text-brand-gray cursor-not-allowed' : 'text-brand-dark-green cursor-pointer'}`}
                                >
                                    {mobileCounter > 0 ? `Resend in ${formatTime(mobileCounter)}` : 'Resend'}
                                </button>
                            </div>
                        </div>
                        {/* {formData?.email && <hr className="border-gray-200" /> } */}
                        {/* {formData?.email &&
                            <div className="">
                                <Label htmlFor="emailOtp" className="text-black text-base font-medium mb-2 block">
                                    We have sent code to {formData?.email}
                                </Label>
                                <Controller
                                    name="emailOtp"
                                    control={control}
                                    render={({ field }) => (
                                        <InputOTP
                                            value={field.value}
                                            onChange={field.onChange}
                                            maxLength={6}
                                            className={`${errors.emailOtp ? 'border-red-500' : 'border-brand-gray'}`}
                                        >
                                            <InputOTPGroup className="w-full h-full gap-5">
                                                {Array.from({ length: 6 }).map((_, i) => (
                                                    <InputOTPSlot
                                                        key={i}
                                                        index={i}
                                                        className={`flex-1 h-11 text-black font-medium rounded-md shadow-none border-1 data-[active=true]:ring-0 data-[active=true]:ring-transparent data-[active=true]:ring-offset-0 data-[active=true]:!border-brand-dark-green ${errors.emailOtp ? 'border-red-500' : 'border-brand-gray'}`}
                                                    />
                                                ))}
                                            </InputOTPGroup>
                                        </InputOTP>
                                    )}
                                />
                                <div className={`flex mt-1 ${errors.emailOtp ? 'justify-between' : 'justify-end'}`}>
                                    {errors.emailOtp && (
                                        <p className="text-red-500 text-sm mt-1">{errors.emailOtp.message}</p>
                                    )}
                                    <button
                                        type="button"
                                        onClick={handleResendEmaileOtp}
                                        disabled={emailCounter > 0}
                                        className={`text-sm font-bold ${emailCounter > 0 ? 'text-brand-gray cursor-not-allowed' : 'text-brand-dark-green cursor-pointer'}`}
                                    >
                                        {emailCounter > 0 ? `Resend in ${formatTime(emailCounter)}` : 'Resend'}
                                    </button>
                                </div>
                            </div>
                        } */}
                    </div>
                    <DialogFooter>
                        <Button
                            type="submit"
                            disabled={loading}
                            size={'lg'}
                            className="mt-6 w-full cursor-pointer bg-brand-dark-green text-white font-bold text-sm py-2 px-4 rounded-md hover:bg-brand-dark-green-hover disabled:opacity-50"
                            onClick={handleSubmit(onSubmit)}
                        >
                            {loading ? "Signing up..." : "Signup"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            {/* </form> */}
        </Dialog>
    )
}
