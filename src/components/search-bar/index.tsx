import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export default function SearchBar() {

    return (
        <div className='bg-[#171717] absolute top-4 left-4 z-10 border-[1px] border-gray-800 rounded-md p-4 sm:width-[100%]'>
            <div className='flex flex-row gap-2 justify-between'>
                <Input
                    type="text"
                    placeholder="Search for satellites"
                    className='text-white'
                    aria-label="Search for satellites"
                />
                <Popover>
                    <PopoverTrigger>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                        </svg>
                    </PopoverTrigger>
                    <PopoverContent className='bg-[#171717] border border-gray-800 rounded-md p-4'>
                       <div className="flex items-center space-x-2">
                           <Checkbox id="weather" />
                           <Label htmlFor="weather" className='text-white'>Weather</Label>
                       </div>
                    </PopoverContent>
                </Popover>

            </div>

        </div>
    );
}
