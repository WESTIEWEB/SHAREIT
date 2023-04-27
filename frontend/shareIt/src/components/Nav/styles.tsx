import { styled, makeStyles} from '@material-ui/core/styles';

export const navStyles = makeStyles((theme) => ({
    logOut: {
        
    },
    hamburger: {
        display: 'none',
        '@media (max-width:768px)':{
            display: 'inline-block'
        }
    },

}))

export const Nav = styled('nav')({
    width: '100%',
    height: '10vh',
    background: '#fff',
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    zindex: 100
})

export const NavContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    padding: '0.5em'
})
export const Logo = styled('span')({

})

export const ListMenu = styled('ul')({
    display: 'flex',
    justifyContent: 'space-evenly',
    gap: '1.5em',
    marginRight: '1.5em',
    alignItems: 'center',
    '@media (max-width:768px)':{
        display: 'none',
        flexDirection: 'column',
        width: '50%',
        position: 'absolute',
        right: '0',
        margin: '0 !important',
        top: '10vh',
        alignItems: 'flex-start',
        justifyContent: 'left',
        background: 'yellow',
        paddingLeft: '0.5em',
        zIndex: 2000000,
        height: '80vh'
    }
})

export const ListItem = styled('li')({
    listStyleType: 'none',
    fontSize: '16px',
    padding: '0.2em',
    cursor: 'pointer',
    fontFamile: 'Open Sans',
    '&:hover':{
        boxShadow: '0 0 2px 1px rgba(255, 0 ,0 , 0.5)'
    },
    '&:active':{
        color: '#e61a1a'
    }
})
