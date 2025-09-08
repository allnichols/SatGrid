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
    },
});

export const { toggleDetails, toggleCharts } = toolbarSlice.actions;
export default toolbarSlice.reducer;
