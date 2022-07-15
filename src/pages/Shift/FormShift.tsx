import * as React from "react"
import { TextField, Button, Box, Typography, TextFieldProps, Stack } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { TimePicker } from "@mui/x-date-pickers/TimePicker"
import { useFormik } from "formik"
import moment from "moment"
import styled from "@emotion/styled"
import { FormType } from "./dtos/form-shift.dto"

const Form = styled.form`
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

type PropsType = {
    onSubmit: (value: FormType) => void
    isEdit: boolean
    data?: FormType
}

const initialValues: FormType = {
    name: "",
    date: null,
    start_time: null,
    end_time: null,
}

const MyForm: React.FC<PropsType> = (props) => {
    const { isEdit, onSubmit } = props
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values) => {
            const start_time = moment(values.start_time).format("HH:mm")
            const end_time = moment(values.end_time).format("HH:mm")
            const val: FormType = { ...values, start_time, end_time }
            onSubmit(val)
        },
    })
    return (
        <>
            <Typography variant="h5">Shift Form</Typography>
            <Form onSubmit={formik.handleSubmit}>
                <TextField fullWidth id="name" name="name" label="Name" value={formik.values.name} onChange={formik.handleChange} />
                {/* <TextField fullWidth id="date" name="date" label="Date" value={formik.values.date} onChange={formik.handleChange} /> */}
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack spacing={3}>
                        <DatePicker
                            value={formik.values.date}
                            label="Date"
                            inputFormat="dd/MM/yyyy"
                            onChange={(value) => formik.setFieldValue("date", value)}
                            renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => <TextField {...params} />}
                        />
                        <TimePicker
                            label="Start Time"
                            ampm={false}
                            value={formik.values.start_time}
                            onChange={(value) => formik.setFieldValue("start_time", value)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <TimePicker
                            label="End Time"
                            ampm={false}
                            value={formik.values.end_time}
                            onChange={(value) => formik.setFieldValue("end_time", value)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Stack>
                </LocalizationProvider>
                <Box display="flex" justifyContent="end">
                    <Button color="primary" variant="contained" type="submit">
                        {isEdit ? "Update" : "Submit"}
                    </Button>
                </Box>
            </Form>
        </>
    )
}

export default MyForm
