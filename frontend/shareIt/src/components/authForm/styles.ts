import { styled, makeStyles } from '@material-ui/core/styles';
import { Label } from '@material-ui/icons';

export const useStyles = makeStyles((theme) => ({
    mainContatiner: {
        marginTop: '-3rem',
        padding: '0',
        display: 'flex',
        flexDirection: 'column',
        placeItems: 'center',
        width: '50%',
        // height: '100%',
        // backgroundColor: '#f5f5f5',
        top: '20%',
        bottom: '10%',
        left: '35%',
        // right: '5%',
        position: 'fixed',
        // padding: '2rem',
        height: '70vh',
        justifyContent: 'center',
        backgroundColor: 'rgba(229, 234, 227, 0.171)',
        transition: 'all 0.5s ease',
    },
    Content: {
        display: 'flex',
        flexDirection: 'column',
        placeItems: 'center',
        width: '70%',
        opacity: '1',
        backgroundColor: '#fff',
        justifyContent: 'center',
        transition: 'all 0.5s ease',
        padding: '2rem',
        margin: '2rem 0 2em 0 !important',
        minHeight: '300px',
        borderRadius: '5px',
        // border: '1px solid #ccc',
        boxShadow: '0 0 3px rgba(0,0,0,0.4)',
    },
    welcome:{
        textAlign: 'left',
        width: '70%',
        marginTop: '-5rem',
        marginBottom: '1rem',
        fontSize: '1.1em !important',
        fontWeight: 'bold',
        transition: 'all 0.9s ease',
    },
    username: {
        textAlign: 'left',
        width: '70%',
        fontSize: '0.8rem !important',
    },
    '@media (max-width: 768px)': {
        username: {
            fontSize: '1rem',
            textAlign: 'left',
            width: '100%',
            // paddingLeft: '1rem',
        },
        welcome: {
            width: '100%',
            fontSize: '1.1rem',
            webkitFontSize: '1.1rem',
        },
        Content: {
            width: '80%',
        }
    }
}));

export const AForm = styled('form')({
    display: 'flex',
    flexDirection: 'column',
    placeItems: 'center',
    width: '70%',
    '@media (max-width: 768px)': {
        width: '100%',
    }
});

export const FormField = styled('div')({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    margin: '0.8rem 0',
});

export const Input = styled('input')({
    width: '100%',
    height: '2.5rem',
    borderRadius: '5px',
    boxShadow: '0 0 3px #ccc',
    border: '1px solid #ccc',
    backgroundColor: 'inherit !important',
    padding: '0.5rem',
    opacity: '0.8',
});

export const FormLabel = styled('label')({
    fontSize: '0.8rem',
    fontWeight: 'bold',
    color: '#333',
    margin: '0 0 0.5rem 0',
    textAlign: 'left',
    '@media (max-width: 768px)': {
        fontSize: '1rem',
    }
});
