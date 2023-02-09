import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    barber: {},
    getBarberLoading: true,
    createBarberLoading: false,
    editBarberLoading: false,
    error: undefined
}

const barberSlice = createSlice({
    name: "barber",
    initialState,
    reducers: {
        getBarberStart: (state) => {
            return {
                ...state,
                barberLoading: true
            };
        },
        getBarberSuccess: (state, action) => {
            return {
                ...state,
                barber: action.payload,
                getBarberLoading: false,
                error: undefined
            };
        },
        createBarberStart: (state) => {
            return {
                ...state,
                createBarberLoading: true
            };
        },
        createBarberSucces: (state, action) => {
            return {
                ...state,
                barber: action.payload,
                createBarberLoading: false,
                error: undefined
            };
        },
        editBarberStart: (state) => {
            return {
                ...state,
                editBarberLoading: true
            };
        },
        editBarberSuccess: (state, action) => {
            return {
                ...state,
                barber: action.payload,
                editBarberLoading: false,
                error: undefined
            };
        },
        getError: (state, action) => {
            return {
                ...state,
                error: action.payload,
                getBarberLoading: true,
                createBarberLoading: false,
                editBarberLoading: false
            };
        }
    }
})

export const { getBarberStart, getBarberSuccess, createBarberStart, createBarberSucces, editBarberStart, editBarberSuccess, getError } = barberSlice.actions;

export default barberSlice.reducer;