import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SatelliteMeta, TSatellite } from '@/app/api/satellites/types';

export const satellitePositionsApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/'}),
    endpoints: (builder) => ({
        getSatellitePositions: builder.query<TSatellite[], void>({
            query: () => 'satellites'
        })
    })
})

export const satelliteMetaData = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
    endpoints: (builder) => ({
        getSatelliteMeta: builder.query<SatelliteMeta[], string>({
            query: (satelliteName: string | null) => `satellites/meta/${satelliteName}`
        })
    })
});

export const { useGetSatellitePositionsQuery } = satellitePositionsApi;
export const { useGetSatelliteMetaQuery } = satelliteMetaData;