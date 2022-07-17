import React, { useEffect } from "react"
import { TextField, Button, Box, Typography, TextFieldProps, Stack, FormHelperText, FormGroup } from "@mui/material"
import DatePicker from "components/Datepicker"
import TimePicker from "components/Timepicker"
import { useFormik } from "formik"
import * as Yup from "yup"
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
    onSubmit: (value: FormType, reset: () => void) => void
    isEdit?: boolean
    data?: FormType
}

const initialValues: FormType = {
    name: "",
    date: null,
    start_time: null,
    end_time: null,
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    date: Yup.date().required("Required"),
    start_time: Yup.string()
        .required("Required")
        .when("end_time", (end_time: Date) => {
            if (end_time) {
                return Yup.date().max(end_time, "Start Time must be before Start").typeError("Required")
            }
            return Yup.date()
        }),
    end_time: Yup.string().required("Required"),
})

const MyForm: React.FC<PropsType> = (props) => {
    const { isEdit, onSubmit, data } = props
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const start_time = moment(values.start_time).format("HH:mm")
            const end_time = moment(values.end_time).format("HH:mm")
            const val: FormType = { ...values, start_time, end_time }
            onSubmit(val, () => formik.resetForm())
        },
    })

    useEffect(() => {
        if (data) {
            const values = {
                ...data,
                date: moment(data.date).toDate(),
                end_time: moment(data.end_time, "HH:mm").toString(),
                start_time: moment(data.start_time, "HH:mm").toString(),
            }
            formik.setValues(values)
        }
    }, [data])
    return (
        <>
            <Typography variant="h5">Shift Form</Typography>
            <Form onSubmit={formik.handleSubmit}>
                <FormGroup>
                    <TextField fullWidth id="name" name="name" label="Name" value={formik.values.name} onChange={formik.handleChange} />
                    <FormHelperText error>{formik.errors.name}</FormHelperText>
                </FormGroup>
                <Stack spacing={3}>
                    <FormGroup>
                        <DatePicker
                            value={formik.values.date}
                            label="Date"
                            inputFormat="DD/MM/yyyy"
                            onChange={(value) => formik.setFieldValue("date", value)}
                            renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => <TextField {...params} />}
                        />
                        <FormHelperText error>{formik.errors.date}</FormHelperText>
                    </FormGroup>
                    <FormGroup>
                        <TimePicker
                            label="Start Time"
                            ampm={false}
                            value={formik.values.start_time}
                            onChange={(value) => formik.setFieldValue("start_time", value)}
                            minutesStep={60}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <FormHelperText error>{formik.errors.start_time}</FormHelperText>
                    </FormGroup>
                    <FormGroup>
                        <TimePicker
                            label="End Time"
                            ampm={false}
                            value={formik.values.end_time}
                            onChange={(value) => formik.setFieldValue("end_time", value)}
                            minutesStep={60}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <FormHelperText error>{formik.errors.end_time}</FormHelperText>
                    </FormGroup>
                </Stack>
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
