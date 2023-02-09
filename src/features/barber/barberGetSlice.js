import axios from "axios";
import { getBarberStart, getBarberSuccess, createBarberStart, createBarberSucces, editBarberStart, editBarberSuccess, getError } from "./barberSlice";

// Obtener barberia
export const getBarberReducer = () => {
    return async (dispatch) => {
        dispatch(getBarberStart())
        try {
            const response = await axios.get('/getBarber')
            dispatch(getBarberSuccess(response.data))
        } catch (err) {
            dispatch(getError(err))
        }
    }
}

// Crear barberia
export const createBarberReducer = (barberData) => {
    return async (dispatch) => {
        dispatch(createBarberStart())
        try {
            const response = await axios.post('/createBarber', barberData)
            dispatch(createBarberSucces(response.data))
        } catch (err) {
            dispatch(getError(err))
        }
    }
}

// Editar barberia
export const editBarberReducer = (barberData) => {
    return async (dispatch) => {
        dispatch(editBarberStart())
        try {
            const response = await axios.put('/updateBarber', barberData)
            dispatch(editBarberSuccess(response.data))
        } catch (err) {
            dispatch(getError(err))
        }
    }
}