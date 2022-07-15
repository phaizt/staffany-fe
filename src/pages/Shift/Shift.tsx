import React from "react"
import TableShift from "./TableShift"
import Grid from "@mui/material/Grid"

const Index = () => {
    return (
        <>
            <Grid container spacing={2} justifyContent="center" sx={{ mb: 3, px: 2 }}>
                <Grid item md={12} xs={12} gap={3}>
                    <TableShift />
                </Grid>
            </Grid>
        </>
    )
}

export default Index
