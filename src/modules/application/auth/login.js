"use client"
import React, { useState, useEffect, use } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from '@/validations';
import { useDispatch } from 'react-redux';
import { authActions } from './auth.action';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import AppLogo from '@/assets/images/app-logo.svg';
import Link from 'next/link';
import { formatTime } from '@/utils';
import { COUNTRY_CODE } from '@/constants/constants';

export const Login = () => {

    const dispatch = useDispatch();
    const router = useRouter();
    const [counter, setCounter] = useState(0);
    const [isRequestingOtp, setIsRequestingOtp] = useState(true);
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors }, watch, control, reset, trigger } = useForm({
        resolver: zodResolver(LoginSchema),
        mode: 'onChange',
        defaultValues: {
            mobile: '',
            otp: ''
        }
    });

    const mobile = watch('mobile');

    useEffect(() => {
        if (counter === 0) return;
        const timer = setInterval(() => {
            setCounter((p) => p - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [counter]);

    const handleGetOtp = async () => {
        const isValid = await trigger('mobile');
        if (!isValid) {
            return;
        }
        const payload = {
            mobile_number: mobile,
            country_code: COUNTRY_CODE,
        }
        dispatch(authActions.postGetOtp(
            payload,
            (response) => {
                if (response.success === true) {
                    toast.success(response.data.statusMsg);
                    setCounter(120);
                    setIsRequestingOtp(false);
                }
            },
            (error) => {
                toast.error(error.error);
            },
        ));
    };

    const onSubmit = async (data) => {
        const payload = {
            mobile_number: data.mobile,
            country_code: COUNTRY_CODE,
            otp: data.otp,
        }
        setLoading(true);
        dispatch(authActions.postLogin(
            payload,
            (response) => {
                if (response.success === true) {
                    setLoading(false);
                    toast.success("Login Successful!");
                    reset();
                    router.push('/dashboard');
                }
            },
            (error) => {
                toast.error(error.error || 'Login failed');
                setLoading(false);
            },
        ))
    };

    return (
        <div className="min-h-screen flex">
            <div className="w-full md:w-[55%] flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-xl">
                    <div className='flex justify-center'>
                        <Image src={AppLogo} alt="Logo" className='lg:w-xs w-3xs' />
                    </div>
                    <div className="mt-14 mb-8">
                        <h1 className="text-3xl font-bold text-black mb-2">Welcome back!</h1>
                        <p className="text-black text-base font-medium">Enter your Credentials to access your account</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
                            <div className={`flex mt-2 ${errors.mobile ? 'justify-between' : 'justify-end'}`}>
                                {errors.mobile && (
                                    <p className="text-red-500 text-sm">{errors.mobile.message}</p>
                                )}
                                <button
                                    type="button"
                                    onClick={handleGetOtp}
                                    disabled={counter > 0}
                                    className={`text-sm font-bold ${counter > 0 ? 'text-brand-gray cursor-not-allowed' : 'text-brand-dark-green cursor-pointer'}`}
                                >
                                    {counter > 0 ? `Resend in ${formatTime(counter)}` : 'Get OTP'}
                                </button>
                            </div>
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="otp" className="text-black text-base font-medium mb-1 block">
                                OTP <span className="text-red-500">*</span>
                            </Label>
                            <Controller
                                name="otp"
                                control={control}
                                render={({ field }) => (
                                    <InputOTP
                                        value={field.value}
                                        onChange={field.onChange}
                                        // onChange={(value) => {
                                        //     const numericValue = value.replace(/\D/g, '');
                                        //     field.onChange(numericValue);
                                        // }}
                                        maxLength={6}
                                        className={`${errors.otp ? 'border-red-500' : 'border-brand-gray'}`}
                                        disabled={isRequestingOtp}
                                    >
                                        <InputOTPGroup className="w-full h-full gap-5">
                                            {Array.from({ length: 6 }).map((_, i) => (
                                                <InputOTPSlot
                                                    key={i}
                                                    index={i}
                                                    className={`flex-1 h-11 text-black font-medium rounded-md shadow-none border-1 data-[active=true]:ring-0 data-[active=true]:ring-transparent data-[active=true]:ring-offset-0 data-[active=true]:!border-brand-dark-green ${errors.otp ? 'border-red-500' : 'border-brand-gray'}`}
                                                />
                                            ))}
                                        </InputOTPGroup>
                                    </InputOTP>
                                )}
                            />
                            {errors.otp && (
                                <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
                            )}
                        </div>
                        <Button
                            type="submit"
                            disabled={loading}
                            size={'lg'}
                            className="mt-6 w-full cursor-pointer bg-brand-dark-green text-white font-bold text-sm py-2 px-4 rounded-md hover:bg-brand-dark-green-hover disabled:opacity-50"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </Button>

                        <p className="text-center text-sm text-black font-medium mt-6">
                            Don&apos;t have an account?{' '}
                            <Link href="/signup" className="text-brand-dark-green underline font-bold">
                                Sign Up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>

            <div className="hidden md:block md:w-[45%] bg-[url('@/assets/images/login-bg.png')] bg-no-repeat bg-cover relative">
                <div className='absolute bottom-10 left-20'>
                    <div className="bg-[#FFFFFFB2] backdrop-blur-[54px] border-2 border-[#fff] rounded-3xl p-4 max-w-md">
                        <h2 className="text-2xl font-semibold text-brand-dark-green mb-2">
                            Your personal, secure <span className='bg-white p-1 rounded-sm'>health record</span> — understood by AI.
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
}