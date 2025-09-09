import { createSlice } from '@reduxjs/toolkit';


const toolbarSlice = createSlice({
    name: 'toolbar',
    initialState: { isDetailsOpen: false, isChartsOpen: false },
    reducers: {
        toggleDetails: (state) => {
            state.isDetailsOpen = !state.isDetailsOpen;
        },
        toggleCharts: (state) => {
            state.isChartsOpen = !state.isChartsOpen;
        },
        openCharts: (state) => {
            state.isChartsOpen = true;
            state.isDetailsOpen = false;
        },
        closeCharts: (state) => {
            state.isChartsOpen = false;
        },
        openDetails: (state) => {
            state.isDetailsOpen = true;
            state.isChartsOpen = false;
        },
        closeDetails: (state) => {
            state.isDetailsOpen = false;
        }


    },
});

export const { toggleDetails, toggleCharts, openCharts, closeCharts, openDetails, closeDetails } = toolbarSlice.actions;
export default toolbarSlice.reducer;
