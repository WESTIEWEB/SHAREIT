import { styled, makeStyles} from '@material-ui/core/styles';
import AdminChat from './index';

export const adminChatStyles = makeStyles((theme) => ({
    parent1: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        // alignItems: 'center',
        width: '100vw',
        height: '100vh'
    },
    parent:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        pading: '1em',
        width: '100%',
        height: '100vh'
    },
    online: {
        // height: '4rem',
        width: '100%',
        display: 'flex',
        // margin: '0.5em',
        background: '#f0e8e8',
        position: 'relative',
        alignItems: 'center',
        borderRadius: '12px',
        padding: '0.2em',
        cursor: 'pointer',
        '@media (max-width: 768px)': {
            width: '70%'
        }
        
    },
    online1: {
        // height: '4rem',
        width: '90%',
        display: 'flex',
        margin: '0.5em',
        background: '#bec1c4',
        position: 'relative',
        alignItems: 'center',
        borderRadius: '3px',
        padding: '0.2em',
        cursor: 'pointer',
        '@media (max-width: 768px)': {
            width: '70%',
            display: 'none',
            '&:hover:span': {
                display: 'inline-block'
            }
        }
        
    },
    HiddenSpan: {
        display: 'none',
        position: 'absolute',
        bottom: '0',
        fontSize: '0.9em'
    },
    search: {
        // MozUserFocus:'inherit'
        background: 'inherit',
        boxShadow: '0 0 1px rgba(0, 0, 0, 0, 0.6)',
        width: '100%',
        border: 'none',
        outline: 'none',
        MozUserFocus: 'none',
        height: '2em',
        '@media (max-width: 768px)': {
            display: 'none'
        }
    },
    hideIt: {
        width:'4px', 
        background:'', 
        margin:'2px', 
        height: '100vh',
        '@media (max-width: 768px)': {
            display: 'none'
        }
    },
    chatBox: {
        width: '79%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        '@media (max-width:768px)':{
            width: '80%'
        }
    },
    title: {
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
        padding: '0.5em',
        gap: '1em',
        fontSize: '1.2em',
        width: '100%',
        borderRadius: '8px',
        background: '#f0e8e8',
        // height: '2vh',
        '& Img': {
            width: '40px !important',
            height: '40px !important',
        }
    },
    chatsLeft: {
        height: 'auto',
        maxWidth: '80%',
        width: '150px',
        display: 'flex',
        flexDirection: 'column',
        background: '#f0e8e8',
        padding: '0.5em',
        borderRadius: '8px',
        marginLeft: '0'
    },
    chatsRight: {
        height: 'auto',
        maxWidth: '80%',
        display: 'flex',
        flexDirection: 'column',
        background: '#f0e8e8',
        padding: '0.5em',
        marginLeft: '76%',
        textAlign: 'center',
        borderRadius: '8px',
        '@media (max-width:768px)':{
            marginLeft: '40%'
        }
    },
    chatProfile: {
        width: '25px !important',
        height: '25px !important'
    }

}))

export const ChatContainer = styled('div')({
    display: 'flex',
    width: '100%',
    height: '100vh',
    // justifyContent: 'center'
    overflow: 'hidden',
    marginTop: '0.5em',
    '@media (max-width:768px)':{
        // flexDirection: 'column'
    }
})

export const Online = styled('div')({
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    height: '95vh',
    gap: '1em',
    width: '30%',
    color: 'rgb(31, 30, 30))',
    background: 'rgb(255, 255, 255)',
    overflowY: 'scroll',
    overfloyX: 'hidden !important',
    padding: '0.8em',
    '@media (max-width:768px)':{
        // flexDirection: 'row',
        // height: '20em',
        // width: '100%',
        // overflowX: 'scroll'
        width: '20%',
        height: '88vh',
    }
})

export const Chat = styled('ul')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // alignItems: 'center',
    padding: '1.5em',
    gap: '1.5em',
    height: '75vh',
    width: '100%',
    // marginLeft: '1em',
    // background: 'rgb(255, 255, 255)',
    backgroundColor: '#f6f6f6',
    color: 'rgb(71, 63, 63)',
    overflowY: 'scroll',
    overflowX: 'hidden',
    // position: 'relative',
    '@media (max-width:768px)': {
        height: '75vh'
    }

})

export const Img = styled('img')({
    width: '40px',
    height: '40px',
    borderRadius: '50%'
})

export const Head = styled('div')({
    display: 'flex',
    width: 'auto',
    height: 'auto',
    padding: '0.3em',
    flexDirection: 'column',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
    position: 'relative',
    '@media (max-width:768px)':{
        display: 'none'
    }
})

export const TypoGraphy = styled('p')({
    fontSize: '14px',
    width: '100%',
    textAlign: 'left',
    color: 'rgb(109, 17, 12)'
})
export const ChatHead = styled('div')({
    // display: 'flex',
    width: '100%',
    height: 'auto',
    padding: '0.3em',
    // flexDirection: 'column',
    // justifyContent: 'center',
    // flexWrap: 'wrap',
    alignItems: 'center',
    position: 'relative',
})

export const OnlineSpan = styled('span')({
    position: 'absolute',
    background: '#f33b1f',
    color: '#FFF',
    top: '4px',
    right: '4px',
    display: 'flex',
    justifyContent:'center',
    alignItems: 'center',
    padding: '0.04em',
    width: '20px',
    fontSize: '0.8em',
    fontStyle: 'italic',
    height: '20px',
    borderRadius: '50%',
    '@media (max-width:768px)':{
        right: '0',
        top: 0,
        left: '5px'
    }
})

export const ChatInputBox = styled('form')({
    // position: 'fixed',
    // bottom: '0',
    padding: '0.em',
    display: 'flex',
    width: '98% !important',
    // flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0.5em 0.5em 0.5em 0.5em',
    background: 'rgba(254, 254, 255, 0.9)',
    height: '8vh',
    borderRadius: '20px',
    '@media (max-width)':{
        width:'100%',
        height: '5vh !important'
    }
})

export const ChatInput = styled('input')({
    outline: 'none',
    border: 'none',
    width: '90%',
    background: 'initial',
    padding: '0.5em',
    height: '90%',
    fontSize: '1em'
})