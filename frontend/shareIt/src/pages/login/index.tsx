import { Box, Typography, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { loginStyles, LoginForm, LoginFiled, InputField, BGimage } from './style';
import { Link } from 'react-router-dom';
import multipleCard from '../../assets/multipleApp.svg';
import { useAppContext } from '../../context';
import { IContextInterface } from '../../interface';
import { MdCancelPresentation } from 'react-icons/md';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);

    const { loginConfig, authUser, setChatSecr } = useAppContext() as IContextInterface;

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    //A fuction that handle password input change
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if(e.target.value.length > 6) setIsDisabled(false);
        else setIsDisabled(true);
    }

    //hancled cancel button
    const handleCancel = () => {
        window.location.href = '/';
    }

    //A function that handle login form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setChatSecr(password);
        loginConfig({email: email, password: password});
    }
    const classes = loginStyles();
    return (
        <Box className={classes.box1}>
            <BGimage src={multipleCard} />
            <Box className={classes.box2}>
                <LoginForm onSubmit={handleSubmit}>
                    {/* <Button variant='outlined' color='primary'>back</Button> */}
                    <MdCancelPresentation onClick={handleCancel} className={classes.cancelI} />
                    <Typography className={classes.loginTitle} variant='h4'>Login</Typography>
                    <LoginFiled>
                        <Typography className={classes.inputLabel} variant='h6'>Email</Typography>
                        <InputField onChange={handleEmailChange} name='email' type='text' />
                        <Typography className={classes.inputLabel} variant='h6'>Password</Typography>
                        <InputField onChange={handlePasswordChange} name='password' type='password' />
                        <Button disabled={isDisabled} type='submit' style={{ cursor: isDisabled? 'not-allowed': 'pointer'}} className={`${classes.buttn}`} variant='contained' color='primary'>Login</Button>
                        <Typography className={classes.inputLabel} variant='h6'>
                            Not yet a user? click {' '}
                            <Link to={'/signup'}>
                                here
                            </Link>
                            {' '}
                            to register
                        </Typography>
                    </LoginFiled>
                </LoginForm>
            </Box>
        </Box>
    )
}

export default LoginPage;