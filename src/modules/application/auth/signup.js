"use client"
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignupSchema } from '@/validations';
import { useDispatch } from 'react-redux';
import { authActions } from './auth.action';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import AppLogo from '@/assets/images/app-logo.svg';
import { VerifyOtpDialog } from './components';
import Link from 'next/link';
import DisclaimerDialog from '@/shared/disclaimerDialog';
import { COUNTRY_CODE } from '@/constants/constants';

export const Signup = () => {

    const dispatch = useDispatch();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({});
    const [openOtpDialog, setOpenOtpDialog] = useState(false);
    const [openDisclaimerDialog, setOpenDisclaimerDialog] = useState(false);
    const [acceptedDisclaimer, setAcceptedDisclaimer] = useState(false);

    const { register, control, handleSubmit, formState: { errors }, reset, setValue, trigger } = useForm({
        resolver: zodResolver(SignupSchema),
        mode: 'onChange',
        defaultValues: {
            name: '',
            abhaId: '',
            mobile: '',
            email: '',
            terms: false,
        }
    });

    const handleOpenOtpDialog = () => setOpenOtpDialog(true);
    const handleCloseOtpDialog = () => {
        setOpenOtpDialog(false);
        setFormData({});
    }

    const handleOpenDisclaimerDialog = () => setOpenDisclaimerDialog(true);
    const handleCloseDisclaimerDialog = () => setOpenDisclaimerDialog(false);

    const handleAcceptDisclaimer = () => {
        setAcceptedDisclaimer(true);
        setValue('terms', true);
        handleCloseDisclaimerDialog();
    };

    const handleContinue = async () => {
        const valid = await trigger(['name', 'mobile']);
        if (valid) {
            handleOpenDisclaimerDialog();
        }
    };

    const onSubmit = async (data) => {
        console.log(data, 'dddddddddddddd')
        setFormData(data);
        const payload = {
            mobile_number: data?.mobile,
            country_code: COUNTRY_CODE,
            name: data?.name,
            consent: data?.terms,
        };

        // Only add email if it exists and has length
        if (data?.email && data?.email?.length > 0) {
            payload.email = data.email;
        }

        // Only add abha_id if it exists and has length
        if (data?.abhaId && data?.abhaId?.length > 0) {
            payload.abha_id = data.abhaId;
        }
        setLoading(true);
        dispatch(authActions.postRegister(
            payload,
            (response) => {
                if (response.success === true) {
                    setLoading(false);
                    toast.success(response.data.statusMsg);
                    handleOpenOtpDialog();
                }
            },
            (error) => {
                toast.error(error.error);
                setLoading(false);
            },
        ));
    };

    return (
        <div className="min-h-screen flex">
            <div className="w-full md:w-[55%] flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-xl">
                    <div className='flex justify-center'>
                        <Image src={AppLogo} alt="Logo" className='lg:w-xs w-3xs' />
                    </div>
                    <div className="mt-10 mb-8">
                        <h1 className="text-3xl font-bold text-black mb-2">Welcome to e-DigiHealth</h1>
                        <p className="text-black text-base font-medium">Enter your detail to create your account</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className="mb-4">
                            <Label htmlFor="name" className="text-black text-base font-medium mb-1 block">
                                Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Enter your name"
                                {...register('name', { required: true })}
                                className={`h-11 text-black font-medium rounded-md shadow-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus-visible:!border-brand-dark-green ${errors.name ? 'border-red-500' : 'border-brand-gray'}`}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <div className='mb-1 flex items-center justify-between'>
                                <Label htmlFor="abhaId" className="text-black text-base font-medium block">
                                    ABHA ID
                                </Label>
                                <Link href="https://www.pristyncare.com/create-abha-health-id/" target='_blank' className="text-brand-dark-green text-sm underline font-bold">
                                    Don't have ABHA? Create ABHA
                                </Link>
                            </div>
                            <Input
                                id="abhaId"
                                type="text"
                                placeholder="Enter your 14 digit ABHA ID Number"
                                {...register('abhaId')}
                                className={`h-11 text-black font-medium rounded-md shadow-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus-visible:!border-brand-dark-green ${errors.abhaId ? 'border-red-500' : 'border-brand-gray'}`}
                                maxLength={14}
                            />
                            {errors.abhaId && (
                                <p className="text-red-500 text-sm mt-1">{errors.abhaId.message}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="mobile" className="text-black text-base font-medium mb-1 block">
                                Mobile Number <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="mobile"
                                type="tel"
                                placeholder="Enter your mobile number"
                                {...register('mobile', { required: true })}
                                className={`h-11 text-black font-medium rounded-md shadow-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus-visible:!border-brand-dark-green ${errors.mobile ? 'border-red-500' : 'border-brand-gray'}`}
                                maxLength={10}
                            // onChange={(e) => {
                            //     const value = e.target.value.replace(/\D/g, '');
                            //     e.target.value = value;
                            // }}
                            />
                            {errors.mobile && (
                                <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="email" className="text-black text-base font-medium mb-1 block">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter Your Email"
                                {...register('email')}
                                className={`h-11 text-black font-medium rounded-md shadow-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus-visible:!border-brand-dark-green ${errors.email ? 'border-red-500' : 'border-brand-gray'}`}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>
                        <div className="mt-4">
                            <p className='text-brand-gray text-sm font-medium'>We’ll send a one-time password (OTP) to verify your number & email.</p>
                            {!acceptedDisclaimer && (
                                <>
                                    <Button
                                        type="button"
                                        variant='outline'
                                        size={'lg'}
                                        className="mt-4 w-full cursor-pointer bg-brand-dark-green text-white font-bold text-sm py-2 px-4 rounded-md hover:bg-brand-dark-green-hover disabled:opacity-50 hover:text-white"
                                        onClick={handleContinue}
                                    >
                                        Continue
                                    </Button>
                                    {/* {(errors.name || errors.mobile) && (
                                        <p className="text-sm text-blue-500 mt-2">Please enter your Name and a 10-digit Mobile number to continue.</p>
                                    )} */}
                                </>
                            )}
                            {/* {errors.terms && (
                                <p className="text-red-500 text-sm mt-1">{errors.terms.message}</p>
                            )} */}
                        </div>
                        {acceptedDisclaimer ? (
                            <Button
                                type="submit"
                                disabled={loading}
                                size={'lg'}
                                className="mt-4 w-full cursor-pointer bg-brand-dark-green text-white font-bold text-sm py-2 px-4 rounded-md hover:bg-brand-dark-green-hover disabled:opacity-50"
                            >
                                {loading ? "Signing up..." : "Signup"}
                            </Button>
                        ) : null}

                        <p className="text-center text-sm text-black font-medium mt-6">
                            Have an account?{' '}
                            <Link href="/login" className="text-brand-dark-green underline font-bold">
                                Sign In
                            </Link>
                        </p>
                    </form>
                </div>
            </div>

            <div className="hidden md:block md:w-[45%] bg-[url('@/assets/images/signup-bg.png')] bg-no-repeat bg-cover relative">
                <div className='absolute bottom-10 left-20'>
                    <div className="bg-[#FFFFFFB2] backdrop-blur-[54px] border-2 border-[#fff] rounded-3xl p-4 max-w-md">
                        <h2 className="text-2xl font-semibold text-brand-dark-green mb-2">
                            Your personal, secure <span className='bg-white p-1 rounded-sm'>health record</span> — understood by AI.
                        </h2>
                    </div>
                </div>
            </div>
            <VerifyOtpDialog
                open={openOtpDialog}
                formData={formData}
                handleClose={handleCloseOtpDialog}
            />
            <DisclaimerDialog
                open={openDisclaimerDialog}
                onClose={handleCloseDisclaimerDialog}
                onAccept={handleAcceptDisclaimer}
            />
        </div>
    );
}