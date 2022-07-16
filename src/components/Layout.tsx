import * as React from "react"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"
import MuiAppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Tooltip from "@mui/material/Tooltip"
import Menu from "@mui/material/Menu"
import Avatar from "@mui/material/Avatar"
import MenuItem from "@mui/material/MenuItem"
import IconButton from "@mui/material/IconButton"
import { Link } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"

const mdTheme = createTheme()

const settings = ["Logout"]

type propsType = {
    children: React.ReactNode
}

const Index:React.FC<propsType> = ({ children }) => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    return (
        <>
            <ThemeProvider theme={mdTheme}>
                <Box sx={{ display: "flex" }}>
                    <CssBaseline />
                    <MuiAppBar position="absolute" sx={{ backgroundColor: "#24292e" }}>
                        <Toolbar
                            sx={{
                                pr: "24px", // keep right padding when drawer closed
                            }}
                        >
                            <Box display="flex" sx={{ gap: "0.5rem", alignItems: "center", flexGrow: 1 }}>
                                <Typography component="h1" variant="h6" color="inherit" noWrap>
                                    <Link component={RouterLink} to={`${process.env.PUBLIC_URL}`} color="#fff" underline="none">
                                        Staff Any Shift
                                    </Link>
                                </Typography>
                            </Box>
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="Faiz" src="/static/images/avatar/2.jpg" />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: "45px" }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {settings.map((setting) => (
                                        <MenuItem key={setting}>
                                            <Typography textAlign="center">{setting}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                        </Toolbar>
                    </MuiAppBar>
                    <Box
                        sx={{
                            pt: 12,
                            backgroundColor: (theme) => (theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900]),
                            flexGrow: 1,
                            height: "100vh",
                            overflow: "auto",
                        }}
                    >
                        {children}
                    </Box>
                </Box>
            </ThemeProvider>
        </>
    )
}

export default Index
