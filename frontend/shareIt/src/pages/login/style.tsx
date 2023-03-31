import { styled, makeStyles } from '@material-ui/core/styles';
import { BGImage } from '../../components/home/style';

export const loginStyles = makeStyles((theme) => ({
    box1: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',  
        height: '100vh',
        width: '100%',
        backgroundColor: '',
        padding: '0',
    },
    box2: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '60%',
        position: 'absolute',
        right: '0',
        padding: '20px',
    },
    loginTitle: {
        textAlign: 'left',
        width: '100%',
        padding: '10px',
        fontSize: '1.5em',
        marginBottom: '20px',
    },
    buttn:{
        width: '100% !important',
    },
    inputLabel:{
        textAlign: 'left',
        width: '100%',
        fontSize: '1em',
    },
        '@media (max-width: 768px)': {
            box2: {
                width: '100%',
                padding: '0 30px',
                marginTop: '-150px'
            }
        }
}));

export const LoginForm = styled('form')({
    marginTop: '50px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    padding: '4em !important',
    borderRadius: '10px',
    transition: 'all 0.3s ease-in-out',
    transform: 'scale(1)',
    background: 'rgba(255,255,255,0.8)',
    minHeight: '20rem',
})

export const LoginFiled = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '10px',
    alignItems: 'center',
    width: '100%',
    padding: '10px',

})

export const InputField = styled('input')({
    width: '100%',
    padding: '10px',
    background: 'inherit',
    height: '40px',
    boxShadow: '0 0 0 1px #ccc',
    borderRadius: '5px',
    border: 'none',
});

export const BGimage = styled('img')({
    height: '40%',
    transition: 'all 3s ease-in-out',
    position: 'absolute',
    left: '5%',
    '@media (max-width: 768px)': {
        display: 'none',
    }
})