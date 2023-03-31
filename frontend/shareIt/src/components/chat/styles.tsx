import { styled, makeStyles} from '@material-ui/core/styles';

export const chatStyles = makeStyles((theme) => ({
    chatContainer: {
        display: 'flex',
        flexDirection: 'column',  
        height: '50vh',
        position: 'fixed',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw !important',
    },
    chatWindow: {
        position: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: '50%',
        height: '60vh',
        padding: '1rem',
        boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)',
    }
}));