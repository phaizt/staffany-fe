import * as React from "react"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker"
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';


export default function BasicDatePicker(props: JSX.IntrinsicAttributes & DatePickerProps<unknown, unknown> & React.RefAttributes<HTMLDivElement>) {
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker {...props} />
        </LocalizationProvider>
    )
}
