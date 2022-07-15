import React, { lazy, Suspense } from "react"
import { CircularProgress, Box } from "@mui/material"
import { Route, Routes } from "react-router-dom"
import Layout from "components/Layout"

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
            </Layout>
        </Suspense>
    )
}

export default App
