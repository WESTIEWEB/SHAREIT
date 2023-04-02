import { styled , makeStyles } from '@material-ui/styles';

export const homeStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        
    },
    contents: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        padding: '1.5em',
        height: '100%',
        position: 'relative',
    },
    title: {
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: '30em',
        textAlign: 'left',
        placeItems: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: '3em',
        left: '0',
    },
    titleText:{
        fontSize: '3em',
        fontWeight: 700,
        width: '100%',
    },
    titleText1:{
        fontSize: '1em',
        fontWeight: 400,
        textAlign: 'left',
        width: '100%',
    },
    buttonDiv: {
        width: '100%',
        display: 'flex',
        justifyContent: 'left',
    },
    button:{
        width: '15em',
    },
    subtitle: {
        display: 'flex',
        padding: '1em 1em 1em 2.5em',
        gap: '1em',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        width: '60%',
    },
    phoneImage: {
        position: 'relative',
        width: '40%',
    },
    icons:{
        fontSize: '2em',
        position: 'absolute',
        right: '3em',
        bottom: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)',
        borderRadius: '50%',
        height: '2em',
        width: '2em',
        '&hover': {
            animation: 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
            transform: 'translate3d(0, 0, 0)',
            perspective: '1000px'
        }
    }
    ,
    '@media (max-width: 600px)': {
        phoneImage: {
            display: 'none',
        },
        subtitle: {
            width: '80%',
        },
        title:{
            height: 'auto',
            width: '90%'
        },
        contents:{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        icons:{
            right: '1em',
        }
    }
}));

export const BGImage = styled('img')({
    position: 'absolute',
    top: '3em',
    left: '0',
    width: '100%',
    borderRadius: '10px',
    height: '30em',
    objectFit: 'cover',
    zIndex: -1,
    '@media (max-width: 768px)': {
        height: '30em',
        width: '90%',
        left: 'auto',
    },
    '@media (max-width:468px)':{
        height: '40em'
    }

});
export const PhoneImg = styled('img')({
    // position: 'absolute',
    height: '20em'
    // top: '3em',

});

export const ChatIcon = styled('div')({
    width: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

})