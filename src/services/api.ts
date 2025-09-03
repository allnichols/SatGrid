import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SatelliteMeta, TSatellite } from '@/app/api/satellite_positions/types';

export const satellitePositionsApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
    endpoints: (builder) => ({
        getSatellitePositions: builder.query<TSatellite[], void>({
            query: () => 'satellite_positions'
        }),

        getMetaData: builder.query<SatelliteMeta[], string>({
            query: (satelliteName: string) => `meta/${satelliteName}`
        }),

        searchSatellites: builder.query<{ object_name: string, category?: string, tle_line1:string, tle_line2:string }[], { searchTerm: string, category: string[]  }>({
            query: ({ searchTerm, category }) => {
                const params = new URLSearchParams()
                if (searchTerm) params.set('searchTerm', searchTerm)

                if (category.length >= 1) {
                    params.append('category', category.join(','))
                }
                return `search-satellites?${params.toString()}`
            }
        })
    })
})

export const {
    useGetSatellitePositionsQuery,
    useGetMetaDataQuery,
    useSearchSatellitesQuery
} = satellitePositionsApi;