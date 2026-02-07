"use client"
import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProfileSchema } from '@/validations';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { COUNTRY_CODE } from '@/constants/constants';
import { profileActions } from '@/modules/application/profile/profile.action';
import { toast } from 'sonner';

export default function CompleteProfileDialog({ from, open, onClose }) {

    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth);
    const profileState = useSelector((state) => state.profile);
    const [isLoading, setIsLoading] = useState(false);
    const genders = Object.keys(authState?.masterData?.genders).map((key) => ({
        id: key,
        label: authState?.masterData?.genders[key],
    }));
    const bloodGroups = Object.keys(authState?.masterData?.bloodGroups).map((key) => ({
        id: key,
        label: authState?.masterData?.bloodGroups[key],
    }));
    const heightFeet = Object.keys(authState?.masterData?.heightFeet).map((key) => ({
        id: key,
        label: authState?.masterData?.heightFeet[key],
    }));
    const heightInches = Object.keys(authState?.masterData?.heightInches).map((key) => ({
        id: key,
        label: authState?.masterData?.heightInches[key],
    }));

    const {
        control,
        handleSubmit,
        reset,
        setValue,
        clearErrors,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(ProfileSchema),
        mode: 'onSubmit',
        defaultValues: {
            name: '',
            mobile: '',
            abhaId: '',
            dob: '',
            gender: '',
            bloodGroup: '',
            heightFeet: '',
            heightInches: '',
            weight: '',
        },
    });

    useEffect(() => {
        if (open && profileState?.userProfile) {
            const [feet, inches] = profileState.userProfile?.height  ? profileState.userProfile.height.split('.') : ['', ''];
            reset({
                name: profileState.userProfile?.name || '',
                mobile: profileState.userProfile?.mobile_number || '',
                abhaId: profileState.userProfile?.abha_id || '',
                dob: profileState.userProfile?.dob || '',
                gender: profileState.userProfile?.gender || '',
                bloodGroup: profileState.userProfile?.blood_group || '',
                heightFeet: feet || '',
                heightInches: inches || '',
                weight: profileState.userProfile?.weight || '',
            });
        }
    }, [open, profileState, reset]);

    const onSubmit = (data) => {
        let payload = {
            mobile_number: data.mobile,
            country_code: COUNTRY_CODE,
            name: data.name,
            dob: data.dob,
            gender: data.gender,
            blood_group: data.bloodGroup,
            height: `${data.heightFeet}.${data.heightInches}`,
            weight: data.weight,
            consent: true
        };
        if (data?.abhaId && data?.abhaId?.length > 0) {
            payload.abha_id = data.abhaId;
        }
        setIsLoading(true);
        dispatch(profileActions.updateUserProfile(
            payload,
            (response) => {
                if (response?.success) {
                    toast.success(response?.data?.statusMsg || 'Profile updated successfully');
                    setIsLoading(false);
                    onClose();
                }
            },
            (error) => {
                console.error('Update user profile error:', error);
                setIsLoading(false);
                toast.error(error.error || 'Something went wrong while update user profile');
            })
        );
    };

    const handleClose = () => {
        onClose();
    };

    const today = new Date().toISOString().split('T')[0];
    console.log(authState?.masterData, 'masterData')

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="lg:max-w-lg [&>button]:cursor-pointer [&>button]:opacity-100 [&>button]:focus:ring-0 [&>button]:focus:ring-transparent [&>button]:focus:ring-offset-0 p-0 px-6 pt-3 pb-6">
                <DialogHeader className="gap-1">
                    <DialogTitle className="text-xl font-semibold text-black text-center">{from === 'profile' ? 'Update Your Profile' : 'Complete Your Profile'}</DialogTitle>
                    {from === 'sidebar' &&
                        <DialogDescription className="text-center text-brand-gray text-base font-medium">
                            Enter your profile details
                        </DialogDescription>
                    }
                </DialogHeader>
                <div className="mt-1 space-y-4">
                    <div className="space-y-1">
                        <Label htmlFor="name" className="text-black text-sm font-medium block">
                            Name <span className="text-red-500">*</span>
                        </Label>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    type="text"
                                    className={`h-11 border text-black font-medium rounded-lg shadow-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus-visible:!border-brand-gray ${errors.name ? 'border-red-500' : 'border-brand-gray'}`}
                                />
                            )}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-xs">{errors.name.message}</p>
                        )}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="name" className="text-black text-sm font-medium block">
                            Mobile Number <span className="text-red-500">*</span>
                        </Label>
                        <Controller
                            name="mobile"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    type="text"
                                    disabled={true}
                                    maxLength={10}
                                    className={`h-11 border text-black font-medium rounded-lg shadow-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus-visible:!border-brand-gray ${errors.mobile ? 'border-red-500' : 'border-brand-gray'}`}
                                />
                            )}
                        />
                        {errors.mobile && (
                            <p className="text-red-500 text-xs">{errors.mobile.message}</p>
                        )}
                    </div>
                    <div className="space-y-1">
                        <div className='mb-1 flex items-center justify-between'>
                            <Label htmlFor="abhaId" className="text-black text-sm font-medium block">
                                ABHA ID
                            </Label>
                            <Link href="https://www.pristyncare.com/create-abha-health-id/" target='_blank' className="text-brand-dark-green text-sm underline font-bold">
                                {"Don't have ABHA? Create ABHA"}
                            </Link>
                        </div>
                        <Controller
                            name="abhaId"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    type="text"
                                    placeholder="Enter your 14 digit ABHA ID Number"
                                    maxLength={14}
                                    className={`h-11 border text-black font-medium rounded-lg shadow-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus-visible:!border-brand-gray ${errors.abhaId ? 'border-red-500' : 'border-brand-gray'}`}
                                />
                            )}
                        />
                        {errors.abhaId && (
                            <p className="text-xs text-red-500 font-medium">{errors.abhaId.message}</p>
                        )}
                    </div>
                    <div className="space-y-1">
                        <Label className="text-sm font-medium text-black">Date of Birth</Label>
                        <Controller
                            name="dob"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    type="date"
                                    max={today}
                                    className={`h-11 cursor-pointer border text-black font-medium rounded-lg shadow-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus-visible:!border-brand-gray ${errors.dob ? 'border-red-500' : 'border-brand-gray'}`}
                                />
                            )}
                        />
                        {errors.dob && (
                            <p className="text-xs text-red-500 font-medium">{errors.dob.message}</p>
                        )}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label className="text-sm font-medium text-black">Gender</Label>
                            <Controller
                                name="gender"
                                control={control}
                                render={({ field }) => (
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger
                                            className={`[&>svg]:!text-black [&>svg]:!opacity-100 w-full !h-11 text-sm font-medium text-black cursor-pointer rounded-lg
                                                focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 shadow-none border
                                                ${errors.gender ? 'border-red-500' : 'border-brand-gray'}`}
                                        >
                                            <SelectValue placeholder="Select Gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {genders.map((gender) => (
                                                <SelectItem className='cursor-pointer' key={gender?.id} value={gender?.id}>
                                                    {gender?.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.gender && (
                                <p className="text-xs text-red-500 font-medium">{errors.gender.message}</p>
                            )}
                        </div>
                        <div className="space-y-1">
                            <Label className="text-sm font-medium text-black">Blood Group</Label>
                            <Controller
                                name="bloodGroup"
                                control={control}
                                render={({ field }) => (
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger
                                            className={`[&>svg]:!text-black [&>svg]:!opacity-100 w-full !h-11 text-sm font-medium text-black cursor-pointer rounded-lg
                                                focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 shadow-none border
                                                ${errors.bloodGroup ? 'border-red-500' : 'border-brand-gray'}`}
                                        >
                                            <SelectValue placeholder="Select Blood Group" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {bloodGroups.map((group) => (
                                                <SelectItem className='cursor-pointer' key={group?.id} value={group?.id}>
                                                    {group?.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.bloodGroup && (
                                <p className="text-xs text-red-500 font-medium">{errors.bloodGroup.message}</p>
                            )}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <Label className="text-sm font-medium text-black">Height</Label>
                        <div className="grid grid-cols-2 gap-3">
                            <Controller
                                name="heightFeet"
                                control={control}
                                render={({ field }) => (
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger
                                            className={`[&>svg]:!text-black [&>svg]:!opacity-100 w-full !h-11 text-sm font-medium text-black cursor-pointer rounded-lg
                                                focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 shadow-none border
                                                ${errors.heightFeet ? 'border-red-500' : 'border-brand-gray'}`}
                                        >
                                            <SelectValue placeholder="Select Height in Feet" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {heightFeet.map((feet) => (
                                                <SelectItem className='cursor-pointer' key={feet?.id} value={feet?.id}>
                                                    {feet?.label} ft
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            <Controller
                                name="heightInches"
                                control={control}
                                render={({ field }) => (
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger
                                            className={`[&>svg]:!text-black [&>svg]:!opacity-100 w-full !h-11 text-sm font-medium text-black cursor-pointer rounded-lg
                                                focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 shadow-none border
                                                ${errors.heightInches ? 'border-red-500' : 'border-brand-gray'}`}
                                        >
                                            <SelectValue placeholder="Select Height in inches" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {heightInches.map((inch) => (
                                                <SelectItem className='cursor-pointer' key={inch?.id} value={inch?.id}>
                                                    {inch?.label} in
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                        {(errors.heightFeet || errors.heightInches) && (
                            <p className="text-xs text-red-500 font-medium">
                                {errors.heightFeet?.message || errors.heightInches?.message}
                            </p>
                        )}
                    </div>
                    <div className="space-y-1">
                        <Label className="text-sm font-medium text-black">Weight</Label>
                        <Controller
                            name="weight"
                            control={control}
                            render={({ field }) => (
                                <div className="relative">
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="Enter your weight"
                                        className={`h-11 border text-black font-medium rounded-lg shadow-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus-visible:!border-brand-gray ${errors.weight ? 'border-red-500' : 'border-brand-gray'}`}
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-black text-sm pointer-events-none">
                                        kg
                                    </div>
                                </div>
                            )}
                        />
                        {errors.weight && (
                            <p className="text-xs text-red-500 font-medium">{errors.weight.message}</p>
                        )}
                    </div>
                </div>
                <DialogFooter className='mt-2 sm:justify-center flex-row'>
                    <Button
                        variant='outline'
                        type="submit"
                        size={'lg'}
                        className="w-1/2 cursor-pointer bg-transparent hover:bg-transparent text-brand-dark-green hover:text-brand-dark-green font-bold text-sm py-2 px-4 rounded-md border-brand-dark-green shadow-none"
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        size={'lg'}
                        disabled={isLoading}
                        className="w-1/2 cursor-pointer bg-brand-dark-green text-white font-bold text-sm py-2 px-4 rounded-md hover:bg-brand-dark-green-hover focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                        onClick={handleSubmit(onSubmit)}
                    >
                        {isLoading ? 'Saving...' : 'Save'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
