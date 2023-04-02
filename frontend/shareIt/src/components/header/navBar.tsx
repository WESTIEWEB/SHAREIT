import React, { useState } from 'react';
import Link from '@material-ui/core/Link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import {RxDropdownMenu as Hamburger} from 'react-icons/rx';
import Box from '@material-ui/core/Box/Box';
import { MenuList, Paragraph, headerStyles } from './styles';
import { Typography } from '@material-ui/core';
import logo from '../../assets/logo2.svg';
import {IoMdArrowDropdownCircle, IoMdArrowDropupCircle} from 'react-icons/io';
import { useAppContext } from '../../context'; 
import { IContextInterface } from '../../interface';



const HeaderNav = () => {
  const [anchorEl, setAnchorEl] = useState(false);
  const open = Boolean(anchorEl);

  //calling Logout from context
  const {Logout} = useAppContext() as IContextInterface;
  const handleMenu = (event:any) => {
    setAnchorEl(!anchorEl);
  };

  const handleClose = () => {
    setAnchorEl(!anchorEl);
  };

  const access = localStorage.getItem('token');
  const logout = () => {
    Logout();
  }
  const headerClasses = headerStyles();
  return (
    <Box className={headerClasses.header}>
        <Box className={headerClasses.headerContent}>
            <Typography className={headerClasses.logoContainer} variant='h6'>
                <Link style={{textDecoration: 'none'}} href='/'>
                    <img style={{width: '40px', height: '30px'}} src={logo} alt='logo'/>
                    <span>Loom</span>
                </Link>
            </Typography>
            <Box className={headerClasses.headerBar}>
                <MenuList style={{display:'flex', justifyContent:'flex-start'}}>
                    <MenuItem>
                        <Link className={headerClasses.a} href='/coins'>
                            Coins
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link className={headerClasses.a} href='/exchange'>
                            Exchange
                        </Link>
                    </MenuItem>
                </MenuList>
                <MenuList style={{display:'flex', justifyContent:'flex-end'}}>
                    {
                    !access?( 
                    <MenuItem className={headerClasses.loginBtn}>
                        <Link className={headerClasses.a} href='/access'>
                            Login
                        </Link>
                    </MenuItem>
                    ):( 
                     <MenuItem onClick={logout} className={headerClasses.loginBtn}>
                        <Link className={headerClasses.a} href='/access'>
                            Logout
                        </Link>
                    </MenuItem>
                    )
                    }
                </MenuList>
            </Box>
            <Box className={headerClasses.togglar}>
                <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
                >
                {anchorEl && <IoMdArrowDropdownCircle 
                onClick={handleClose} style={{ fontSize: "40px" }} />}
                {!anchorEl && <IoMdArrowDropupCircle 
                onClick={handleClose} style={{ fontSize: "40px" }} />}
                </IconButton>
                <Menu
                className={`${headerClasses.closeMenu}`}
                // anchorEl={anchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={open}
                >
                    <MenuItem onClick={handleClose} className={`${headerClasses.trabsparentView}`}>
                        <Link className={`${headerClasses.trabsparentView}`} href="#">Rates</Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <Link href="/coins" className={`${headerClasses.trabsparentView}`}>Coins</Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <Link href="/exchange" className={`${headerClasses.trabsparentView}`}>Exchange</Link>
                    </MenuItem>
                    {!access &&<MenuItem onClick={handleClose}>
                        
                        <Link href="/access" 
                            className={`${headerClasses.trabsparentView}`}>
                            Login
                        </Link>
                    </MenuItem>
                    }   
                    {access &&
                    <MenuItem onClick={logout}>
                        <Link className={`${headerClasses.trabsparentView}`}>Signup</Link>
                    </MenuItem>
                    }
                </Menu>
            </Box>
        </Box>
    </Box>
  );
};
export default HeaderNav;