import { useState, useRef, useEffect } from "react"
import MaterialTable from "material-table"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import Modal from "components/Modal"
import ShiftForm from "./FormShift"
import { FormType } from "./dtos/form-shift.dto"
import ShiftRequest from "request/shift.request"
import moment from "moment"

const theme = createTheme({
    palette: {
        primary: {
            main: "#007B55",
        },
        secondary: {
            main: "#00ab55",
        },
    },
    components: {
        MuiTablePagination: {
            styleOverrides: {
                toolbar: {
                    flexWrap: "wrap",
                },
            },
        },
    },
})

const Index = () => {
    const tableRef = useRef()
    const [openModal, setOpenModal] = useState(false)

    const handleOpen = () => {
        setOpenModal(true)
    }

    useEffect(() => {}, [])

    const handleClose = () => setOpenModal(false)

    const handlePublish = (id: any) => {
        console.log(id)
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <MaterialTable
                    title="Shift Data"
                    columns={[
                        { title: "Id", field: "id" },
                        { title: "Name", field: "name" },
                        {
                            title: "Date",
                            field: "date",
                            render: (rowData) => {
                                console.log(rowData)
                                return moment(rowData.date).format("DD-MM-YYYY")
                            },
                        },
                        { title: "Start Time", field: "start_time" },
                        { title: "End Time", field: "end_time" },
                        { title: "End Time", field: "is_published", hidden: true },
                    ]}
                    actions={[
                        (rowData) => ({
                            icon: "edit",
                            // position: "row",
                            tooltip: "Edit",
                            hidden: rowData.is_published,
                            onClick: (event, rowData) => handleOpen(),
                        }),
                        (rowData) => ({
                            icon: "publish",
                            // position: "row",
                            tooltip: "publish",
                            hidden: rowData.is_published,
                            onClick: (event, row) => handlePublish(rowData.id),
                        }),
                        (rowData) => ({
                            icon: () => <>Published</>,
                            disabled: true,
                            hidden: !rowData.is_published,
                            onClick: (event, rowData) => null,
                        }),
                    ]}
                    data={(query) =>
                        new Promise((resolve, reject) => {
                            // let url = "https://reqres.in/api/users?"
                            // url += "per_page=" + query.pageSize
                            // url += "&page=" + (query.page + 1)
                            ShiftRequest().then((res) => {
                                resolve({
                                    data: res.data.data,
                                    page: res.data.page - 1,
                                    totalCount: res.data.count,
                                })
                            })
                        })
                    }
                    localization={{
                        pagination: {
                            labelRowsPerPage: "",
                        },
                    }}
                    options={{
                        actionsCellStyle: {
                            // display: "flex",
                            // justifyContent: "center",
                            // padding: "24px",
                            width: "100px",
                            // marginBottom: "-1px",
                        },
                        actionsColumnIndex: -1,
                        // selection: true,
                    }}
                />
            </ThemeProvider>
            <Modal open={openModal} handleClose={handleClose}>
                <ShiftForm isEdit={true} onSubmit={(val: FormType) => alert(JSON.stringify(val, null, 2))} />
            </Modal>
        </>
    )
}

export default Index
