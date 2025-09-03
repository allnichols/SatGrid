import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SatelliteMeta, TSatellite } from '@/app/api/satellite_positions/types';

export const satellitePositionsApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/'}),
    endpoints: (builder) => ({
        getSatellitePositions: builder.query<TSatellite[], void>({
            query: () => 'satellite_positions'
        }),

        getMetaData: builder.query<SatelliteMeta[], string>({
            query: (satelliteName: string) => `meta/${satelliteName}`
        }),

        getSearchSatellites: builder.query<any, { searchTerm: string, category: string }>({
            query: ({ searchTerm, category }) => `search-satellites?searchTerm=${searchTerm}&category=${category}`
        })
    })
})

export const {
    useGetSatellitePositionsQuery,
    useGetMetaDataQuery
} = satellitePositionsApi;