"use client"
import React from 'react';
import { FilterIcon, Search, SortDescIcon, Upload } from 'lucide-react';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { REPORT_FILTER_OPTIONS, REPORT_SORTING_OPTIONS } from '@/constants/constants';
import { Controller } from 'react-hook-form';

export default function ReportHeader({isMobile, register, control, sortingValue, onSortChange, onUploadClick}) {

    return (
        <div className='flex items-center lg:gap-4 gap-2'>
            {/* Search Input */}
            <InputGroup className="bg-white border-[#D8D8D8] w-full rounded-lg lg:h-11 md:h-11 h-8 shadow-[0px_0px_4px_0px_#0000000D] has-[[data-slot=input-group-control]:focus-visible]:ring-0
                    has-[[data-slot=input-group-control]:focus-visible]:ring-transparent has-[[data-slot=input-group-control]:focus-visible]:ring-offset-0
                    focus-within:!border-brand-dark-green transition-all">
                <InputGroupInput placeholder="Search Report" {...register('searchReport')} className='text-xs lg:text-base' />
                <InputGroupAddon align="inline-end">
                    <InputGroupButton variant="secondary" className="!bg-transparent lg:p-1 md:p-1 p-0">
                        <div className="w-7 h-7 flex items-center justify-center">
                            <Search className="lg:size-4 md:size-4 size-3 text-black" />
                        </div>
                    </InputGroupButton>
                </InputGroupAddon>
            </InputGroup>

            {/* Upload Button */}
            {!isMobile &&
                <Button
                    type="submit"
                    size={'lg'}
                    className="cursor-pointer bg-brand-dark-green text-white font-bold text-sm py-2 px-4 rounded-md hover:bg-brand-dark-green-hover focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                    onClick={onUploadClick}
                >
                    <Upload className="w-4 h-4" />
                    Upload Report
                </Button>
            }

            {/* Sort Dropdown */}
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" aria-label="Open menu" className="bg-white border-[#D8D8D8] rounded-lg cursor-pointer lg:size-9 md:size-8 size-7">
                        <SortDescIcon className="lg:size-5 size-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-50" align="end">
                    <DropdownMenuGroup>
                        {REPORT_SORTING_OPTIONS.map((option) => (
                            <DropdownMenuItem
                                key={option.id}
                                className={`cursor-pointer text-sm font-medium ${sortingValue === option.value ? 'bg-gray-100' : ''}`}
                                onClick={() => onSortChange(option.value)}
                            >
                                {option.label}
                                {sortingValue === option.value && (
                                    <span className="ml-auto">✓</span>
                                )}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Filter Popover */}
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="bg-white border-[#D8D8D8] rounded-lg cursor-pointer lg:size-9 md:size-8 size-7">
                        <FilterIcon className="lg:size-4 size-3" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-60" align="end">
                    {/* Report Type Filter */}
                    <div className="space-y-4">
                        <div>
                            <h4 className="text-sm font-medium mb-2">Report Type</h4>
                            <div className="space-y-2">
                                {REPORT_FILTER_OPTIONS.reportType.map((option) => (
                                    <div key={option.id} className="flex items-center gap-3">
                                        <Controller
                                            name={`filters.reportType.${option.id}`}
                                            control={control}
                                            render={({ field }) => (
                                                <Checkbox
                                                    id={option.id}
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                    className='cursor-pointer border-black'
                                                />
                                            )}
                                        />
                                        <Label
                                            htmlFor={option.id}
                                            className="text-black text-sm font-medium cursor-pointer"
                                        >
                                            {option.label}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* AI Status Filter */}
                    <div className="space-y-4 mt-4">
                        <div>
                            <h4 className="text-sm font-medium mb-2">AI Status</h4>
                            <div className="space-y-2">
                                {REPORT_FILTER_OPTIONS.aiStatus.map((option) => (
                                    <div key={option.id} className="flex items-center gap-3">
                                        <Controller
                                            name={`filters.aiStatus.${option.id}`}
                                            control={control}
                                            render={({ field }) => (
                                                <Checkbox
                                                    id={option.id}
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                    className='cursor-pointer border-black'
                                                />
                                            )}
                                        />
                                        <Label
                                            htmlFor={option.id}
                                            className="text-black text-sm font-medium cursor-pointer"
                                        >
                                            {option.label}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}
