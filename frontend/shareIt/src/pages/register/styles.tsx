import { styled, makeStyles } from "@material-ui/core/styles";
import { BGImage } from '../../components/home/style';
export const regStyles = makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
  },
  content1: {
    display: "flex",
    // flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    padding: "1.5em",
    height: "100% !important",
    '@media (max-width:768px)':{
        flexDirection: 'column',
        width: '100%'
    }
  },
  inputField: {
    width: "100%",
    height: "100% !important",
    // padding: '1em',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // gap: '1em'
  },
  buttn: {
    width: "100%",
    height: "3em",
    '@media (max-width: 768px)': {
        height: '2em',
    }
  },
  title: {
    textAlign: "left",
    width: "80%",
  },
  cancelB: {
    color: "blue",
    position: "absolute",
    top: "10px",
    right: "1em",
    "&:hover": {
      color: "red",
    },
    "@media (max-width: 768px)": {
      top:'20px'
    },
  },
}));

export const RegForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  width: "50%",
  backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.9))',
//   backgroundColor: "white",
  borderRadius: "5px",
  padding: "1em",
  position: "relative",
  "@media (max-width: 768px)": {
    width: "100%",
    padding: "1.em",
    height: "100%",
  },
});

export const FormInput = styled("input")({
  // width: '70%',
  height: "3em",
  border: "none",
  borderRadius: "5px",
  outline: "none",
  boxShadow: "0 0 0 1px #ccc",
  padding: "0 1em",
  fontSize: "1em",
  "&:focus": {
    // border: '1px solid #3f51b5',
  },
  "@media (max-width: 768px)": {
    height: "2em",
    fontSize: "0.8em",
    borderRadius: "2px",
  },
});

export const RegLabel = styled("label")({
  // width: '25%',
//   height: "3em",
  textAlign: "left",
  margin: "1em 0 0 0",
  fontSize: "1em",
  padding: "0 0 0.5em 0",
  "@media (max-width: 768px)": {
    // height: "1.5em",
    fontSize: "0.8em",
  },
});
export const InputContainer = styled("div")({
  width: "80%",
  display: "flex",
  flexDirection: "column",
  height: "6em",
  justifyContent: "center",
  "@media (max-width: 768px)": {
    height: "4em",
  },
  // alignItems: 'center',
});

export const BgImage = styled("div")({
    width: '50%',
    height: '100%',
    position: 'relative',
    "@media (max-width:768px)":{
        display: 'none'
    }
});

export const Img = styled("img")({
    width: '120px',
    height: '60px',
    position: 'absolute',
    top: '2em',
    left: '1em',
    zIndex: -1,
});
