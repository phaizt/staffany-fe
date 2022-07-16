import { useState } from "react"
import { Button, Box } from "@mui/material"
import TableShift from "./TableShift"
import Grid from "@mui/material/Grid"
import ShiftForm from "./FormShift"
import { FormType } from "./dtos/form-shift.dto"
import Modal from "components/Modal"
import Timeline from "./Timeline"
import * as ShiftRequest from "request/shift.request"
import { toast } from "react-toastify"

const Index = () => {
    const [openModal, setOpenModal] = useState(false)
    const [openModalTimeline, setOpenModalTimeline] = useState(false)
    const handleClose = () => setOpenModal(false)
    const handleCloseTimeline = () => setOpenModalTimeline(false)
    const [refreshTable, setRefreshTable] = useState(false)

    const handleOpen = () => {
        setOpenModal(true)
    }

    const handleSubmit = (value: FormType, reset: () => void) => {
        ShiftRequest.create(value)
            .then((res) => {
                setRefreshTable((prev) => !prev)
                toast.success(res.data.message)
                reset()
            })
            .catch((err) => {
                toast.error(err.response.data.message)
            })
    }

    return (
        <>
            <Grid container spacing={2} justifyContent="center" sx={{ mb: 3, px: 2 }}>
                <Grid item md={12} xs={12} gap={3}>
                    <Box display="flex" justifyContent="end" mb={3} gap={3}>
                        <Button variant="outlined" onClick={() => setOpenModalTimeline(true)}>
                            View Timeline
                        </Button>
                        <Button variant="contained" onClick={() => handleOpen()}>
                            Add new Shift
                        </Button>
                    </Box>
                    <TableShift refresh={refreshTable} />
                </Grid>
            </Grid>
            <Modal open={openModalTimeline} handleClose={handleCloseTimeline}>
                <Timeline />
            </Modal>

            <Modal open={openModal} handleClose={handleClose}>
                <ShiftForm onSubmit={handleSubmit} />
            </Modal>
        </>
    )
}

export default Index
