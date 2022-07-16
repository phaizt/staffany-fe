import { useState, useRef, useEffect } from "react"
import MaterialTable from "material-table"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import Modal from "components/Modal"
import { toast } from "react-toastify"
import moment from "moment"
import ShiftForm from "./FormShift"
import { FormType } from "./dtos/form-shift.dto"
import * as ShiftRequest from "request/shift.request"
import swal from "sweetalert"

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

type propsType = {
    refresh: boolean
    date: Date | null | unknown
}

const Index: React.FC<propsType> = (props) => {
    const { date, refresh } = props
    const tableRef = useRef()
    const [openModal, setOpenModal] = useState(false)
    const [editData, setEditData] = useState<FormType>()
    const [firstLoad, setFirstLoad] = useState(true)
    const [id, setId] = useState(0)

    const refreshTable = () => {
        tableRef.current && (tableRef.current as any).onQueryChange()
    }

    useEffect(() => {
        if (firstLoad) {
            setFirstLoad(false)
        } else {
            refreshTable()
        }
    }, [refresh, date])

    const handleEdit = (rowData: FormType) => {
        setId(rowData.id || 0)
        setEditData(rowData)
        setOpenModal(true)
    }

    const handleClose = () => setOpenModal(false)

    const handleSubmit = (value: FormType, reset: () => void) => {
        if (id !== 0) {
            ShiftRequest.update(id, value)
                .then((res) => {
                    refreshTable()
                    toast.success(res.data.message)
                    // reset()
                })
                .catch((err) => {
                    toast.error(err.response.data.message)
                })
        }
    }

    const handlePublish = (id: number) => {
        swal({
            title: "Are you sure?",
            text: "Once published, you will not be able to revert it!",
            icon: "warning",
            buttons: ["Cancel", "Publish"],
            dangerMode: true,
        }).then((response) => {
            if (response) {
                ShiftRequest.publishShift(id)
                    .then((res) => {
                        refreshTable()
                        toast.success(res.data.message)
                    })
                    .catch((err) => {
                        toast.error(err.response.data.message)
                    })
            }
        })
    }

    const handleDelete = (id: number) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover it!",
            icon: "warning",
            buttons: ["Cancel", "Delete"],
            dangerMode: true,
        }).then((response) => {
            if (response) {
                ShiftRequest.deleteShift(id)
                    .then((res) => {
                        refreshTable()
                        toast.success(res.data.message)
                    })
                    .catch((err) => {
                        toast.error(err.response.data.message)
                    })
            }
        })
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <MaterialTable
                    tableRef={tableRef}
                    title="Shift Data"
                    columns={[
                        { title: "Id", field: "id" },
                        { title: "Name", field: "name" },
                        {
                            title: "Date",
                            field: "date",
                            render: (rowData) => moment(rowData.date).format("DD-MM-YYYY"),
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
                            onClick: (event, rowData) => handleEdit(rowData as FormType),
                        }),
                        (rowData) => ({
                            icon: "delete",
                            // position: "row",
                            tooltip: "Delete",
                            hidden: rowData.is_published,
                            onClick: (event, row) => handleDelete(rowData.id),
                        }),
                        (rowData) => ({
                            icon: "publish",
                            // position: "row",
                            tooltip: "Publish",
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
                            ShiftRequest.getList(date as Date, (query.page + 1).toString(), query.pageSize.toString()).then((res) => {
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
                        search: false,
                        actionsColumnIndex: -1,
                        // selection: true,
                    }}
                />
            </ThemeProvider>
            <Modal open={openModal} handleClose={handleClose}>
                <ShiftForm isEdit={true} data={editData} onSubmit={handleSubmit} />
            </Modal>
        </>
    )
}

export default Index
