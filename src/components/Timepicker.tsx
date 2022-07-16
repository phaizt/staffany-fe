import * as React from "react"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { TimePicker, TimePickerProps } from "@mui/x-date-pickers/TimePicker"

export default function BasicTimePicker(props: JSX.IntrinsicAttributes & TimePickerProps<unknown, unknown> & React.RefAttributes<HTMLDivElement>) {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker {...props} />
        </LocalizationProvider>
    )
}
