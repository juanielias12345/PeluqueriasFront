import axios from "axios";
import { startEditClientLoading, stopEditClientLoading, startCreateClientLoading, stopCreateClientLoading, startDeleteClientLoading, stopDeleteClientLoading, getError, startAcceptCutLoading, stopAcceptCutLoading, startTurnsLoading, getTurnsSuccess, startGetUsers, getUsersSuccess, cleanClientTurns } from "./usersSlice";

//Obtener todos los clientes
export const getUsersReducer = () => {
    return async (dispatch) => {
        await dispatch(startGetUsers());
        try {
            const response = await axios.get("/getAllUsers");
            await dispatch(getUsersSuccess(response.data));
        } catch (err) {
            await dispatch(getError(err));
        }
    }
};

// Eliminar un cliente
export const deleteClientReducer = (client) => {
    return async (dispatch) => {
        await dispatch(startDeleteClientLoading())
        try {
            await axios.put('/deleteUser', client)
            await dispatch(stopDeleteClientLoading())
        } catch (err) {
            await dispatch(getError(err))
        }
    }
}

// Actualizar datos del cliente
export const updateClientReducer = (client) => {
    return async (dispatch) => {
        await dispatch(startEditClientLoading())
        try {
            await axios.put('/updateUser', client)
            await dispatch(stopEditClientLoading())
        } catch (err) {
            await dispatch(getError(err))
        }
    }
}

// Crear un nuevo cliente
export const createClientReducer = (client) => {
    return async (dispatch) => {
        await dispatch(startCreateClientLoading())
        try {
            await axios.post('/createUser', client)
            await dispatch(stopCreateClientLoading())
        } catch (err) {
            await dispatch(getError(err))
        }
    }
}

// Aceptar corte
export const acceptCutReducer = (token) => {
    return async (dispatch) => {
        await dispatch(startAcceptCutLoading)
        try {
            const response = await axios.put('/addCutAndRemoveToken', token);
            await dispatch(stopAcceptCutLoading(response.data));
        } catch (err) {
            await dispatch(getError(err))
        }
    }
}

// Obtener turnos del cliente
export const getUserTurnsReducer = (client) => {
    return async (dispatch) => {
        await dispatch(startTurnsLoading())
        try {
            const response = await axios.put('/getUserTurns', client);
            await dispatch(getTurnsSuccess(response.data));
        } catch (err) {
            await dispatch(getError(err))
        }
    }
}

// Obtener turnos del cliente
export const cleanClientTurnsStateReducer = () => {
    return async (dispatch) => {
        await dispatch(cleanClientTurns())
    }
}