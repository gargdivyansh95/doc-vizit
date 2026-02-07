"use client";
import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Image from 'next/image'
import RemoveIcon from '@/assets/images/share/remove.svg';
import moment from 'moment';
import { getAccessDurationLabel } from '@/utils';

export default function AccessLogTable({ accessLog }) {
    return (
        <div className="bg-white rounded-lg border border-brand-light-green overflow-hidden">
            <div className="max-h-70 overflow-y-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className="text-sm font-semibold text-black">Recipient</TableHead>
                            <TableHead className="text-sm font-semibold text-black">Method</TableHead>
                            <TableHead className="text-sm font-semibold text-black">Duration</TableHead>
                            <TableHead className="text-sm font-semibold text-black">Expires At</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.isArray(accessLog?.data) && accessLog?.data?.map((log, index) => (
                            <TableRow key={index}>
                                <TableCell className="text-sm font-semibold text-brand-gray">{log?.phone ? log?.phone : 'Secure Link'}</TableCell>
                                <TableCell className="text-sm font-semibold text-brand-gray">{log?.method}</TableCell>
                                <TableCell className="text-sm font-semibold text-brand-gray">{getAccessDurationLabel(log?.access_duration)}</TableCell>
                                <TableCell>
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm font-semibold text-brand-gray whitespace-pre-line leading-tight">
                                            <p>{log?.expiresAt ? moment(log?.expiresAt).format('DD-MM-YYYY') : 'Never'}</p>
                                            <p>{log?.expiresAt ? moment(log?.expiresAt).format('hh:mm A') : ''}</p>
                                            {/* {log?.expiresAt ? moment(log?.expiresAt).fromNow() : 'Never'} */}
                                        </div>
                                        <button className="cursor-pointer" onClick={() => { console.log('first') }}>
                                            <Image src={RemoveIcon} alt="remove" />
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
