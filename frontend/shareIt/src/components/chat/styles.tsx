import { styled, makeStyles} from '@material-ui/core/styles';

export const chatStyles = makeStyles((theme) => ({
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
    }
}));