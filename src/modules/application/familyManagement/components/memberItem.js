import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import AvatarIcon from "@/assets/images/right-sidebar/userAvatar.svg";
import { Button } from '@/components/ui/button';
import UserSwitchIcon from "@/assets/images/right-sidebar/user-switch.svg";
import AccessIcon from "@/assets/images/family/access.svg";
import { convertHeightToCm } from '@/utils';
import moment from 'moment';
import { Edit2, PlusCircle, Trash2 } from 'lucide-react';

export default function MemberItem({item, onEdit, onOpenDelete}) {
    
    const age = moment().diff(moment(item?.dob, "YYYY-MM-DD"), "years");

    return (
        <Card className="w-full bg-white rounded-xl shadow-[0px_0px_6.4px_0px_#0000000D] border-0 overflow-hidden py-3 px-3">
            <CardContent className="p-0">
                <div className='flex items-center gap-2 justify-between'>
                    <div className='flex items-center gap-3'>
                        <Image
                            src={item?.avatar || AvatarIcon}
                            alt={item?.name || "User"}
                            className="w-12 h-12 rounded-full border-1 border-brand-gray"
                        />
                        <div>
                            <h5 className="text-lg font-medium text-black">{item?.name}</h5>
                            <p className="text-base font-medium text-brand-gray">{item?.relation}</p>
                        </div>
                    </div>
                    <Button
                        type="submit"
                        size={'xs'}
                        variant='outline'
                        className="cursor-pointer bg-transparent hover:bg-transparent text-brand-dark-green hover:text-brand-dark-green font-medium text-sm py-1 px-2 rounded-full border-brand-dark-green shadow-none"
                    >
                        <div className="w-4 h-4 bg-brand-light-green rounded-sm flex items-center justify-center">
                            <Image src={UserSwitchIcon} alt="UserSwitchIcon" className="w-3 h-3" />
                        </div>
                        Switch
                    </Button>
                </div>
                <div className='space-y-1 mt-3'>
                    <p className='text-base font-medium text-brand-gray'>Mobile Number- {item?.mobile_number}</p>
                    <p className='text-base font-medium text-brand-gray'>Gender- {item?.gender}</p>
                    <p className='text-base font-medium text-brand-gray'>DOB- {item?.dob ? moment(item?.dob).format('DD MMM YYYY') : ''}</p>
                    <p className='text-base font-medium text-brand-gray'>Age- {age} years</p>
                    <p className='text-base font-medium text-brand-gray'>Blood Group- {item?.blood_group}</p>
                    <p className='text-base font-medium text-brand-gray'>Height- {convertHeightToCm(item?.height)}cm</p>
                    <p className='text-base font-medium text-brand-gray'>Weight- {item?.weight}kg</p>
                    <p className='text-base font-medium text-brand-gray'>Address- {item?.address}</p>
                </div>
                <div className='flex justify-between items-center mt-3'>
                    <div className='flex items-center gap-2 border-1 border-brand-light-gray rounded-full px-2 py-1'>
                        <Image src={AccessIcon} alt="AccessIcon" className="w-4 h-4" />
                        <p className='text-base font-medium text-brand-gray'>Access- Full Access</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Button
                            onClick={() => onEdit(item)}
                            className="cursor-pointer border-1 border-brand-light-gray shadow-sm bg-white text-brand-dark-green font-bold text-sm py-2 px-4 rounded-md hover:bg-white-hover focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                        >
                            <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                            onClick={() => onOpenDelete(item?.customerId)}
                            className="cursor-pointer border-1 border-brand-light-gray shadow-sm bg-white text-brand-red font-bold text-sm py-2 px-4 rounded-md hover:bg-white-hover focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
