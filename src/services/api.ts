import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Satellite } from '@/app/api/satellites/types';

export const satellitePositionsApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/'}),
    endpoints: (builder) => ({
        getSatellitePositions: builder.query<Satellite[], void>({
            query: () => 'satellites'
        })
    })
})

export const { useGetSatellitePositionsQuery } = satellitePositionsApi;