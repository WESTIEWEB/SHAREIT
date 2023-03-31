import  {styled, makeStyles} from   '@material-ui/core/styles' ;

export const navStyles = makeStyles((theme) => ({
    containerDiv: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '80px',
        width: '100%',
        position: 'fixed',
    },
    mainDiv: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    }
}));


export const headerStyles = makeStyles((theme) => ({
    header: {
        display: 'flex',
        justifyContent: 'center',
        flrxDirection: 'column',
        width: '100%',
        background: '#FFF',
        opacity: '1',
        color: '#000 !important',
        position: 'fixed',
        left: '0',
        top: '0',
        right: '0',
        minHeight: '5em',
        zIndex:  2000,
        // padding: '0.5rem',
    },
    headerBar: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // width: '60%',
        paddingRight: '1rem',
        // padding: '0.5rem',
    },
    headerContent: {
        zIndex:  2000,
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        margin: '0 0.5em 0 0.5em',
        justifyContent: 'space-between',
    },
    logoContainer: {
        margin: '0.8em',
        gap: '0.8em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // width: '20%',
        '& img': {
            color: '#000',
        },
        '& span':{
            fontFamily: 'sans-serif',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '1.5em',
        }
    },
    togglar : {
        display: 'none',
        // width: '10%',
    },
    a:{
        textDecoration: 'none !important',
        fontStyle: 'normal',
        fontSize: '1em',
        color: '#000 !important',
        fontFamily: 'Manrope',
        '&:hover': {
            textDecoration: 'none !important',
            color: '#00F !important',   
        },
        '&:active': {
            textDecoration: 'none !important',
            color: '#F00 !important',
        },
        '&:focus': {
            textDecoration: 'none !important',
            color: '#F00 !important',
        },
        '&:visited': {
            textDecoration: 'none !important',
            // color: '#F00 !important',
        },
        
        
      },
    closeMenu:{
        width: '40%',
        position: 'absolute',
        zIndex:  2000,
        margin: '2.5em',
        color: '#000',
        top:'0',
        background:'transparent !important',
        
    },
    trabsparentView: {
        color: '#000',
        width: '100vw',
        margin: '0.8em',
        '&:hover': {
            color: '#F00',
        }
    },
    loginBtn: {
        color: '#000',
        boxShadow: '0px 0.32px 0.23px rgba(0, 0, 0, 0.51)',
        '& a': {
            TextDecoration: 'none !important',
        }
    }
    ,
    '@media (max-width: 768px)': {
        headerBar: {
            display: 'none',
        },
        togglar: {
            display: 'block',
        },
        
    }
}))

export const Paragraph = styled('p')({
    fontFamily: "Manrope",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "22px",
    color: "#252D42",
})

export const MenuList = styled('ul')({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& MenuItem': {
        '& a': {
            color: '#000',
        }
    }
})