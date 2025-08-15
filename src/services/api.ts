import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const satellitePositionsApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/'}),
    endpoints: (builder) => ({
        getSatellitePositions: builder.query<any[], void>({
            query: () => 'satellites'
        })
    })
})

export const { useGetSatellitePositionsQuery } = satellitePositionsApi;