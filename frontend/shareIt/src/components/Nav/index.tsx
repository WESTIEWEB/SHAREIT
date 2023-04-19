import React from 'react'
import logo from '@/assets/logo2.svg';
import { ListItem, ListMenu, Logo, Nav, NavContainer, navStyles } from './styles';
import { useAppContext } from '@/context';
import { Button } from '@material-ui/core';

interface IProps {
    logOutConfig: () => void;
}
const NavBar = () => {
    const classes = navStyles()
    const { logOutConfig } = useAppContext() as IProps
  return (
    <Nav>
        <NavContainer>
            <Logo>
                <img src={logo} alt='logo' />
            </Logo>
            <ListMenu>
                <ListItem>
                    message
                </ListItem>
                <ListItem>
                    notification
                </ListItem>
                <ListItem>
                    profile
                </ListItem>
                <ListItem onClick={() => logOutConfig()}>
                    <span className={classes.logOut}>
                        logout
                    </span>
                </ListItem>
            </ListMenu>
            <span className={classes.hamburger}>
                showNav
            </span>
        </NavContainer>
    </Nav>
  )
}

export default NavBar
