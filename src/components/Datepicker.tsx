import * as React from "react"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker"

export default function BasicDatePicker(props: JSX.IntrinsicAttributes & DatePickerProps<unknown, unknown> & React.RefAttributes<HTMLDivElement>) {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker {...props} />
        </LocalizationProvider>
    )
}
