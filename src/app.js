import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Inicio from './pages/Inicio';
import ProtectedRoute from './components/ProtectedRoute';
import AddCutPage from './pages/AddCutPage';

export default function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={
                    <ProtectedRoute>
                        <Inicio />
                    </ProtectedRoute>
                } />
                <Route path="/cortes/:token" element={
                    <AddCutPage />
                } />
            </Routes>
        </div>
    );
}
