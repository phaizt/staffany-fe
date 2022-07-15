import { useState, useRef, useEffect } from "react"
import MaterialTable, { MTableToolbar } from "material-table"
import { TablePagination } from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material/styles"

const theme = createTheme({
    palette: {
        primary: {
            main: "#007B55",
        },
        secondary: {
            main: "#00ab55",
        },
    },
})

const Index = () => {
    const tableRef = useRef()
    const [openModal, setOpenModal] = useState(false)
    const [row, setRow] = useState()
    const [firstLoad, setFirstLoad] = useState(1)

    const handleClose = () => setOpenModal(false)

    return (
        <>
            <ThemeProvider theme={theme}>
                <MaterialTable
                    title="Remote Data Preview"
                    columns={[
                        {
                            title: "Avatar",
                            field: "avatar",
                            render: (rowData) => <img style={{ height: 36, borderRadius: "50%" }} src={rowData.avatar} />,
                        },
                        { title: "Id", field: "id" },
                        { title: "First Name", field: "first_name" },
                        { title: "Last Name", field: "last_name" },
                    ]}
                    actions={[
                        {
                            icon: "visibility",
                            // position: "row",
                            tooltip: "Details",
                            onClick: (event, rowData) => alert(JSON.stringify(rowData)),
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
                                    console.log(result)
                                    resolve({
                                        data: result.data,
                                        page: result.page - 1,
                                        totalCount: result.total,
                                    })
                                })
                        })
                    }
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
        </>
    )
}

export default Index
