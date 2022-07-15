import * as React from "react"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import CloseIcon from "@mui/icons-material/Close"
import styled from "@emotion/styled"

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "90%",
    height: "90%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    overflowY: "auto",
}

const CloseButton = styled.div`
    margin-top: -1rem;
    // text-align: end;
    cursor: pointer;
`

type PropsType = {
    handleClose: () => void
    open: boolean
    children?: JSX.Element
}

const BasicModal: React.FC<PropsType> = (props) => {
    const { open, handleClose, children } = props

    return (
        <>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Box display="flex" justifyContent="end">
                        <CloseButton onClick={handleClose}>
                            <CloseIcon />
                        </CloseButton>
                    </Box>
                    <Box>{children}</Box>
                </Box>
            </Modal>
        </>
    )
}

export default BasicModal
