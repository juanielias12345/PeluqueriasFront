import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    users: [],
    clientTurns: [],
    clientCuts: {},
    loadingGetUsers: true,
    turnsLoading: false,
    createClientLoading: false,
    deleteClientLoading: false,
    editClientLoading: false,
    acceptCutLoading: false,
    error: undefined
}

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        startGetUsers: (state) => {
            return {
                ...state,
                loadingGetUsers: true
            };
        },
        getUsersSuccess: (state, action) => {
            return {
                ...state,
                loadingGetUsers: false,
                users: action.payload,
                error: undefined
            };
        },
        startCreateClientLoading: (state) => {
            return {
                ...state,
                createClientLoading: true
            };
        },
        stopCreateClientLoading: (state) => {
            return {
                ...state,
                createClientLoading: false,
                error: undefined
            };
        },
        startDeleteClientLoading: (state) => {
            return {
                ...state,
                deleteClientLoading: true
            };
        },
        stopDeleteClientLoading: (state) => {
            return {
                ...state,
                deleteClientLoading: false,
                error: undefined
            };
        },
        startEditClientLoading: (state) => {
            return {
                ...state,
                editClientLoading: true
            };
        },
        stopEditClientLoading: (state) => {
            return {
                ...state,
                editClientLoading: false,
                error: undefined
            };
        },
        startAcceptCutLoading: (state) => {
            return {
                ...state,
                acceptCutLoading: true
            };
        },
        stopAcceptCutLoading: (state, action) => {
            return {
                ...state,
                acceptCutLoading: false,
                clientCuts: action.payload,
                error: undefined
            };
        },
        startTurnsLoading: (state) => {
            return {
                ...state,
                turnsLoading: true
            };
        },
        getTurnsSuccess: (state, action) => {
            return {
                ...state,
                turnsLoading: false,
                clientTurns: action.payload,
                error: undefined
            };
        },
        cleanClientTurns: (state) => {
            return {
                ...state,
                clientTurns: []
            };
        },
        getError: (state, action) => {
            return {
                ...state,
                error: action.payload,
                editClientLoading: false,
                createClientLoading: false,
                deleteClientLoading: false,
                acceptCutLoading: false,
                turnsLoading: false,
                loadingGetUsers: false
            }
        }
    }
})

export const { startGetUsers, getUsersSuccess, startEditClientLoading, stopEditClientLoading, startCreateClientLoading, stopCreateClientLoading, startDeleteClientLoading, stopDeleteClientLoading, startAcceptCutLoading, stopAcceptCutLoading, startTurnsLoading, getTurnsSuccess, cleanClientTurns, getError } = usersSlice.actions;

export default usersSlice.reducer;