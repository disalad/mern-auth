import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link } from 'react-router-dom';
import { useStyles } from '../styles/formStyles';
import { emailValidation, passwordValidation } from '../utils/validation';

function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailErr, setEmailErr] = useState(null);
    const [passwdErr, setPasswdErr] = useState(null);
    const classes = useStyles();

    const formSubmitHandler = ev => {
        ev.preventDefault();
        validateForm() ? console.warn('SUCCESS') : console.error('ERROR');
    };

    const validateForm = () => {
        const emailError = emailValidation(email);
        const passwordError = passwordValidation(password);

        emailError ? setEmailErr('Email is not valid') : setEmailErr(null);
        passwordError ? setPasswdErr('Please enter a strong password') : setPasswdErr(null);

        if (!emailError && !passwordError) {
            return true;
        } else {
            return false;
        }
    };

    return (
        <Container maxWidth='xs'>
            <Box
                container
                direction='column'
                alignItems='center'
                justifyContent='center'
                className={classes.containerBox}
            >
                <Avatar sx={{ bgcolor: 'primary.main', color: 'common.white', margin: 1 }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Log in
                </Typography>
                <Box component='form' noValidate onSubmit={formSubmitHandler} sx={{ mt: 3 }}>
                    <Grid container spacing={2} className={classes.gridContainer}>
                        <Grid item sm={12} xs={12}>
                            <TextField
                                label='Email Address'
                                variant='outlined'
                                error={emailErr ? true : false}
                                helperText={emailErr}
                                onChange={ev => setEmail(ev.target.value)}
                                sx={{ mb: 2 }}
                                FormHelperTextProps={{
                                    classes: {
                                        root: classes.helperText,
                                    },
                                }}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item sm={12} xs={12}>
                            <TextField
                                label='Password'
                                variant='outlined'
                                error={passwdErr ? true : false}
                                helperText={passwdErr}
                                onChange={ev => setPassword(ev.target.value)}
                                FormHelperTextProps={{
                                    classes: {
                                        root: classes.helperText,
                                    },
                                }}
                                fullWidth
                                required
                            />
                        </Grid>
                    </Grid>
                    <Button type='submit' fullWidth variant='contained' sx={{ mt: 4, mb: 2 }}>
                        Log In
                    </Button>
                </Box>
                <Typography component='h6' variant='h6' sx={{ mt: 1, cursor: 'pointer' }}>
                    Already Have an Account?{' '}
                    <Link to='/signup' className={classes.link}>
                        Sign Up
                    </Link>
                </Typography>
            </Box>
        </Container>
    );
}

export default LogIn;
