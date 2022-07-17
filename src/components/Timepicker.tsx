import * as React from "react"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { TimePicker, TimePickerProps } from "@mui/x-date-pickers/TimePicker"
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

export default function BasicTimePicker(props: JSX.IntrinsicAttributes & TimePickerProps<unknown, unknown> & React.RefAttributes<HTMLDivElement>) {
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <TimePicker {...props} />
        </LocalizationProvider>
    )
}
