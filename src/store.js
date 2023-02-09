import { configureStore } from '@reduxjs/toolkit'
import userSlice from "./features/users/usersSlice"
import barberSlice from "./features/barber/barberSlice"

export const store = configureStore({
  reducer: {
    usersStore: userSlice,
    barberStore: barberSlice
  },
})