import React, { useState } from 'react';
import { IContextInterface, IUserInterface } from '../../interface';
import { useAppContext } from '../../context';
import Box from '@material-ui/core/Box';
import { useStyles, AForm, FormField, Input, FormLabel } from './styles';
import { Button, Typography } from '@material-ui/core';
import { useEffect } from 'react';

const AuthForm = () => {
  const classes = useStyles();
  const [value, setValue] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const { authUser, setUser, user } = useAppContext() as IContextInterface;

  //get user from local storage
  useEffect(() => {
    const Isuser = localStorage.getItem('username');
    if(Isuser) {
      setUsername(Isuser);
    }
  }, [])

  //form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUser({ username: value })
    if(!username) {
      authUser({ username: value, secret: value });
    }
    authUser({username, secret: username});
    setUser({} as IUserInterface);
  }
  console.log("user", user)

  //handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  }
  console.log("value", value)

  //use effect to set input value to null
  useEffect(() => {
    setValue('');
  }, [])
  return (
    <Box className={classes.mainContatiner}>
      <Box className={classes.Content}>
          <Typography className={classes.welcome} variant='h2'>
            Welcome 👋
          </Typography>
          <Typography className={classes.username} variant='h5'>
            Please set a username to get started
          </Typography>
        <AForm  onSubmit={handleSubmit}>
          <FormField>
            <FormLabel htmlFor='username'>
              Username
            </FormLabel>
            <Box style={{display: 'flex', flexDirection:'column', gap: '0.2em', height: '2.5rem',}}>
              <Input 
                autoComplete='off' 
                type='text'
                name='username' 
                value={value} 
                placeholder='Enter Username' 
                onChange={handleChange}
              />
              <Button type='submit' style={{width: '100%'}} variant="contained">
                Enter
              </Button>
            </Box>
          </FormField>
        </AForm>
      </Box>
    </Box>
  )
}

export default AuthForm
