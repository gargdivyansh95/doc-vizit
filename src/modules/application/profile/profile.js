/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/set-state-in-effect */
"use client"
import React, { useEffect, useRef, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import ProfileImage from "@/assets/images/profile/photo.png";
import CheckIcon from "@/assets/images/profile/check.svg";
import EditIcon from "@/assets/images/profile/edit.svg";
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CompleteProfileDialog, DeleteAccountDialog } from '@/shared';
import { useDispatch, useSelector } from 'react-redux';
import { profileActions } from './profile.action';
import { jwtDecode } from 'jwt-decode';
import moment from 'moment';
import { convertHeightToCm } from '@/utils';
import { toast } from 'sonner';
import { authActions } from '../auth/auth.action';
import { useRouter } from 'next/navigation';

export const Profile = () => {

    const dispatch = useDispatch();
    const router = useRouter();
    const authState = useSelector((state) => state.auth);
    const profileState = useSelector((state) => state.profile);
    const fileInputRef = useRef(null);
    const [profileImage, setProfileImage] = useState(null);
    const [openProfileDialog, setOpenProfileDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const decoded = authState?.authToken ? jwtDecode(authState?.authToken) : null;

    const fetchUserProfile = () => {
        const payload = {
            mobileNumber: decoded.sub,
        };
        dispatch(profileActions.userProfile(
            payload,
            (response) => {
                if (response.success === true) {
                    // Handle successful response
                }
            },
            (error) => {
                // Handle error response
            },
        ))
    }

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const handleOpenProfileDialog = () => setOpenProfileDialog(true);
    const handleCloseProfileDialog = () => setOpenProfileDialog(false);

    const handleOpenDeleteDialog = () => setOpenDeleteDialog(true);
    const handleCloseDeleteDialog = () => setOpenDeleteDialog(false);

    const handleEditClick = () => {
        fileInputRef.current?.click()
    }

    const handleImageChange = (e) => {
        const file = e.target.files?.[0]
        if (!file) return

        if (!file.type.startsWith("image/")) {
            alert("Please select an image file")
            return
        }
        const imageUrl = URL.createObjectURL(file)
        setProfileImage(imageUrl)
    }

    const handleDelete = () => {
        const payload = {
            memberId: profileState?.userProfile?.customer_id,
        };
        setIsDeleting(true);
        dispatch(profileActions.postDeleteUser(
            payload,
            (response) => {
                if (response.success === true) {
                    // toast.success(response.data.statusMsg || "Member deleted successfully");
                    dispatch(authActions.postLogout(
                        (res) => {
                            if (res.success === true) {
                                setIsDeleting(false);
                                handleCloseDeleteDialog();
                                toast.success('Account deleted successfully');
                                router.replace('/login');
                            }
                        },
                        (error) => {
                            setIsDeleting(false);
                            toast.error(error?.error || 'Logout failed');
                        }
                    ));
                }
            },
            (error) => {
                console.log(error, 'error details')
                setIsDeleting(false);
                toast.error(error.error);
            },
        ))
    }

    return (
        <div>
            <h1 className="lg:text-3xl md:text-xl text-lg font-bold lg:mb-6 md:mb-4 mb-2">Profile</h1>
            <Card className="rounded-xl shadow-[0px_0px_4px_0px_#0000000A] border-[#00000010] lg:py-4 lg:px-4 md:py-3 md:px-3 py-3 px-3">
                <CardContent className="p-0">
                    <div className="flex items-center gap-6">
                        <div className='relative'>
                            {profileImage ? (
                                <img src={profileImage} alt="profile"
                                    className="lg:w-40 lg:h-40 md:w-32 md:h-32 w-24 h-24 rounded-full object-cover" />
                            ) : (
                                <Image src={ProfileImage} alt="profile"
                                    className="lg:w-40 lg:h-40 md:w-32 md:h-32 w-24 h-24 rounded-full object-cover"
                                />
                            )}
                            {/* <Image src={profileImage ? profileImage : ProfileImage} alt="profile" className="lg:w-40 lg:h-40 md:w-32 md:h-32 w-24 h-24 rounded-full object-cover" /> */}
                            <button type="button" className='bg-white rounded-full shadow-[0px_1.22px_4.87px_0px_#1A0F011F] absolute p-2 bottom-6 -right-2 cursor-pointer'
                                onClick={handleEditClick}
                            >
                                <Image src={EditIcon} alt="edit-icon" />
                            </button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </div>
                        <div className="">
                            <h6 className="lg:text-2xl md:text-xl text-lg font-semibold text-black">{profileState?.userProfile?.name}</h6>
                            <p className="lg:text-xl md:text-lg text-base text-[#6B7280] font-semibold mt-1">ABHA ID - {profileState?.userProfile?.abha_id ?? 'xx-xxxx-xxxx-xxxx'}</p>
                            {
                                profileState?.userProfile?.abha_id && (
                                    <Badge className={`text-white rounded-md text-base font-medium px-2 py-1 bg-brand-dark-green mt-2`}>
                                        <Image src={CheckIcon} alt="check-icon" /> ABHA Linked
                                    </Badge>
                                )
                            }
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-6'>
                <Card className="rounded-xl shadow-[0px_0px_4px_0px_#0000000A] border-[#00000010] lg:py-4 lg:px-4 md:py-3 md:px-3 py-3 px-3">
                    <CardContent className="p-0">
                        <h4 className="lg:text-2xl md:text-xl text-lg font-semibold text-black">Personal Details</h4>
                        <Separator className="my-0 mt-2" />
                        <div className="divide-y divide-gray-200">
                            <div className="flex items-center justify-between py-3">
                                <h5 className="text-lg font-medium text-black"> Full Name </h5>
                                <p className="text-lg text-brand-light-black"> {profileState?.userProfile?.name} </p>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <h5 className="text-lg font-medium text-black"> Gender </h5>
                                <p className="text-lg text-brand-light-black"> {profileState?.userProfile?.gender} </p>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <h5 className="text-lg font-medium text-black"> Date of Birth </h5>
                                <p className="text-lg text-brand-light-black"> {profileState?.userProfile?.dob ? moment(profileState?.userProfile?.dob).format('DD MMM YYYY') : '-'} </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="rounded-xl shadow-[0px_0px_4px_0px_#0000000A] border-[#00000010] lg:py-4 lg:px-4 md:py-3 md:px-3 py-3 px-3">
                    <CardContent className="p-0">
                        <h4 className="lg:text-2xl md:text-xl text-lg font-semibold text-black">Health information</h4>
                        <Separator className="my-0 mt-2" />
                        <div className="divide-y divide-gray-200">
                            <div className="flex items-center justify-between py-3">
                                <h5 className="text-lg font-medium text-black"> Blood Group </h5>
                                <p className="text-lg text-brand-light-black"> {profileState?.userProfile?.blood_group} </p>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <h5 className="text-lg font-medium text-black"> Height </h5>
                                <p className="text-lg text-brand-light-black"> {convertHeightToCm(profileState?.userProfile?.height)}cm </p>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <h5 className="text-lg font-medium text-black"> Weight </h5>
                                <p className="text-lg text-brand-light-black"> {profileState?.userProfile?.weight}kg </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className='mt-6 flex items-center justify-end gap-4'>
                <Button
                    variant='outline'
                    type="submit"
                    size={'lg'}
                    className="cursor-pointer bg-brand-red hover:bg-brand-red text-white hover:text-white font-bold text-sm py-2 px-4 rounded-md border-brand-red shadow-none"
                    onClick={handleOpenDeleteDialog}
                >
                    Delete Account
                </Button>
                <Button
                    type="submit"
                    size={'lg'}
                    className="cursor-pointer bg-brand-dark-green text-white font-bold text-sm py-2 px-4 rounded-md hover:bg-brand-dark-green-hover focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                    onClick={handleOpenProfileDialog}
                >
                    Update Profile
                </Button>
            </div>
            <CompleteProfileDialog
                from="profile"
                open={openProfileDialog}
                onClose={handleCloseProfileDialog}
            />
            <DeleteAccountDialog
                open={openDeleteDialog}
                isLoading={isDeleting}
                onClose={handleCloseDeleteDialog}
                onDelete={handleDelete}
            />
        </div>
    )
}
