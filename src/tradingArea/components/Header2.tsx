import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Outlet } from 'react-router-dom';
import { Avatar, Tooltip } from '@mui/material';
import { FaPlus } from "react-icons/fa6";








export const Header2 = () => {
    const navigate = useNavigate();

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const token = localStorage.getItem("token2")

    const pages: string[] = token?["מודעה חדשה"]:[]
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleClickAddCar = () => {
        navigate("/tradingArea/AddCar/")
        setAnchorElNav(null);
    };

    const handleLogOut = () => {
        localStorage.setItem("token2", "")
        setAnchorElUser(null);
        navigate("/tradingArea/")
        window.location.reload()
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <div>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            onClick={() => navigate("/tradingArea/")}
                            variant="h6"
                            noWrap
                            component="a"
                            sx={{
                                cursor: "pointer",
                                margin: "15px",
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            {"אזור סחר"}
                        </Typography>

                        {pages[0] != null && <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={handleClickAddCar}>
                                        <Typography textAlign="center">{page}</Typography>
                                        <FaPlus />
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>}
                        <Typography
                            onClick={() => navigate("/tradingArea/")}
                            variant="h5"
                            noWrap
                            component="a"
                            sx={{
                                cursor: "pointer",
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            <div style={{ width: "70%", fontSize: "22px" }} id='titleHader'>
                                {"אזור סחר"}
                            </div>
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, marginLeft: "50px", flexDirection: "row-reverse" }}>
                            {pages.map((page) => (
                                <div className='buttonHader'>
                                    <Button
                                        key={page}
                                        onClick={handleClickAddCar}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        {page}
                                    </Button>
                                    <FaPlus />
                                </div>


                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            {token && <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>}
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={handleLogOut}>
                                    <Typography textAlign="center">{"התנתק מהמערכת"}</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Outlet />
        </div>
    );
}
