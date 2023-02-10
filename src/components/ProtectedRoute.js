import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getBarberReducer } from "../features/barber/barberGetSlice"
import CreateBarber from "../pages/CreateBarber"
import Loading from "./Loading/Loading"
import BarberPin from "./Modals/BarberPin"

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBarberReducer())
  }, [dispatch])
  const barber = useSelector((state) => state.barberStore.barber);
  const getBarberLoading = useSelector((state) => state.barberStore.getBarberLoading);
  const [access, setAccess] = useState(false);
  const [show, setShow] = useState(true);

  if (getBarberLoading) return <Loading screen={"fScreen"} msg={"Recopilando datos de la barberia"} />

  const acceptedPin = () => {
    setAccess(true)
    setShow(false)
  }

  if (!getBarberLoading && barber.length === 0) return <CreateBarber />

  if (!access) {
    return (
      <BarberPin show={show} barber={barber} acceptedPin={acceptedPin} />
    )
  }

  return <>{children}</>
}

export default ProtectedRoute