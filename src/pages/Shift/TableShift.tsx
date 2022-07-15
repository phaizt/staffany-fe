import { useState, useRef } from "react"
import MaterialTable from "material-table"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import Modal from "components/Modal"
import ShiftForm from "./FormShift"
import { FormType } from "./dtos/form-shift.dto"

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

    const handleClose = () => setOpenModal(false)

    return (
        <>
            <ThemeProvider theme={theme}>
                <MaterialTable
                    title="Shift Data"
                    columns={[
                        { title: "Name", field: "first_name" },
                        { title: "Date", field: "last_name" },
                        { title: "Start Time", field: "last_name" },
                        { title: "End Time", field: "last_name" },
                    ]}
                    actions={[
                        {
                            icon: "edit",
                            // position: "row",
                            tooltip: "Edit",
                            onClick: (event, rowData) => handleOpen(),
                        },
                    ]}
                    data={(query) =>
                        new Promise((resolve, reject) => {
                            let url = "https://reqres.in/api/users?"
                            url += "per_page=" + query.pageSize
                            url += "&page=" + (query.page + 1)
                            fetch(url)
                                .then((response) => response.json())
                                .then((result) => {
                                    resolve({
                                        data: result.data,
                                        page: result.page - 1,
                                        totalCount: result.total,
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
