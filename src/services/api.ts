import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SatellitePosition } from '@/types/types';

export const satellitePositionsApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/'}),
    endpoints: (builder) => ({
        getSatellitePositions: builder.query<SatellitePosition[], void>({
            query: () => 'satellites'
        })
    })
})

export const { useGetSatellitePositionsQuery } = satellitePositionsApi;