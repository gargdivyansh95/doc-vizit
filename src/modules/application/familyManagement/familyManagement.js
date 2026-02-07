"use client"
import React, { useEffect, useMemo, useState } from 'react'
import { LoaderIcon, PlusCircle, Search } from 'lucide-react';
import { DeleteAccountDialog, Loader, NoData } from '@/shared';
import AvatarIcon from "@/assets/images/right-sidebar/userAvatar.svg";
import LockIcon from "@/assets/images/family/lock.svg";
import { useForm } from 'react-hook-form';
import { DEVICE_TYPE } from '@/constants/enums';
import { useDeviceType } from '@/hooks';
import { Button } from '@/components/ui/button';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group';
import Image from 'next/image';
import { AddMemberDialog, ExistingAccountDialog, MemberItem, NoAccountDialog } from './components';
import { familyManagementActions } from './familyManagement.action';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { profileActions } from '../profile/profile.action';

export const FamilyManagement = () => {

    const dispatch = useDispatch();
    const deviceType = useDeviceType();
    const isMobile = deviceType === DEVICE_TYPE.MOBILE;
    const [openAddMemberDialog, setOpenAddMemberDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openNoAccountDialog, setOpenNoAccountDialog] = useState(false);
    const [openExistingAccountDialog, setOpenExistingAccountDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [familyMemberList, setFamilyMemberList] = useState([])
    const [selectedMember, setSelectedMember] = useState(null);
    const [customerId, setCustomerId] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const { register, watch, control, setValue } = useForm({
        defaultValues: {
            searchMember: '',
        },
    });
    const searchValue = watch('searchMember');

    const getFamilyMembers = () => {
        setIsLoading(true)
        dispatch(familyManagementActions.fetchFamilyMembers(
            {},
            (response) => {
                if (response.success === true) {
                    setFamilyMemberList(response?.data?.data)
                    setIsLoading(false)
                    // Handle successful response
                }
            },
            (error) => {
                setIsLoading(false)
                // Handle error response
            },
        ))
    }

    useEffect(() => {
        getFamilyMembers();
    }, []);

    const handleOpenAddMemberDialog = () => {
        setSelectedMember(null);
        setOpenAddMemberDialog(true);
    };

    const handleCloseAddMemberDialog = () => {
        setSelectedMember(null);
        setOpenAddMemberDialog(false);
    }

    const handleEditMember = (data) => {
        setSelectedMember(data);
        setOpenAddMemberDialog(true);
    }

    const handleOpenDeleteDialog = (id) => {
        setCustomerId(id);
        setOpenDeleteDialog(true);
    }
    const handleCloseDeleteDialog = () => {
        setCustomerId(null);
        setOpenDeleteDialog(false);
    }

    const handleOpenNoAccountDialog = () => setOpenNoAccountDialog(true);
    const handleCloseNoAccountDialog = () => setOpenNoAccountDialog(false);

    const handleOpenExistingAccountDialog = () => setOpenExistingAccountDialog(true);
    const handleCloseExistingAccountDialog = () => setOpenExistingAccountDialog(false);

    // function to search members based on input
    const filteredMembers = useMemo(() => {
        let results = familyMemberList.filter((item) => {
            // search value filter
            const matchesSearch = item.name.toLowerCase().includes(searchValue.toLowerCase()) || item.mobile_number.toLowerCase().includes(searchValue.toLowerCase());
            return matchesSearch
        });
        return results;
    }, [searchValue, familyMemberList]);

    const handleDelete = () => {
        const payload = {
            memberId: customerId,
        };
        setIsDeleting(true);
        dispatch(profileActions.postDeleteUser(
            payload,
            (response) => {
                if (response.success === true) {
                    toast.success(response.data.statusMsg || "Member deleted successfully");
                    setIsDeleting(false);
                    handleCloseDeleteDialog();
                    getFamilyMembers();
                }
            },
            (error) => {
                console.log(error, 'error details')
                setIsDeleting(false);
                toast.error(error.error);
            },
        ))
    }

    const handleSaveMember = (memberData) => {
        if (memberData) {
            getFamilyMembers();
        }
        // handleOpenNoAccountDialog();
        // handleOpenExistingAccountDialog();
    }

    return (
        <div className='relative'>
            <div className='lg:mb-6 md:mb-4 mb-4 flex items-center justify-between lg:gap-0 gap-4'>
                <h1 className="lg:text-3xl md:text-xl text-lg font-bold">Family Management</h1>
                <div className='flex items-center lg:gap-4 gap-2'>
                    <InputGroup className="bg-white border-[#D8D8D8] w-full rounded-lg lg:h-11 md:h-11 h-8 shadow-[0px_0px_4px_0px_#0000000D] has-[[data-slot=input-group-control]:focus-visible]:ring-0
                            has-[[data-slot=input-group-control]:focus-visible]:ring-transparent has-[[data-slot=input-group-control]:focus-visible]:ring-offset-0
                            focus-within:!border-brand-dark-green transition-all">
                        <InputGroupInput placeholder="Search Member" {...register('searchMember')} className='text-xs lg:text-base' />
                        <InputGroupAddon align="inline-end">
                            <InputGroupButton variant="secondary" className="!bg-transparent lg:p-1 md:p-1 p-0">
                                <div className="w-7 h-7 flex items-center justify-center">
                                    <Search className="lg:size-4 md:size-4 size-3 text-black" />
                                </div>
                            </InputGroupButton>
                        </InputGroupAddon>
                    </InputGroup>
                </div>
            </div>
            <div>
                <div className="flex items-center justify-between">
                    <div className='flex items-center gap-2 border-1 border-[#47A76F33] px-3 py-2 rounded-full'>
                        <Image src={LockIcon} alt="secure" />
                        <div>
                            <p className="text-brand-dark-green font-medium text-sm">e-DigiHealth ensures your family’s health data is securely managed and patient-owned.</p>
                            <p className="text-brand-dark-green font-medium text-sm">You control who sees what — always.</p>
                        </div>
                    </div>
                    {!isMobile &&
                        <Button
                            size={'lg'}
                            onClick={handleOpenAddMemberDialog}
                            className="shadow-none cursor-pointer bg-brand-dark-green text-white font-bold text-sm py-2 px-4 rounded-md hover:bg-brand-dark-green-hover focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                        >
                            <PlusCircle className="w-4 h-4" />
                            Add Member
                        </Button>
                    }
                </div>
            </div>
            <div className='mt-4 lg:mb-0 md:mb-0 mb-10'>
                {isLoading ? (
                    <Loader height="h-60" />
                ) : filteredMembers?.length === 0 ?
                    <NoData
                        label="No members available"
                    /> :
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredMembers?.map((item, index) => (
                            <MemberItem key={index} item={item} onEdit={handleEditMember} onOpenDelete={handleOpenDeleteDialog} />
                        ))}
                    </div>
                }
            </div>
            {isMobile &&
                <div className='fixed bottom-8 left-0 right-0 px-4'>
                    <Button
                        size={'lg'}
                        onClick={handleOpenAddMemberDialog}
                        className="w-full shadow-[0px_4px_4px_0px_#00000040] cursor-pointer bg-brand-dark-green text-white font-bold text-sm py-2 px-4 rounded-md hover:bg-brand-dark-green-hover focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                    >
                        <PlusCircle className="w-4 h-4" />
                        Add Member
                    </Button>
                </div>
            }
            <AddMemberDialog open={openAddMemberDialog} selectedMember={selectedMember} onClose={handleCloseAddMemberDialog} onSave={handleSaveMember} />
            <DeleteAccountDialog open={openDeleteDialog} isLoading={isDeleting} onClose={handleCloseDeleteDialog} onDelete={handleDelete} />
            <NoAccountDialog open={openNoAccountDialog} onClose={handleCloseNoAccountDialog} />
            <ExistingAccountDialog open={openExistingAccountDialog} onClose={handleCloseExistingAccountDialog} />
        </div>
    )
}
