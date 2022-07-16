import { useEffect, useState } from "react"
import { Button, Box, FormGroup, TextField, TextFieldProps } from "@mui/material"
import TableShift from "./TableShift"
import Grid from "@mui/material/Grid"
import ShiftForm from "./FormShift"
import { FormType } from "./dtos/form-shift.dto"
import Modal from "components/Modal"
import Timeline from "./Timeline"
import * as ShiftRequest from "request/shift.request"
import { toast } from "react-toastify"
import DatePicker from "components/Datepicker"
import moment from "moment"

const Index = () => {
    const [openModal, setOpenModal] = useState(false)
    const [refreshTable, setRefreshTable] = useState(false)
    const [date, setDate] = useState<Date>(moment().toDate())
    const [openModalTimeline, setOpenModalTimeline] = useState(false)
    const [timeline, setTimeline] = useState<FormType[]>([])

    const handleClose = () => setOpenModal(false)
    const handleCloseTimeline = () => setOpenModalTimeline(false)
    const handleOpen = () => {
        setOpenModal(true)
    }

    const handleDateChange = (value: Date) => {
        setDate(value)
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
                    <Box display="flex" justifyContent="end" mb={3} gap={3} flexWrap="wrap">
                        <FormGroup>
                            <DatePicker
                                value={date}
                                label="Date"
                                inputFormat="dd/MM/yyyy"
                                onChange={(value) => handleDateChange(value as Date)}
                                renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => <TextField {...params} />}
                            />
                        </FormGroup>
                        <Button variant="outlined" onClick={() => setOpenModalTimeline(true)}>
                            View Timeline
                        </Button>
                        <Button variant="contained" onClick={() => handleOpen()}>
                            Add new Shift
                        </Button>
                    </Box>
                    <TableShift refresh={refreshTable} date={date} setData={setTimeline} />
                </Grid>
            </Grid>
            <Modal open={openModalTimeline} handleClose={handleCloseTimeline}>
                <Timeline data={timeline} />
            </Modal>

            <Modal open={openModal} handleClose={handleClose}>
                <ShiftForm onSubmit={handleSubmit} />
            </Modal>
        </>
    )
}

export default Index
