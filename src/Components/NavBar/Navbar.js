import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { FaLaptopCode } from 'react-icons/fa';
import styled from "styled-components";
import RotateLeftRoundedIcon from "@mui/icons-material/RotateLeftRounded";
import themeColor from "../../Data/themeColor.json";
import { useSelector } from "react-redux";
import { Grid } from '@mui/material';
import {auth} from '../../Firebase/FirebaseAuth';

const pages = ['Project', 'ContactMe'];

function Nav() {
  const items = useSelector((state) => state.cart);
  const currTheme = useSelector((state) => state.theme);
  const loading = useSelector((state) => state.loading);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <FaLaptopCode sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} size={32} />
          <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Box sx={{
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'monospace',
          fontWeight: 700,
          color: 'inherit',
          textDecoration: 'none',
        }}>
          <Wrapper>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >Algo180</Typography>

            <Title color={themeColor[currTheme][0].text} paddingLeft="2.25rem">
              Total Solved : {items.length }
              / 191
            </Title>
          </Wrapper>
        </Box>
      </Box>
          <Box sx={{ flexGrow: 0.4, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large" aria-label="account of current user" aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar" anchorEl={anchorElNav}
              anchorOrigin={{vertical: 'bottom', horizontal: 'left',}}
              keepMounted
              transformOrigin={{ vertical: 'top',horizontal: 'left',}}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
            
          </Box>

         
          <Box
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,display: { xs: 'flex', md: 'none' }, flexGrow: 0.5,fontFamily: 'monospace',
              fontWeight: 700,color: 'inherit',textDecoration: 'none',}}
          >
            <Wrapper>
          <Title
            color="white"
            paddingLeft="3rem"
          >
            ALGO180
          </Title>
        </Wrapper>
            <Grid item lg={3} md={12} sm={12} xs={12}>
              
        <Wrapper>
          <Title color={themeColor[currTheme][0].text} paddingLeft="2.25rem">
            Total Solved : {loading ? <RotateLeftRoundedIcon /> : items.length}{" "}
            / 191
          </Title>
        </Wrapper>
      </Grid>
          </Box>
          
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' },marginRight:'7rem',justifyContent:'flex-end',
alignItems: 'center' }}>
            
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}  
          </Box>
          
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
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
              
                <MenuItem  onClick={handleCloseUserMenu}>
                <button onClick={() => auth.signOut()}>Sign out</button>
                </MenuItem>
              
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
const Title = styled.h1`
  font-size: ${(props) => (props.pickOne === "pickOne" ? "1rem" : "1rem")};
  text-align: center;
  justify-content: center;
  align-items: center;
  margin-left: ${(props) => props.marginLeft || "0rem"};
  color: ${(props) => props.color || "white"};
  padding-left: ${(props) => props.paddingLeft || "0rem"};
  fontFamily: 'monospace',
  /* padding-right: ${(props) => props.padding || "0rem"}; */
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: ${(props) => props.justifyContent || "flex-start"};
  align-items: center;
  padding: 1rem;
  border-bottom: 0.1px solid #4e8ccd;
  font: 1rem;
`;

const btn = styled.button`
  background-color: #ff0004;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  padding: 12px 16px;
  cursor: pointer;

  &:hover {
    background-color: #0069d9;
  }
`;
export default Nav;