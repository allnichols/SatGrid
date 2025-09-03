import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useSearchSatellitesQuery } from '@/services/api';

const categoryOptions = ['weather', 'communication', 'navigation'];

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        const searchHandler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 400);

        return () => clearTimeout(searchHandler);
    }, [searchTerm])

    const handleCategoryChange = (category: string) => {
        setCategories(prev => {
          return prev.includes(category)
            ? prev.filter(cat => cat !== category)
            : [...prev, category]
        })
    }

    console.log(categories)

    const { data, isError, isLoading, } = useSearchSatellitesQuery(
        { searchTerm: debouncedSearchTerm, category: categories }, 
        { skip: debouncedSearchTerm.length < 1 });

    return (
        <div className='bg-[#171717] absolute top-4 left-4 z-10 border-[1px] border-gray-800 rounded-md p-4 sm:width-[100%]'>
            <div className='flex flex-row gap-2 justify-between'>
                <Input
                    type="text"
                    placeholder="Search for satellites"
                    className='text-white'
                    aria-label="Search for satellites"
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <Popover>
                    <PopoverTrigger>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                        </svg>
                    </PopoverTrigger>
                    <PopoverContent className='bg-[#171717] border border-gray-800 rounded-md p-4'>
                        {categoryOptions.map(category => {
                            return (
                                <div className="flex items-center mt-2 p-1" key={category}>
                                    <Checkbox 
                                        id={category} 
                                        checked={categories.includes(category)} 
                                        onCheckedChange={() => handleCategoryChange(category)}
                                    />
                                    <Label htmlFor={category} className='text-white ms-2'>{category.charAt(0).toUpperCase() + category.slice(1)}</Label>
                                </div>
                            )
                        })}
                    </PopoverContent>
                </Popover>

            </div>
            {isLoading && <p className='text-white'>Loading...</p>}
            {isError && <p className='text-white'>Error fetching data</p>}
            {data && debouncedSearchTerm.length > 0 && (
                <ul className='text-white'>
                    {data.map((satellite) => (
                        <li key={satellite.object_name}>{satellite.object_name}</li>
                    ))}
                </ul>
            )}

        </div>
    );
}
