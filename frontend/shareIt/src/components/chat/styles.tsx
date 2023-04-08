import { styled, makeStyles} from '@material-ui/core/styles';

export const chatStyles = makeStyles((theme) => ({
    app: {
        // height: '70vh',
        // width: '100%',
        // display: 'flex',
        // flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        //
        position: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: '400px !important',
        right: '1em',
        borderRadius: '5px 20px 5px 20px',
        zIndex: 20,
        background: 'white',
        maxHeight: '550px',
        padding: '1rem',
        boxShadow: '0 0 10px 0 rgba(0,0,0,0.5)',
        '@media (max-width: 768px)': {
            width: '350px !important',
            height: '700px',
            right: '1em',
            left: '2em',
            padding: '1.2em'
        }
    },
    main: {
        width: '90%',
        height: '90%',
        // border: '6px solid #dddd',
        boxShadow: '0 0 10px 0 rgba(200,200,0,0.5)',
        borderRadius: '24px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        '@media (max-width:768px)': {
            width: '100% !important',
            height: '90%',
            border: '4px solid #dddd'
        }
    },
    chatTitle:{
        width: '70%',
        margin: '20px 0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '@media (max-width:768px)': {
            width: '80% !important'
        }
    },
    closeChat: {
        position: 'absolute',
        top: '1em',
        right: '2em',
        fontSize: '1em',
        cursor: 'pointer',
        transition: '0.5s',
        width: '30px',
        height: '30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&:hover':{
            color: 'rgba(200, 0, 0, 0.8)',
            // background: '#dddd',
            boxShadow: '0 0 5px #dddd',
            borderRadius: '50%',
            fontSize: '1.1em',
        }
    },
    nameInput: {
        fontSize: '24px',
        fontWeight: 700,
        color: '#7e7e7e',
        flexGrow: 1,
        border: 'none',
        margin: '0px 20px',
        outline: 'none',
        backgroundColor: 'inherit',
    },
    name: {
        display: 'flex',
        fontSize: '32px',
        fontWeight: 700,
        padding: '8px 16px',
        color: '#7e7e7e',
        backgroundColor: '#fee6e6',
        '& span':{
            color: '#bbb'
        }
    },
    chatContainer: {
        display: 'flex',
        flexDirection: 'column',  
        height: '60vh !important',
        position: 'fixed',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100% !important',
        '@media (max-width: 768px)': {
            height: '100vh !important',
        }
    },
    chatWindow: {
        position: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: '80%',
        height: '70vh',
        padding: '1rem',
        boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)',
        '@media (max-width: 768px)': {
            width: '100%',
            height: '70%',
        }
    },
    Vboxider: {
        height: '48px !important',
        width: '2px !important',
        backgroundColor: '#f6f6f6',
        '@media (max-width:768px)': {
            height: '2.2em !important'
        }
    },
    sendButton: {
        height: '48px',
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'center',
        fontSize: '16px',
        flexGrow: 1,
        alignItems: 'center',
        padding: '0px 20px',
        backgroundColor: '#fff',
        cursor: 'pointer',
        '@media (max-width:768px)': {
            height: '2.2em !important',
            flexGrow: 0
        }
    },
}));

export const MessageForm = styled('form')({
    display: 'flex',
    width: '100% !important',
    justifyContent: 'space-between',
    alignItems: 'center',
    '@media (max-width:768px)': {
        width: '100% !important'
    }
})

export const MessageInput = styled('input')({
    flexGrow: 4,
    height: '48px',
    fontSize: '1rem',
    border: 'none',
    outline: 'none',
    padding: '0 0.7em',
    backgroundColor: '#fff',
    '@media (max-width:768px)': {
        height: '2.2em !important',
        flexGrow: 8
    }
})

export const MessageBox = styled('ul')({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f6f6f6',
    width: '100%',
    height: '600px',
    overflowY: 'scroll',
    overflowX: 'hidden',
    '@media (max-width:768px)':{
        width: '100%',
        height: '400px'
    }
})
