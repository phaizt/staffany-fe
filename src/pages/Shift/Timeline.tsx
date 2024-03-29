import React from "react"
import { Typography, Box } from "@mui/material"
import moment from "moment"
import styled from "@emotion/styled"
import { FormType } from "./dtos/form-shift.dto"

const TimeTable = styled.table`
    white-space: nowrap;
    width: 100%;
`
const TimeBox = styled(Box)`
    margin: 0.75rem 0;
    background: #009688;
    padding: 4px;
    border: 2px solid #212121;
    border-radius: 4px;
`

const TimeContent = styled.p`
    margin: 0;
`

const Line = styled.hr`
    width: 100%;
    height: 1px;
`

type PropsType = {
    data: FormType[]
}

const Index: React.FC<PropsType> = (props) => {
    const today = moment().format("DD-MM-yyyy")
    const contents = props.data
    const hourIndex = Array.from(Array(24).keys())
    const hours = hourIndex.map((el) => moment().hours(el).format("HH"))

    return (
        <>
            <Typography variant="h5" mb={3}>
                Timeline {today}
            </Typography>
            <TimeTable>
                <tbody>
                    {hours.map((el, idx) => {
                        const content = contents.filter((item) => item.start_time === el + ":00")
                        let td = (
                            <td colSpan={30}>
                                <Line />
                            </td>
                        )

                        if (content.length) {
                            td = (
                                <>
                                    {content.map((item, i) => {
                                        const startTime = moment(item.start_time, "HH:mm")
                                        const endTime = moment(item.end_time, "HH:mm")
                                        const duration = endTime.diff(startTime, "hour")
                                        return (
                                            <td rowSpan={duration + 1} style={{ width: "150px" }} key={i}>
                                                <TimeBox>
                                                    <TimeContent>{item.name}</TimeContent>
                                                    <TimeContent>{today}</TimeContent>
                                                    <TimeContent>
                                                        {item.start_time}-{content[0].end_time}
                                                    </TimeContent>
                                                </TimeBox>
                                            </td>
                                        )
                                    })}
                                    <td colSpan={30}>
                                        <Line />
                                    </td>
                                </>
                            )
                        }

                        return (
                            <tr key={idx}>
                                <td style={{ width: "20px" }}>
                                    <Typography fontWeight="bold">{el}</Typography>
                                </td>
                                {td}
                            </tr>
                        )
                    })}
                </tbody>
            </TimeTable>
        </>
    )
}

export default Index
