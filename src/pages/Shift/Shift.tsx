import { useState } from "react"
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
import swal from "sweetalert"

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

    const handlePublishWeek = () => {
        swal({
            title: "Are you sure to publish one week of shift?",
            text: "Make sure to select a correct a day of week, week start from Sunday. Once published, you will not be able to revert them!",
            icon: "warning",
            buttons: ["Cancel", "Publish"],
            dangerMode: true,
        }).then((response) => {
            if (response) {
                ShiftRequest.publishWeekShift(moment(date).format("yyyy-MM-DD"))
                    .then((res) => {
                        setRefreshTable((prev) => !prev)
                        toast.success(res.data.message)
                    })
                    .catch((err) => {
                        toast.error(err.response.data.message)
                    })
            }
        })
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
                                inputFormat="DD/MM/yyyy"
                                onChange={(value) => handleDateChange(value as Date)}
                                renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => <TextField {...params} />}
                            />
                        </FormGroup>
                        <Button variant="contained" color="warning" onClick={handlePublishWeek}>
                            Publish a Week
                        </Button>
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
