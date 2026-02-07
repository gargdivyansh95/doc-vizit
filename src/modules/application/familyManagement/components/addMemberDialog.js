"use client"
import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddMemberSchema } from '@/validations';
import { bloodGroups, genders, heightFeet, heightInches, relations } from '@/constants/constants';
import { familyManagementActions } from '../familyManagement.action';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import moment from 'moment';

const defaultFormValues = {
    name: '',
    mobileNumber: '',
    abhaId: '',
    relation: '',
    gender: '',
    dob: '',
    bloodGroup: '',
    address: '',
    heightFeet: '',
    heightInches: '',
    weight: '',
};

export default function AddMemberDialog({ open, selectedMember, onClose, onSave }) {

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(AddMemberSchema),
        mode: 'onSubmit',
        defaultValues: defaultFormValues,
    });

    useEffect(() => {
        if (open && selectedMember) {
            const [feet, inches] = selectedMember?.height ? selectedMember.height.split(".") : ["", ""];
            reset({
                name: selectedMember.name ?? "",
                mobileNumber: selectedMember.mobile_number ?? "",
                abhaId: selectedMember.abha_id ?? "",
                relation: selectedMember.relation ?? "",
                gender: selectedMember.gender ?? "",
                dob: selectedMember.dob ? moment(selectedMember.dob).format("YYYY-MM-DD") : "",
                bloodGroup: selectedMember.blood_group ?? "",
                address: selectedMember.address ?? "",
                heightFeet: feet ?? "",
                heightInches: inches ?? "",
                weight: selectedMember.weight ?? "",
            });
        }
        if (open && !selectedMember) {
            reset(defaultFormValues);
        }
    }, [open, selectedMember]);

    const onSubmit = (data) => {
        let payload = {
            name: data.name,
            mobile_number: data.mobileNumber,
            relation: data.relation,
            gender: data.gender,
            dob: data.dob,
        };
        if (data?.abhaId && data?.abhaId?.length > 0) {
            payload.abha_id = data.abhaId;
        }
        if (data?.bloodGroup && data?.bloodGroup?.length > 0) {
            payload.blood_group = data.bloodGroup;
        }
        if (data?.address && data?.address?.length > 0) {
            payload.address = data.address;
        }
        if (data?.heightFeet && data?.heightFeet?.length > 0) {
            payload.height = data.heightFeet && `${data.heightFeet}.${data.heightInches}`;
        }
        if (data?.weight && data?.weight?.length > 0) {
            payload.weight = data.weight;
        }
        setIsLoading(true);
        if (selectedMember) {
            // UPDATE LOGIC
            dispatch(familyManagementActions.updateFamilyMember(
                {memberId: selectedMember?.familyMemberId, payload},
                (response) => {
                    if (response?.success) {
                        toast.success(response?.data?.statusMsg || 'Member updated successfully');
                        setIsLoading(false);
                        onSave(response?.success);
                        onClose();
                        // reset();
                    }
                },
                (error) => {
                    console.error('Update Family Member error:', error);
                    setIsLoading(false);
                    toast.error(error.error || 'Something went wrong while updating family member');
                }
            ));
        } else {
            dispatch(familyManagementActions.addFamilyMember(
                payload,
                (response) => {
                    if (response?.success) {
                        toast.success(response?.data?.statusMsg || 'Member Added successfully');
                        setIsLoading(false);
                        onSave(response?.success);
                        onClose();
                        reset();
                    }
                },
                (error) => {
                    console.error('Add Family Member error:', error);
                    setIsLoading(false);
                    toast.error(error.error || 'Something went wrong while add family member');
                })
            );
        }
    };

    const handleClose = () => {
        reset(defaultFormValues);
        onClose();
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-h-[90vh] overflow-y-auto lg:max-w-lg [&>button]:cursor-pointer [&>button]:opacity-100 [&>button]:focus:ring-0 [&>button]:focus:ring-transparent [&>button]:focus:ring-offset-0 p-0 px-6 pt-3 pb-6">
                <DialogHeader className="gap-1">
                    <DialogTitle className="text-xl font-semibold text-black text-center">{selectedMember ? 'Update Family Member' : 'Add New Family Member'}</DialogTitle>
                    {!selectedMember &&
                        <DialogDescription className="text-center text-brand-gray text-base font-medium">
                            Enter your profile details
                        </DialogDescription>
                    }
                </DialogHeader>
                <div className="mt-1 space-y-4">
                    <div className="space-y-1">
                        <Label className="text-black text-sm font-medium gap-1">Name<span className="text-red-500">*</span></Label>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    type="text"
                                    placeholder="Enter Name"
                                    className={`h-11 border text-black font-medium rounded-lg shadow-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus-visible:!border-brand-gray ${errors.name ? 'border-red-500' : 'border-brand-gray'}`}
                                />
                            )}
                        />
                        {errors.name && (
                            <p className="text-xs text-red-500 font-medium">{errors.name.message}</p>
                        )}
                    </div>
                    <div className="space-y-1">
                        <Label className="text-black text-sm font-medium gap-1">Mobile Number<span className="text-red-500">*</span></Label>
                        <Controller
                            name="mobileNumber"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    type="text"
                                    placeholder="Enter Mobile Number"
                                    maxLength={10}
                                    className={`h-11 border text-black font-medium rounded-lg shadow-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus-visible:!border-brand-gray ${errors.mobileNumber ? 'border-red-500' : 'border-brand-gray'}`}
                                />
                            )}
                        />
                        {errors.mobileNumber && (
                            <p className="text-xs text-red-500 font-medium">{errors.mobileNumber.message}</p>
                        )}
                    </div>
                    <div className="space-y-1">
                        <Label className="text-black text-sm font-medium gap-1">ABHA ID Number<span className="text-sm text-brand-gray font-medium">(optional)</span></Label>
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
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label className="text-sm font-medium text-black gap-1">Relation<span className="text-red-500">*</span></Label>
                            <Controller
                                name="relation"
                                control={control}
                                render={({ field }) => (
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger
                                            className={`[&>svg]:!text-black [&>svg]:!opacity-100 w-full !h-11 text-sm font-medium text-black cursor-pointer rounded-lg
                                                focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 shadow-none border
                                                ${errors.relation ? 'border-red-500' : 'border-brand-gray'}`}
                                        >
                                            <SelectValue placeholder="Select Relation" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {relations.map((ele) => (
                                                <SelectItem className='cursor-pointer' key={ele.id} value={ele.id}>
                                                    {ele.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.relation && (
                                <p className="text-xs text-red-500 font-medium">{errors.relation.message}</p>
                            )}
                        </div>
                        <div className="space-y-1">
                            <Label className="text-sm font-medium text-black gap-1">Gender <span className="text-red-500">*</span></Label>
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
                                                <SelectItem className='cursor-pointer' key={gender} value={gender}>
                                                    {gender}
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
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label className="text-sm font-medium text-black gap-1">Date of Birth<span className="text-red-500">*</span></Label>
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
                        <div className="space-y-1">
                            <Label className="text-sm font-medium text-black gap-1">Blood Group<span className="text-sm text-brand-gray font-medium">(optional)</span></Label>
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
                                                <SelectItem className='cursor-pointer' key={group} value={group}>
                                                    {group}
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
                        {/* <div className="space-y-1">
                            <Label className="text-black text-sm font-medium">Age</Label>
                            <Controller
                                name="age"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type="number"
                                        placeholder="Enter Age"
                                        className={`h-11 border text-black font-medium rounded-lg shadow-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus-visible:!border-brand-gray ${errors.age ? 'border-red-500' : 'border-brand-gray'}`}
                                    />
                                )}
                            />
                            {errors.age && (
                                <p className="text-xs text-red-500 font-medium">{errors.age.message}</p>
                            )}
                        </div> */}
                    </div>
                    <div className="space-y-1">
                        <Label className="text-black text-sm font-medium">Address<span className="text-sm text-brand-gray font-medium">(optional)</span></Label>
                        <Controller
                            name="address"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    type="text"
                                    placeholder="Enter Address"
                                    className={`h-11 border text-black font-medium rounded-lg shadow-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus-visible:!border-brand-gray ${errors.age ? 'border-red-500' : 'border-brand-gray'}`}
                                />
                            )}
                        />
                        {errors.address && (
                            <p className="text-xs text-red-500 font-medium">{errors.address.message}</p>
                        )}
                    </div>
                    <div className="space-y-1">
                        <Label className="text-sm font-medium text-black gap-1">Height<span className="text-sm text-brand-gray font-medium">(optional)</span></Label>
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
                                            <SelectValue placeholder="Select Height in Foot" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {heightFeet.map((feet) => (
                                                <SelectItem className='cursor-pointer' key={feet} value={feet}>
                                                    {feet} ft
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
                                                <SelectItem className='cursor-pointer' key={inch} value={inch}>
                                                    {inch} in
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
                        <Label className="text-sm font-medium text-black gap-1">Weight<span className="text-sm text-brand-gray font-medium">(optional)</span></Label>
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
                        {isLoading ? 'Saving...' : selectedMember ? 'Update Member' : 'Add Member'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
