import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getBarberReducer } from "../features/barber/barberGetSlice"
import CreateBarber from "../pages/CreateBarber"

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getBarberReducer())
  }, [dispatch])
  const barber = useSelector((state) => state.barberStore.barber)
  const getBarberLoading = useSelector((state) => state.barberStore.getBarberLoading)

  if (getBarberLoading) return <h1>Loading...</h1>

  if (!getBarberLoading && barber.length === 0) return <CreateBarber />

  return <>{children}</>
}

export default ProtectedRoute