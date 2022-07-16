import React, { lazy, Suspense } from "react"
import { CircularProgress, Box } from "@mui/material"
import { Route, Routes } from "react-router-dom"
import Layout from "components/Layout"
import { ToastContainer } from 'react-toastify';


import 'react-toastify/dist/ReactToastify.css';
import "./App.css"

const Result = lazy(() => import("pages/Shift"))

function App() {
    return (
        <Suspense
            fallback={
                <Box display="flex" alignItems="center" justifyContent="center">
                    <CircularProgress />
                </Box>
            }
        >
            <Layout>
                <Routes>
                    <Route path={`${process.env.PUBLIC_URL}/`} element={<Result />} />
                </Routes>
                <ToastContainer />
            </Layout>
        </Suspense>
    )
}

export default App
