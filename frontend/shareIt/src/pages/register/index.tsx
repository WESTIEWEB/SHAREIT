import Box from '@material-ui/core/Box';
import { regStyles, FormInput, RegForm, RegLabel, InputContainer, BgImage, Img } from './styles';
import { useAppContext } from '@/context';
import { IContextInterface, IFormInterface } from '@/interface';
import { Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { MdOutlineCancelPresentation } from 'react-icons/md';
import flickIcon from '@/assets/logo2.svg';
import { useState } from 'react';

const Register = () => {
    //control the state of the form
    const [formData, setFormData ] = useState<IFormInterface>({} as IFormInterface);
    const classes = regStyles();

    //get the registerConfig function from the context
    const { registerConfig } = useAppContext() as IContextInterface;

    //handle form input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value.trim()});
    }
    console.log(formData)
    //handle form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        registerConfig(formData)
        setFormData({} as IFormInterface);
    }

    return (
        <Box className={classes.mainContainer}>
            <Box className={classes.content1}>
                <BgImage>
                    <Img src={flickIcon} />
                </BgImage>
                <RegForm onSubmit={handleSubmit}>
                    <Box className={classes.inputField}>
                        <Typography className={classes.title} variant='h4'>SignUp</Typography>
                        <Link to={'/'} style={{textDecoration: 'none'}}>
                            <MdOutlineCancelPresentation className={classes.cancelB}/>
                        </Link>
                        <InputContainer>
                            <RegLabel htmlFor='username'>Username</RegLabel>
                            <FormInput onChange={handleInputChange} name='username' type='text' />
                        </InputContainer>
                        <InputContainer>
                            <RegLabel htmlFor='email'>Email</RegLabel>
                            <FormInput onChange={handleInputChange} name='email' type='email' />
                        </InputContainer>
                        <InputContainer>
                            <RegLabel htmlFor='phone number'>Phone Number</RegLabel>
                            <FormInput onChange={handleInputChange} name='phone' type='telephone' />
                        </InputContainer>
                        <InputContainer>
                            <RegLabel htmlFor='password'>Password</RegLabel>
                            <FormInput onChange={handleInputChange} name='password' type='password' />
                        </InputContainer>
                        <InputContainer>
                            <RegLabel htmlFor='confirmPassword'>Confirm Password</RegLabel>
                            <FormInput onChange={handleInputChange} name='confirmPassword' type='password' />
                        </InputContainer>
                        <InputContainer>
                            <Button type='submit' className={classes.buttn} variant='contained' color='primary'>Register</Button>
                        </InputContainer>
                    </Box>
                </RegForm>
            </Box>
        </Box>
    )
}

export default Register;